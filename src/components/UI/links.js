import React from "react"
import { btnPrimary, btnPrimaryOutline } from "./btn-css"
import { Link } from "@reach/router"

export const LinkButtonPrimary = ({ children, routerlink, ...props }) => {
  if (routerlink)
    return (
      <Link
        className={btnPrimary}
        style={{ textDecoration: "none" }}
        {...props}
      >
        {children}
      </Link>
    )

  return (
    <a className={btnPrimary} style={{ textDecoration: "none" }} {...props}>
      {children}
    </a>
  )
}

export const LinkButtonPrimaryOutline = ({
  children,
  routerlink,
  ...props
}) => {
  if (routerlink)
    return (
      <Link
        className={btnPrimaryOutline}
        style={{ textDecoration: "none" }}
        {...props}
      >
        {children}
      </Link>
    )

  return (
    <a
      className={btnPrimaryOutline}
      style={{ textDecoration: "none" }}
      {...props}
    >
      {children}
    </a>
  )
}
