import React from "react"
import { css, keyframes } from "emotion"

export const FlowerSpinner = ({ pedal, center }) => {
  const flowerLoader = keyframes`
0% {
    transform: rotate(0deg);
    box-shadow: white 0 0 15px 0, ${pedal} -12px -12px 0 4px, ${pedal} 12px -12px 0 4px, ${pedal} 12px 12px 0 4px, ${pedal} -12px 12px 0 4px;
}
50% {
    
    transform: rotate(1080deg);
    box-shadow: white 0 0 15px 0, ${pedal} 12px 12px 0 4px, ${pedal} -12px 12px 0 4px, ${pedal} -12px -12px 0 4px, ${pedal} 12px -12px 0 4px;
}
`
  return (
    <div
      className={css`
        overflow: hidden;
        position: relative;
        display: inline-block;
        width: 16px;
        height: 16px;
        background: ${center};
        border-radius: 100%;
        box-shadow: white 0 0 15px 0, ${pedal} -12px -12px 0 4px,
          ${pedal} 12px -12px 0 4px, ${pedal} 12px 12px 0 4px,
          ${pedal} -12px 12px 0 4px;
        animation: ${flowerLoader} 5s infinite ease-in-out;
        transform-origin: 50% 50%;
      `}
    />
  )
}

FlowerSpinner.defaultProps = {
  pedal: "#fd8",
  center: "#e96",
}
