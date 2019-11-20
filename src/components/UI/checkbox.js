import React from "react"
import { css } from "emotion"
import colors from "./colors"

const styledCheckbox = css`
  display: inline-block;
  width: 16px;
  height: 16px;
  border: thin solid #999;
  border-radius: 3px;
  transition: all 150ms;
  position: relative;
  margin: 0 3px;
`
const hiddenCheckbox = css`
  border: 0;
  height: 0.01px;
  margin: -1px;
  padding: 0;
  position: absolute;
  width: 0.01px;
  opacity: 0;
`

const Check = () => (
  <div
    className={css`
      content: "";
      position: absolute;
      left: 2px;
      top: 5px;
      background: white;
      width: 2px;
      height: 2px;
      box-shadow: 2px 0 0 white, 4px 0 0 white, 4px -2px 0 white,
        4px -4px 0 white, 4px -6px 0 white, 4px -8px 0 white;
      transform: rotate(45deg);
    `}
  />
)

export const Checkbox = ({ label, checked, ...props }) => {
  return (
    <div
      className={css`
        display: inline-block;
        vertical-align: middle;
      `}
      style={props.containerStyle}
    >
      <label
        className={css`
          display: flex;
          align-items: center;
          justify-content: center;
        `}
      >
        <input
          className={hiddenCheckbox}
          checked={checked}
          type="checkbox"
          {...props}
        />
        <div
          className={styledCheckbox}
          style={{ background: checked ? colors.primary : "transparent" }}
          {...props}
        >
          {checked && <Check />}
        </div>
        {label}
      </label>
    </div>
  )
}
