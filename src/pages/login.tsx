import React, { useState, ChangeEvent, useEffect } from "react"
// import loginStyles from './login.module.css'
import { AuthForm } from '../components/auth-form/auth-form'
import { Link, NavLink, useHistory, Redirect, useLocation } from 'react-router-dom'
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { useDispatchHook, useSelectorHook } from "../services/hooks/hooks"
import { login } from "../services/actions/user"
import { TLocationTemplate} from '../utils/types'

export const LoginPage = () => {
  const [emailValue, setEmailValue] = useState('')
  const [passwordValue, setPasswordValue] = useState('')
  const user = useSelectorHook((state) => state.user)
  const dispatch = useDispatchHook()
  const history = useHistory()
  const location = useLocation<TLocationTemplate>()


  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>)=> {
    setEmailValue(e.target.value)
  }

  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPasswordValue(e.target.value)
  }

  const onFormSubmit = () => {
    dispatch(login({ email: emailValue, password: passwordValue }))
  }

  useEffect(() => {
    if (user.loginSuccess) {
      user.loginSuccess = false
      history.push('/')
    }
  }, [user, history])

  if (user.name) {
    const { from } = location.state || { from: { pathname: '/' } }
    return <Redirect to={from} />
  }

  return (
    <AuthForm title={'Вход'} onSubmit={onFormSubmit}>
      <Input
        type={'text'}
        placeholder={'Укажите e-mail'}
        onChange={onChangeEmail}
        value={emailValue}
        name={'email'}
        error={false}
        errorText={undefined}
        size={'default'}
      />
      <PasswordInput onChange={onChangePassword} value={passwordValue} name={'password'} />
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
}