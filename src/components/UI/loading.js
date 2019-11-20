import React from "react"
import { AtomSpinner } from "./spinners"

export const Loading = ({ message, style }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
      ...style,
    }}
  >
    <h3>{message}</h3>
    <AtomSpinner />
  </div>
)
