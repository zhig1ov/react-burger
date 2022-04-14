import React, { FC } from "react"
import { Route, RouteProps, Redirect } from 'react-router-dom'
import { useSelectorHook } from '../services/hooks/hooks'

export const ProtectedUnauthorizedRouteWithReset: FC<RouteProps> = ({ path, children, ...rest}) => {
  const { changePasswordMessage } = useSelectorHook((state) => state.user)
  console.log(changePasswordMessage)
  return (
    <Route path={path} {...rest} render={({ location }) => changePasswordMessage !== null ? (children) : (
      <Redirect to={{pathname: './login', state: { from: location}}} />)} />
  )
}