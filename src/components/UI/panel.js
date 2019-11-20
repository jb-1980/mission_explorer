import React from "react"
import { css } from "emotion"
import colors from "./colors"

const panel = css`
  border-radius: 2px;
  border: 0;
  box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.12), 0 1px 6px 0 rgba(0, 0, 0, 0.12);
  margin-bottom: 20px;
  background-color: #fff;
`
export const Panel = props => <section className={panel} {...props} />

const panelHeading = css`
  background: ${colors.primary};
  color: #fff;
  padding: 10px 15px;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
`
export const PanelHeading = props => <div className={panelHeading} {...props} />

const panelTitle = css`
  margin-top: 0;
  margin-bottom: 0;
  font-size: 16px;
  color: inherit;
`
export const PanelTitle = props => <div className={panelTitle} {...props} />

const panelBody = css`
  padding: 15px;
`
export const PanelBody = props => <div className={panelBody} {...props} />
