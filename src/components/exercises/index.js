import React from "react"
import { css } from "emotion"
import { Router, Link } from "@reach/router"
import { useTopictree } from "../../contexts/topictree-context"
import { useSkills } from "../../contexts/skills-context"
import {
  Loading,
  Error,
  Sidebar,
  Dashboard,
  colors,
  Panel,
  PanelBody,
  PanelHeading,
  PanelTitle,
} from "../UI"

export const Exercises = () => {
  const { exercises, loading, error } = useTopictree()

  if (loading) return <Loading message="Retrieving data" />
  if (error) return <Error message="Error loading data 😞" />

  return (
    <>
      <SkillSelector skills={Object.values(exercises)} />
      <Dashboard>
        <Router>
          <ExercisesList default />
          <Exercise path=":slug" exercises={exercises} />
        </Router>
      </Dashboard>
    </>
  )
}

const ExercisesList = () => <div>Select a skill from the menu</div>

const Exercise = ({ slug, exercises }) => {
  const { skills, loading, updateSkills } = useSkills()

  React.useEffect(() => {
    let isMounted = true
    const skill = skills[slug]

    if (!loading && isMounted && !skill) {
      updateSkills([slug])
    }

    return () => {
      isMounted = false
    }
  }, [skills, slug, loading, updateSkills])

  if (loading)
    return <Loading message="Fetching skill data from Khan Academy" />
  const skill = skills[slug]
  if (!skill) return null

  const prerequisites = skill.prerequisites.map(p => exercises[p])

  return skill ? (
    <div>
      <h2>{skill.display_name}</h2>
      <div id="image" style={{ float: "left", paddingRight: "10px" }}>
        <img
          src={skill.image_url_256}
          alt={`example of ${skill.display_name}`}
          className="img-thumbnail"
          style={{
            width: "256px",
            height: "256px",
            padding: "20px",
            backgroundColor: "#fff",
          }}
        />
      </div>
      <div id="info" style={{ float: "left" }}>
        <Panel>
          <PanelHeading>
            <PanelTitle>URL:</PanelTitle>
          </PanelHeading>
          <PanelBody>
            <a
              href={skill.ka_url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: "1.2em" }}
            >
              {skill.ka_url}
            </a>
          </PanelBody>
        </Panel>
        <Panel>
          <PanelHeading>
            <PanelTitle>Related Videos:</PanelTitle>
          </PanelHeading>
          <PanelBody>
            <ul style={{ listStyleType: "none" }}>
              {skill.related_videos.map(v => (
                <div key={v.youtube_id}>{v.title}</div>
              ))}
            </ul>
          </PanelBody>
        </Panel>
        <Panel>
          <PanelHeading>
            <PanelTitle>Prerequisites:</PanelTitle>
          </PanelHeading>
          <PanelBody>
            <ul style={{ listStyleType: "none" }}>
              {prerequisites.map(p => (
                <div key={p.id}>
                  <Link to={`../${p.slug}`}>{p.title}</Link>
                </div>
              ))}
            </ul>
          </PanelBody>
        </Panel>
        <Panel>
          <PanelHeading>
            <PanelTitle>Commoncore Standards:</PanelTitle>
          </PanelHeading>
          <PanelBody></PanelBody>
        </Panel>
      </div>
      <div style={{ clear: "both" }}></div>
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title">Description:</h3>
        </div>
        <div className="panel-body">
          {skill.translated_description || "No description given."}
        </div>
      </div>
    </div>
  ) : (
    <Loading message="Fetching skill data from Khan Academy" />
  )
}

const SkillSelector = ({ skills }) => {
  const [keyword, setKeyword] = React.useState("")
  const filteredSkills = skills.filter(e =>
    e.title.toLowerCase().includes(keyword.toLowerCase())
  )

  const skillList = filteredSkills.slice(0, 10).map(({ slug, title }) => (
    <div
      key={slug}
      className={css`
        margin: 10px 0;
      `}
    >
      <Link
        key={slug}
        className={css`
          color: ${colors.primary};
          text-decoration: none;
        `}
        to={slug}
      >
        {title}
      </Link>
    </div>
  ))

  return (
    <Sidebar style={{ padding: 10 }}>
      <input
        onChange={e => setKeyword(e.target.value)}
        value={keyword}
        placeholder="Type to find a skill"
        type="text"
        className={css`
          border: none;
          border-bottom: thick solid ${colors.primary};
          width: 100%;
          height: 50px;
          margin: 10px 0;
          font-size: 14px;
          line-height: 50px;
          padding: 10px;
        `}
      />
      {skillList}
    </Sidebar>
  )
}
