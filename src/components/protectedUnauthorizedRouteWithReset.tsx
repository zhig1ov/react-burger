import React, { FC } from "react"
import { Route, RouteProps, Redirect } from 'react-router-dom'
import { useSelectorHook } from '../services/hooks/hooks'

export const ProtectedUnauthorizedRouteWithReset: FC<RouteProps> = ({ path, children, ...rest}) => {
  const { name, passwordReset } = useSelectorHook((state) => state.user)

  // if (names) {
  //   return <Redirect to={{pathname: './login'}} />
  // }


  return (
    <Route path={path} {...rest} render={({ location }) => !name && passwordReset ? (children) : (
      <Redirect to={{pathname: './login', state: { from: location}}} />)} />
  )
}