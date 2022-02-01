import React, { useEffect } from 'react'
import AppHeader from '../app-header/app-header'
import appStyle from './app.module.css'
import { useDispatchHook } from '../../services/hooks/hooks'
import { getIngredients } from '../../services/actions/index'
import { useSelectorHook } from "../../services/hooks/hooks"
import { Route } from 'react-router-dom'
import { ForgotPasswordPage, LoginPage, RegisterPage, ResetPasswordPage, HomePage, ProfilePage } from '../../pages'

const App = () => {
  const dispatch = useDispatchHook()
  const ingredients = useSelectorHook(state => state.burger.ingredients)

  useEffect(() => {
    dispatch(getIngredients())
  }, [dispatch]);
  
  return (
    <div className={appStyle.app}>
      <AppHeader />
      <main className={appStyle.main} >
      <Route path='/react-burger' exact render={() => <HomePage />} />
      <Route path='/login' exact render={() => <LoginPage />} />
      <Route path='/register' exact render={() => <RegisterPage />} />
      <Route path='/forgot-password' exact render={() => <ForgotPasswordPage />} />
      <Route path='/reset-password' exact render={() => <ResetPasswordPage />} />
      <Route path='/profile' exact render={() => <ProfilePage />} />
      </main>
    </div>
  );
}

export { App }


