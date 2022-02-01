import React, { useState, ChangeEvent } from "react"
// import loginStyles from './login.module.css'
import { AuthForm } from '../components/auth-form/auth-form'
import { Link, NavLink } from 'react-router-dom'
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components'

export const LoginPage = () => {
  const [emailValue, setEmailValue] = useState('')
  const [passwordValue, setPasswordValue] = useState('')

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>)=> {
    setEmailValue(e.target.value)
  }

  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPasswordValue(e.target.value)
  }

  const onFormSubmit = () => setEmailValue('asds');

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
        Вы — новый пользователь?&ensp;
        <NavLink to={'/register'} className='text text_color_accent'>Зарегистрироваться</NavLink>
      </p>
      <p className={`text text_type_main-default text_color_inactive mt-4`}>
        Забыли пароль?&ensp;
        <Link to={'/forgot-password'} className='text text_color_accent'>Восстановить пароль</Link>
      </p>
    </AuthForm>
  )
}