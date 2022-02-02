import React, { FC } from 'react'
import { Route, RouteProps, Redirect } from 'react-router-dom'
import { useSelectorHook } from '../services/hooks/hooks'

export const ProtectedRoute: FC<RouteProps> = ({path, children, ...rest}) => {
  const { name } = useSelectorHook((state) => state.user)

  return (
    <Route path={path} {...rest} render={({ location }) => name ? (children) : (
      <Redirect to={{pathname: './login', state: { from: location}}} exact={true} />)} />
  )
}