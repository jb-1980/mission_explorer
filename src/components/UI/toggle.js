import React from "react"
import { css } from "emotion"
import colors from "./colors"

const toggleContainer = css`
  background: #ddd;
  position: relative;
  display: inline-block;
  margin: 0 10px;
`

const toggleCircle = css`
  border: 1px solid #ddd;
  background: #fff;
  border-radius: 50%;
  position: absolute;
  box-sizing: border-box;
  transition: left cubic-bezier(0.36, 0, 0.51, 1.93) 0.25s;
  transition-property: left, background;
`

export const Toggle = ({ size = 30, active, setActive }) => (
  <div
    className={css`
      ${toggleContainer};
      width: ${(size * 5) / 3}px;
      height: ${(size * 2) / 3}px;
      border-radius: ${(size * 2) / 3}px;
      background: ${active ? colors.primary : "#ddd"};
    `}
    onClick={setActive}
  >
    <div
      className={css`
        ${toggleCircle};
        width: ${size}px;
        height: ${size}px;
        top: ${-size / 6}px;
        left: ${active ? (size * 5) / 6 : -size / 6}px;
        border-color: ${active ? colors.primary : "#ddd"};
        border-width: ${size * 0.05}px;
      `}
    />
  </div>
)
