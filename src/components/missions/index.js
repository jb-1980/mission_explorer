import React from "react"
import { css } from "emotion"
import { Router, Link } from "@reach/router"
import { useTopictree } from "../../contexts/topictree-context"
import { Error, Loading, Sidebar, Dashboard } from "../UI"
import { MissionMatrix } from "./mission-matrix"
import { useMissions } from "../../contexts/mission-context"

export const Missions = () => (
  <Router>
    <MissionsList default />
    <Mission path=":missionSlug/*" />
  </Router>
)

const MissionsList = () => {
  const { missions, loading, error } = useTopictree()

  if (loading) return <Loading message="Loading data" />
  if (error) return <Error message="Error loading data 😞" />

  const missionsList = Object.values(missions)
  missionsList.sort((a, b) => (a.title > b.title ? 1 : -1))
  return (
    <>
      <Sidebar style={{ padding: 10 }}>
        <div
          className={css`
            width: 100%;
            border-bottom: thin solid var(--color-primary);
          `}
        >
          <span
            className={css`
              font-weight: bold;
              color: var(--color-primary);
              font-size: 1.2em;
            `}
          >
            Khan Missions
          </span>
        </div>
        {missionsList.map(m => (
          <div key={m.id} style={{ margin: "10px 0px" }}>
            <Link
              className={css`
                text-decoration: none;
                color: var(--color-primary);
              `}
              to={m.slug}
            >
              {m.title}
            </Link>
          </div>
        ))}
      </Sidebar>
      <Dashboard />
    </>
  )
}

const Mission = ({ missionSlug }) => {
  const { missions, loading, error, updateMissions } = useMissions()

  React.useEffect(() => {
    let isMounted = true

    const mission = missions[missionSlug]
    if (isMounted && !mission && !loading) {
      updateMissions(missionSlug)
    }

    return () => {
      isMounted = false
    }
  }, [missions, loading, missionSlug, updateMissions])

  if (loading)
    return <Loading message="Fetching mission details from Khan Academy" />
  if (error) return <Error message={error} />

  const mission = missions[missionSlug]

  if (!mission) return null

  const { topicBreakdown, progressInfo } = mission
  const exercises = progressInfo.reduce(
    (acc, ex) => ({ ...acc, [ex.id]: ex }),
    {}
  )
  const topics = topicBreakdown.map(t => ({
    slug: t.contentSlug,
    title: t.translatedTitle,
    exercises: t.exerciseIds.map(id => exercises[id]),
  }))

  return (
    <div>
      <Sidebar style={{ padding: 5 }}>
        <div
          className={css`
            width: 100%;
            border-bottom: thin solid var(--color-primary);
            color: var(--color-primary);
          `}
        >
          <Link
            className={css`
              text-decoration: none;
              color: var(--color-primary);
              font-size: 1em;
            `}
            to=".."
          >
            ⤌ All missions
          </Link>

          <h3 style={{ margin: "5px auto 0" }}>{mission.translatedTitle}</h3>
        </div>

        <div
          className={css`
            margin: 10px 0;
          `}
        >
          <Link
            className={css`
              text-decoration: none;
              color: var(--color-primary);
            `}
            to={`/missions/${mission.slug}`}
          >
            All Topics
          </Link>
        </div>
        {topics.map(topic => (
          <div
            className={css`
              margin: 10px 0;
            `}
            key={topic.slug}
          >
            <Link
              className={css`
                text-decoration: none;
                color: var(--color-primary);
              `}
              to={topic.slug}
            >
              {topic.title}
            </Link>
          </div>
        ))}
      </Sidebar>
      <Dashboard>
        <Router>
          <MissionDashboard default topics={topics} />
          <Topic path=":slug" topics={topics} />
        </Router>
      </Dashboard>
    </div>
  )
}

const MissionDashboard = ({ topics }) => <MissionMatrix topics={topics} />

const Topic = ({ slug, topics }) => {
  const topic = topics.filter(t => t.slug === slug)
  return <MissionMatrix topics={topic} />
}
