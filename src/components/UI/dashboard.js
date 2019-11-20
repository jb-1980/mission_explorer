import React from "react"
import { css } from "emotion"

export const Dashboard = ({ children }) => (
  <div
    className={css`
      padding: 10px;
      width: 75%;
      margin-left: auto;
    `}
  >
    {children}
  </div>
)
