import React from "react"
import { css } from "emotion"

export const useOutsideClick = (ref, clickHandler) => {
  const onOutsideClick = e => {
    if (!ref.current || ref.current.contains(e.target)) {
      return null
    }
    return clickHandler(false)
  }

  React.useEffect(() => {
    document.addEventListener("click", onOutsideClick)
    document.addEventListener("touchstart", onOutsideClick)
    return () => {
      document.removeEventListener("click", onOutsideClick)
      document.removeEventListener("touchstart", onOutsideClick)
    }
  })
}

const dropdownStyle = css`
  position: absolute;
  top: 100%;
  right: 0;
  z-index: 100;
  min-width: 160px;
  background: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.26);
  @media (max-width: 768px) {
    width: 100%;
  }
`

const navbarToggleStyle = css`
  padding: 9px 10px;
  margin-top: 8px;
  margin-right: 15px;
  margin-bottom: 8px;
  font-size: 15px;
  color: #fff;
  background: transparent;
  border: none;
  cursor: pointer;
`

const toggleSmall = css`
  ${navbarToggleStyle};
  @media (min-width: 768px) {
    display: none;
  }
`

const toggleLarge = css`
  ${navbarToggleStyle};
  @media (max-width: 768px) {
    display: none;
  }
`

export const Dropdown = ({ isOpen, setIsOpen, title, children }) => {
  const container = React.useRef()

  useOutsideClick(container, setIsOpen)
  return (
    <div
      className={css`
        align-self: flex-start;

        @media (min-width: 768px) {
          margin-left: auto;
        }
      `}
      ref={container}
    >
      <button
        type="button"
        className={toggleSmall}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? "▲" : "▼"}
      </button>
      <button
        type="button"
        className={toggleLarge}
        onClick={() => setIsOpen(!isOpen)}
      >
        {title}
        {isOpen ? "▲" : "▼"}
      </button>
      {isOpen && <div className={dropdownStyle}>{children}</div>}
    </div>
  )
}
