import React from "react"
import { api } from "../utils"

const MissionsContext = React.createContext()

const MissionsProvider = ({ children }) => {
  const [{ missions, loading, error }, setMissions] = React.useState({
    missions: {},
    loading: false,
    error: null,
  })

  const updateMissions = async slug => {
    await setMissions({ missions, loading: true, error: null })
    api(`/api/get/mission/${slug}`, { credentials: "include" })
      .then(res => res.json())
      .then(newMission =>
        setMissions({
          missions: { ...missions, [newMission.slug]: newMission },
          loading: false,
          error: null,
        })
      )
      .catch(err => {
        console.error(err)
        setMissions({
          missions,
          loading: false,
          error: "Error fetching missions",
        })
      })
  }

  return (
    <MissionsContext.Provider
      value={{ missions, loading, error, updateMissions }}
    >
      {children}
    </MissionsContext.Provider>
  )
}

const useMissions = () => {
  const missions = React.useContext(MissionsContext)

  if (missions === undefined) {
    throw new Error("useMissions must be used within a MissionsProvider")
  }

  return missions
}

export { useMissions, MissionsProvider }
