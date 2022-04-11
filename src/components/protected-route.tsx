import React, { FC } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useDispatchHook } from '../services/hooks/hooks'
import { updateToken } from '../services/thunks/user'

type TProtectedRouteProps = {
  path: string;
  exact?: boolean;
}

export const ProtectedRoute: FC<TProtectedRouteProps> = ({ children, ...rest }) => {
  const dispatch = useDispatchHook()
  const accessToken: boolean = document.cookie.indexOf('accessToken=') !== -1
  const refreshToken: boolean = localStorage['refreshToken'] !== undefined

  if(!accessToken && refreshToken) {
    dispatch(updateToken())
  }

  return (
    <Route
      {...rest}
      render={({location}) => accessToken ? (
        children 
          ) : (
            <Redirect to={{
              pathname: '/login',
              state: { from: location }
            }
          } />
        )
      }
    />
  );
}