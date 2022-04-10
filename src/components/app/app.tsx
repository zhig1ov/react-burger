import React, { useEffect } from 'react'
import AppHeader from '../app-header/app-header'
import appStyle from './app.module.css'
import { useDispatchHook } from '../../services/hooks/hooks'
import { getIngredients } from '../../services/actions/index'
import { Route, Switch, useHistory, useLocation } from 'react-router-dom'
import { ForgotPasswordPage, LoginPage, RegisterPage, ResetPasswordPage, HomePage, ProfilePage, IngredientDetailsPage, NotFoundPage } from '../../pages'
import { ProtectedRoute } from '../protected-route'
import { ProtectedUnauthorizedRouteWithReset } from '../protectedUnauthorizedRouteWithReset'

const App = () => {
  const dispatch = useDispatchHook()
  const location: any = useLocation()
  const background = location.state && location.state.background
  const history = useHistory()


  useEffect(() => {
    dispatch(getIngredients())
    history.push(location.pathname)
  }, [dispatch, history])
  
  return (
    <div className={appStyle.app}>
      <AppHeader />
      <main className={appStyle.main}>
        <Switch location={background || location}>
          <Route path='/' exact render={() => <HomePage />} />
          <Route path='/ingredients/:id' exact render={() => <IngredientDetailsPage />} />
          <Route path='/login' exact render={() => <LoginPage />} />
          <Route path='/register' exact render={() => <RegisterPage />} />
          <Route path='/forgot-password' exact render={() => <ForgotPasswordPage />} />
          <ProtectedUnauthorizedRouteWithReset path='/reset-password'  exact children={ <ResetPasswordPage />} />
          <Route path='/orders' exact render={() => <div>orders</div>} />
          <ProtectedRoute path='/profile' exact children={<ProfilePage />} />
          <Route path="*" render={() => <NotFoundPage />} />
        </Switch>
      </main>
      {background && <Route path='/ingredients/:id'></Route>}
    </div>
  );
}

export { App }


