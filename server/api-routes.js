const router = require("express").Router()
const fetch = require("node-fetch")
const { KhanAPIWrapper } = require("khan-api-wrapper")
const jwt = require("jsonwebtoken")
const { getTopicTree, updateTopicTree } = require("./utils")

const { KHAN_CONSUMER_KEY, KHAN_CONSUMER_SECRET, JWT_SECRET } = process.env

const isLoggedIn = (req, res, next) => {
  const { tokens } = req.cookies
  if (!tokens) {
    return res.sendStatus(401)
  }

  const { token, secret } = jwt.verify(tokens, JWT_SECRET)

  if (!token && !secret) {
    return res.sendStatus(401)
  }

  res.locals.token = token
  res.locals.secret = secret
  next()
}

router.get("/user/verify", isLoggedIn, async (req, res) => {
  const { token, secret } = res.locals

  const kapi = new KhanAPIWrapper(
    KHAN_CONSUMER_KEY,
    KHAN_CONSUMER_SECRET,
    token,
    secret
  )
  const user = await kapi.user()
  res.status(200).json(user)
})

router.post("/user/logout", isLoggedIn, async (req, res) => {
  res.clearCookie("tokens")
  res.status(200).json({ logged_out: true })
})

router.get("/get/mission/:missionSlug", isLoggedIn, async (req, res) => {
  const { missionSlug } = req.params
  const { token, secret } = res.locals

  // first fetch the mission data from Khan Academy
  const kapi = new KhanAPIWrapper(
    KHAN_CONSUMER_KEY,
    KHAN_CONSUMER_SECRET,
    token,
    secret
  )

  const endpoint = `/api/internal/user/mission/${missionSlug}`
  const mission = await kapi.fetchResource(endpoint, true)

  // Next fetch the standards from Khan Academy
  const standardsUrl =
    "https://cdn.kastatic.org/ka-exercise-screenshots-3/types/problemTypes.json"
  const standards = await fetch(standardsUrl)
    .then(resp => resp.json())
    .catch(err => {
      console.log(err)
      res.status(500).json({ error: "Unable to fetch standards" })
    })

  // Finally, parse the standards and inject them into the mission data
  const standardsByExercise = Object.entries(standards).reduce(
    (acc, [name, standard]) => {
      standard.skills.forEach(skill => {
        if (acc[skill.slug]) {
          acc[skill.slug].push(name)
        } else {
          acc[skill.slug] = [name]
        }
      })

      return acc
    },
    {}
  )
  const _mission = {
    ...mission,
    progressInfo: mission.progressInfo.map(s => ({
      ...s,
      ccStandard: standardsByExercise[s.name] || [],
    })),
  }
  return res.status(200).json(_mission)
})

router.get("/get/topictree", isLoggedIn, async (req, res) => {
  const topictree = await getTopicTree()
  res.status(200).json(topictree)
})

router.put("/update/topictree", isLoggedIn, async (req, res) => {
  const topictree = await updateTopicTree()
  res.status(200).json(topictree)
})

router.post("/get/skills", isLoggedIn, async (req, res) => {
  const skills = req.body
  const { token, secret } = res.locals

  // first fetch the mission data from Khan Academy
  const kapi = new KhanAPIWrapper(
    KHAN_CONSUMER_KEY,
    KHAN_CONSUMER_SECRET,
    token,
    secret
  )

  /*
   * Since the api restricts the url length to 2048 characters, and making a
   * request for many exercises will often exceed this limit, this function will
   * truncate the url below the limit, and tie the responses together.
   * This function fetches as exercise1,exercise2,... instead of
   * exercise=exercise1&exercise=exercise2,...
   */
  const getManyExercises = async (exercises, accumulator = []) => {
    // Setting up strings to test length against. 1500 is kind of arbitrary, but
    // it should give room for other things like token and secret
    let _exercises = []
    let tmpString = ""
    let exercisesString = ""
    // Copy of exercises, which will shift off the exercises we use so we have a
    // smaller list for the next fetch
    let unusedExercises = [...exercises]

    for (var i = 0; i < exercises.length; i++) {
      tmpString = `${exercisesString},${exercises[i]}`
      if (tmpString.length < 1500) {
        unusedExercises.shift()
        _exercises.push(exercises[i])
        exercisesString = tmpString
      } else {
        // string has reached its max length, let's fetch some data
        return await kapi.userExercises(_exercises).then(res => {
          _accumulator = res.map(e => e.exercise_model)
          return getManyExercises(unusedExercises, [
            ...accumulator,
            ..._accumulator,
          ])
        })
      }
    }

    // not enough exercises to exceed the 2048 limit
    const res = await kapi
      .userExercises(exercises)
      .then(res => res.map(e => e.exercise_model))

    return [...accumulator, ...res]
  }

  const exercises = await getManyExercises(skills)
  return res.json(exercises)
})

module.exports = router
