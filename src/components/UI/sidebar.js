import React from "react"
import { Link } from "@reach/router"
import { FaTrash } from "react-icons/fa"
import { css } from "emotion"
import colors from "./colors"

const sidebar = css`
  z-index: 1;
  overflow-x: hidden;
  overflow-y: scroll;
  background-color: #f5f5f5;
  border-right: 1px solid #eee;
  height: calc(100vh - 40px);
  width: 25%;
  position: fixed;
  &::-webkit-scrollbar {
    display: none;
  }
  @media (max-width: 768px) {
    width: 100%;
    padding: 0 10px;
    background-color: #f5f5f5;
  }
`

export const Sidebar = ({ children, ...props }) => {
  return (
    <div className={sidebar} {...props}>
      {children}
    </div>
  )
}

const sidebarBtn = css`
  border: none;
  border-radius: 2px;
  position: relative;
  padding: 10px 20px;
  font-size: 17px;
  font-weight: 500;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 0;
  display: inline-block;
  background-color: transparent;
  text-align: center;
  display: flex;
  color: ${colors.primary};
  text-decoration: none;
  white-space: nowrap;
  &:hover {
    background-color: #99999933;
  }
`

const unbutton = css`
  border: none;
  background: transparent;
  color: inherit;
  font-size: inherit;
  margin: 0 5px;
`
export const SidebarMenuItem = ({
  courseName,
  deleteHandler,
  url,
  ...props
}) => (
  <Link to={url} className={sidebarBtn} {...props}>
    <div onClick={deleteHandler} className={unbutton}>
      <FaTrash />
    </div>
    <div className={unbutton}>{courseName}</div>
  </Link>
)
