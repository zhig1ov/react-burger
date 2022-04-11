import React, { SyntheticEvent } from "react"
import { AuthForm } from '../components/auth-form/auth-form'
import { Link, NavLink, useHistory, Redirect, useLocation } from 'react-router-dom'
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { useDispatchHook, useSelectorHook } from "../services/hooks/hooks"
import { dispatchData } from '../services/action-creators'
import { loginUser } from '../services/thunks/user'
import Preloader from '../components/preloader/preloader'

export const LoginPage = () => {
  const dispatch = useDispatchHook()
  const history = useHistory()
  const { state }: any  = history.location
  const { user:{email, password}, loginRequest, logoutRequest } = useSelectorHook((store: any) => store.user)
  const accessToken: boolean = document.cookie.indexOf('accessToken=') !== -1

  const onFormSubmit = () => {
    dispatch(loginUser({ email, password }))}

  const setValue = (e: SyntheticEvent) => {
    dispatch(dispatchData(
      (e.target as HTMLInputElement).name,
      (e.target as HTMLInputElement).value
    ))
  }

  return (
    loginRequest || logoutRequest ? (
      <Preloader /> 
      ) : ( accessToken) ? (
      <Redirect to={state?.from  || '/'} />
      ) : (
    <AuthForm title={'Вход'} onSubmit={onFormSubmit}>
      <Input
        type={'text'}
        placeholder={'Укажите e-mail'}
        onChange={(e) => setValue(e)}
        value={email}
        name={'email'}
        error={false}
        errorText={undefined}
        size={'default'}
      />
      <PasswordInput onChange={(e) => setValue(e)} value={password} name={'password'} />
      <Button type="primary" size="medium">
        Войти
      </Button>
      <p className={`text text_type_main-default text_color_inactive mt-20`}>
        Вы — новый пользователь?&ensp;
        <NavLink to={'/register'} className='text text_color_accent'>Зарегистрироваться</NavLink>
      </p>
      <p className={`text text_type_main-default text_color_inactive mt-4`}>
        Забыли пароль?&ensp;
        <Link to={'/forgot-password'} className='text text_color_accent'>Восстановить пароль</Link>
      </p>
    </AuthForm>
    )
  )
}