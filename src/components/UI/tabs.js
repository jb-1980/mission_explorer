import React from "react"
import { css } from "emotion"
import { btn } from "./btn-css"
import colors from "./colors"

const btnPrimary = css`
  ${btn};
  color: #fff;
  background-color: ${colors.primary};
  border-color: ${colors.primary};
  border-radius: 0.25rem 0.25rem 0 0;
  border: 3px solid ${colors.primary};
  position: relative;
  margin: 0 2px;
  &:hover {
    color: ${colors.primary};
    background-color: #fff;
  }
`

const btnPrimaryOutline = css`
  ${btn};
  border-radius: 0.25rem 0.25rem 0 0;
  border: 3px solid ${colors.primary};
  border-bottom-color: #fff;
  position: relative;
  color: ${colors.primary};
  background-color: #fff;
  margin: 0 2px;
`

export const Tabs = ({ tabs, activeTab, clickHandler }) => (
  <>
    <div
      style={{
        listStyle: "none",
        display: "flex",
        flexDirection: "row",
        width: "100%",
        position: "relative",
        height: 42,
        borderBottom: `3px solid ${colors.primary}`,
      }}
    >
      <div style={{ position: "absolute", width: "100%", left: 3 }}>
        {tabs.map(tab =>
          activeTab === tab.id ? (
            <div className={btnPrimaryOutline}>{tab.name}</div>
          ) : (
            <div className={btnPrimary} onClick={() => clickHandler(tab.id)}>
              {tab.name}
            </div>
          )
        )}
      </div>
    </div>
  </>
)
