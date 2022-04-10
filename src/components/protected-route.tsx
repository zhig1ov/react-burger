import React, { FC, useEffect, useState } from 'react'
import { Route, RouteProps, Redirect } from 'react-router-dom'
import { useSelectorHook, useDispatchHook } from '../services/hooks/hooks'
import { dispatchGetUser, getUser } from '../services/actions/user1'

export const ProtectedRoute: React.FC<RouteProps> = ({
  children,
  ...rest
}) => {
  const dispatch = useDispatchHook();
  const { name } = useSelectorHook((state) => state.user);
  const [isUserLoaded, setUserLoaded] = useState(false);

  const init = async () => {
    dispatch(getUser());
    setUserLoaded(true);
  };

  useEffect(() => {
    init();
  }, []);

  if (!name) {
    return (
      <Route
        {...rest}
        render={({ location }) => (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )}
      />
    );
  }

  return <Route {...rest} render={() => children} />;
};