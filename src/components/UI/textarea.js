import React from "react"
import { css } from "emotion"
import colors from "./colors"

const cssStyles = css`
  overflow: auto;
  &:focus {
    border: 2px solid ${colors.primary};
    box-shadow: 0px 0px 5px 0px ${colors.primary};
  }
`

const textareaCSS = css`
  display: flex;
  flex-direction: column;
  margin: 20px;
`

export const TextArea = ({ label, ...props }) => (
  <div>
    <label className={textareaCSS}>
      <div style={{ marginBottom: 3 }}>{label}</div>
      <textarea className={cssStyles} {...props} />
    </label>
  </div>
)
