import React from "react"
import { css } from "emotion"
import colors from "./colors"

const styles = css`
  border: thin solid ${colors.primary};
  border-radius: 5px;
  background: ${colors.primary};
  padding: 5px;
  color: #fff;

  option {
    background: #fff;
    color: ${colors.primary};
  }
`

export const Select = props => (
  <select className={styles} {...props}>
    {props.children}
  </select>
)

const outlineStyles = css`
  border: none;
  background: transparent;
  color: ${colors.primary};
  font-weight: bold;
`

export const SelectOutline = props => (
  <label style={{ display: "flex", alignItems: "center", ...props.labelstyle }}>
    <span style={{ marginRight: 5 }}>{props.label}</span>
    <select className={outlineStyles} {...props} />
  </label>
)
