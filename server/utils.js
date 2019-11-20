const fs = require("fs")
const { promisify } = require("util")
const readAsync = promisify(fs.readFile)
const writeAsync = promisify(fs.writeFile)
const { KhanAPIWrapper } = require("khan-api-wrapper")

const { KHAN_CONSUMER_KEY, KHAN_CONSUMER_SECRET } = process.env

const updateTopicTree = async () => {
  const kapi = new KhanAPIWrapper(KHAN_CONSUMER_KEY, KHAN_CONSUMER_SECRET)

  // get fresh topictree from Khan Academy. This is costly!!
  const topictree = await kapi.v2topictree().catch(err => {
    throw err
  })

  const data = { ...topictree, timestamp: Date.now() }
  // Save topictree to the disk, and return it
  return await writeAsync("topictree.json", JSON.stringify(data), {
    encoding: "utf8",
  })
    .then(() => data)
    .catch(err => {
      throw err
    })
}

const getTopicTree = async () => {
  // Fetch topictree from saved json file
  return await readAsync("topictree.json", { encoding: "utf8" })
    .then(jsonString => JSON.parse(jsonString))
    .catch(err => {
      if (err.code === "ENOENT") {
        // file not found, which should happen the first time
        return updateTopicTree()
      }

      throw err
    })
}

module.exports = {
  getTopicTree,
  updateTopicTree,
}
