import React from "react"
import { api } from "../utils"

const TopictreeContext = React.createContext()

const TopictreeProvider = ({ children }) => {
  const [data, setTopictree] = React.useState({
    exercises: null,
    missions: null,
    loading: true,
    error: null,
  })

  React.useEffect(() => {
    if (data.exercises === null && data.missions === null && data.error === null) {
      api("/api/get/topictree")
        .then(res => res.json())
        .then(topictree => {
          const exercises = topictree.exercises.reduce((acc, e) => {
            acc[e.slug] = e
            return acc
          }, {})
          const missions = topictree.missions.reduce((acc, m) => {
            acc[m.slug] = m
            return acc
          }, {})
          setTopictree({
            exercises,
            missions,
            loading: false,
            error: null,
          })
        }
        )
        .catch(err => {
          console.error(err)
          setTopictree({
            exercises: null,
            missions: null,
            loading: false,
            error: "Error fetching data 😞",
          })
        })
    }
  }, [data])

  return (
    <TopictreeContext.Provider value={data}>
      {children}
    </TopictreeContext.Provider>
  )
}

const useTopictree = () => {
  const topictree = React.useContext(TopictreeContext)

  if (topictree === undefined) {
    throw new Error("useTopictree must be used within a TopictreeProvider")
  }

  return topictree
}

export { useTopictree, TopictreeProvider }
