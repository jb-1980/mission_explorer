import React from "react"
import { Router } from "@reach/router"
import { css } from "emotion"
import {
  LinkButtonPrimary,
  Loading,
  LinkButtonPrimaryOutline,
} from "./components/UI"
import { Navbar } from "./components/navbar"
import { Missions } from "./components/missions"
import { Exercises } from "./components/exercises"
import { useUser } from "./contexts/user-context"
import { TopictreeProvider } from "./contexts/topictree-context"
import { SkillsProvider } from "./contexts/skills-context"
import { MissionsProvider } from "./contexts/mission-context"

function App() {
  const { user, verifying } = useUser()

  if (verifying) {
    return <Loading message="Verifying user" />
  } else if (user === null) {
    return <LoginPage />
  } else {
    return (
      <div>
        <Navbar />
        <div style={{ marginTop: 40 }}>
          <TopictreeProvider>
            <MissionsProvider>
              <SkillsProvider>
                <Router>
                  <LandingPage default />
                  <Missions path="/missions/*" />
                  <Exercises path="/skills/*" />
                </Router>
              </SkillsProvider>
            </MissionsProvider>
          </TopictreeProvider>
        </div>
      </div>
    )
  }
}

const LandingPage = () => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "calc(100vh - 40px)",
    }}
  >
    <h2>I am here to explore:</h2>
    <div style={{ margin: 5 }}>
      <LinkButtonPrimaryOutline routerlink to="/missions">
        Missions
      </LinkButtonPrimaryOutline>
    </div>
    <div style={{ margin: 5 }}>
      <LinkButtonPrimaryOutline routerlink to="/skills">
        Skills
      </LinkButtonPrimaryOutline>
    </div>
  </div>
)

const LoginPage = () => (
  <div
    className={css`
      display: flex;
      width: 100vw;
      height: 100vh;
      background: var(--color-primary);
      justify-content: center;
      align-items: center;
    `}
  >
    <div
      className={css`
        display: flex;
        flex-direction: column;
        width: 300px;
        height: 300px;
        background: #e5e5e5;
        align-items: center;
        justify-content: center;
        border-radius: 5px;
      `}
    >
      <h1 style={{ color: "#333" }}>Mission Explorer</h1>
      <LinkButtonPrimary href="/login">
        Authenticate with Khan Academy
      </LinkButtonPrimary>
    </div>
  </div>
)

export default App
