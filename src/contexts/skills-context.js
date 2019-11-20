import React from "react"
import { api } from "../utils"

const SkillsContext = React.createContext()

const SkillsProvider = ({ children }) => {
  const [{ skills, loading, error }, setSkills] = React.useState({
    skills: {},
    loading: false,
    error: null,
  })

  const updateSkills = async skillList => {
    await setSkills({ skills, loading: true, error: null })
    api(`/api/get/skills`, {
      credentials: "include",
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(skillList),
    })
      .then(res => res.json())
      .then(newSkills => {
        const _skills = newSkills.reduce(
          (acc, s) => ({ ...acc, [s.name]: s }),
          {}
        )

        setSkills({
          skills: { ...skills, ..._skills },
          loading: false,
          error: null,
        })
      })
      .catch(err => {
        console.error(err)
        setSkills({
          skills,
          loading: false,
          error: "Error fetching skills",
        })
      })
  }

  return (
    <SkillsContext.Provider value={{ skills, loading, error, updateSkills }}>
      {children}
    </SkillsContext.Provider>
  )
}

const useSkills = () => {
  const skills = React.useContext(SkillsContext)

  if (skills === undefined) {
    throw new Error("useSkills must be used within a SkillsProvider")
  }

  return skills
}

export { useSkills, SkillsProvider }
