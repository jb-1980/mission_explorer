import React from "react"
import { css } from "emotion"
import colors from "./colors"

const formStyle = css`
  display: flex;
  flex-direction: row;
  margin: 20px;
`

const labelStyle = css`
  display: flex;
  align-items: center;
  margin-right: 5px;
`
const cssStyles = css`
  overflow: auto;
  &:focus {
    border: 2px solid ${colors.primary};
    box-shadow: 0px 0px 5px 0px ${colors.primary};
  }
`

export const TextInput = ({ label, ...props }) => (
  <div
    className={css`
      margin: 20px 0px;
      ${props.wrapperclassname};
    `}
  >
    <label
      className={css`
        ${formStyle};
        ${props.labelclassname}
      `}
    >
      <div className={labelStyle}>{label}</div>
      <input className={cssStyles} type="text" {...props} />
    </label>
  </div>
)
