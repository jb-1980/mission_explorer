import React from "react"
import { css } from "emotion"
import { Link } from "@reach/router"
import { useSkills } from "../../contexts/skills-context"
import { AtomSpinner } from "../UI"
import { useTopictree } from "../../contexts/topictree-context"

export const MissionMatrix = ({ topics }) => {
  const { skills, loading, updateSkills } = useSkills()
  const { exercises } = useTopictree()

  React.useEffect(() => {
    let isMounted = true
    const emptySkills = topics.reduce((acc, topic) => {
      topic.exercises.forEach(ex => {
        const skill = skills[ex.name]
        if (!skill) {
          acc.push(ex.name)
        }
      })
      return acc
    }, [])

    if (!loading && isMounted && emptySkills.length > 0) {
      updateSkills(emptySkills)
    }

    return () => {
      isMounted = false
    }
  }, [skills, topics, loading, updateSkills])

  const rows = topics.reduce(
    (rows, topic) => [
      ...rows,
      topic.exercises.map((ex, i) => {
        const skill = skills[ex.name]
        let pres = []
        let videos = []
        if (skill) {
          pres = skill.prerequisites.map(p => {
            const preSkill = exercises[p]

            return (
              <Link key={p} to={`/skills/${p}`}>
                {preSkill ? preSkill.title : p}
              </Link>
            )
          })
          videos = skill.related_videos.map(v => (
            <a
              key={v.id}
              rel="noopener noreferrer"
              href={`https://www.khanacademy.org${v.relative_url}`}
              target="_blank"
            >
              {v.title}
            </a>
          ))
        }

        return (
          <tr key={`${ex.slug}-${i}`}>
            <td
              className={css`
                width: 10%;
              `}
            >
              {topic.title}
            </td>
            <td
              className={css`
                width: 10%;
              `}
            >
              {ex.translatedDisplayName}
            </td>
            <td
              className={css`
                width: 50%;
              `}
            >
              {ex.translatedDescription}
            </td>
            <td
              className={css`
                width: 10%;
              `}
            >
              {loading || !skill ? (
                <AtomSpinner size="20px" style={{ margin: "auto" }} />
              ) : (
                videos
              )}
            </td>
            <td
              className={css`
                width: 10%;
              `}
            >
              {pres}
            </td>
            <td
              className={css`
                width: 10%;
              `}
            >
              {ex.ccStandard.map(s => (
                <div key={s}>{s}</div>
              ))}
            </td>
          </tr>
        )
      }),
    ],
    []
  )

  return (
    <div default>
      <table className="table table-striped" data-sortable>
        <thead>
          <tr>
            <th>Unit</th>
            <th>Title</th>
            <th>Description</th>
            <th>Videos</th>
            <th>Prerequisites</th>
            <th>CCSS</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </div>
  )
}
