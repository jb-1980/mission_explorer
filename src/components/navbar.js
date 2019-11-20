import React from "react"
import { css } from "emotion"
import { Link } from "@reach/router"

import { useOutsideClick } from "../hooks"
import { useUser } from "../contexts/user-context"

import { colors } from "./UI"

const NavLink = props => (
  <Link
    {...props}
    getProps={({ isCurrent }) => {
      // the object returned here is passed to the
      // anchor element's props
      return {
        style: {
          fontWeight: isCurrent ? "bold" : "normal",
        },
      }
    }}
  />
)

export const Navbar = ({ menuOpen, setMenuOpen }) => {
  const [dropdownOpen, setDropdownOpen] = React.useState(false)
  const { user, logout } = useUser()

  const container = React.useRef()

  useOutsideClick(container, setDropdownOpen)

  const navbarLinkStyle = css`
    padding: 15px;
    line-height: 20px;
    font-size: 15px;
    color: #fff;
    text-decoration: none;
    &:hover {
      background-color: transparent;
      text-decoration: none;
      color: #fff;
    }
  `
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

  const navDropdownItemstyle = css`
    font-size: 15px;
    color: ${colors.primary};
    padding: 10px 20px;
    width: 100%;
    text-decoration: none;
    cursor: pointer;
    &:hover {
      color: ${colors.primary};
      background: #eee;
      text-decoration: none;
    }

    @media (max-width: 768px) {
      text-align: center;
    }
  `
  const navbarToggleStyle = css`
    padding: 9px 10px;
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
  return (
    <div
      className={css`
        border: 0;
        position: fixed;
        top: 0;
        right: 0;
        z-index: 1980;
        height: 40px;
        width: 100%;
        color: #fff;
        background: ${colors.primary};
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        @media (max-width: 768px) {
          justify-content: space-between;
          height: inherit;
        }
      `}
    >
      <div style={{ padding: "0 5px" }}>Mission Explorer</div>
      <NavLink className={navbarLinkStyle} to="/missions">
        Missions
      </NavLink>
      <NavLink className={navbarLinkStyle} to="/skills">
        Skills
      </NavLink>
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
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          {dropdownOpen ? "▲" : "▼"}
        </button>
        <button
          type="button"
          className={toggleLarge}
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          {user.nickname}
          {dropdownOpen ? "▲" : "▼"}
        </button>
        {dropdownOpen && (
          <div className={dropdownStyle}>
            <div className={navDropdownItemstyle} onClick={logout}>
              logout
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
