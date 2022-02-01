import React, { useState, ChangeEvent } from "react"
// import registerStyles from './register.module.css'
import { AuthForm } from '../components/auth-form/auth-form'
import { Input, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { Link } from 'react-router-dom'


export const RegisterPage = () => {
  const [nameValue, setNameValue] = useState('')
  const [emailValue, setEmailValue] = useState('')
  const [passwordValue, setPasswordValue] = useState('')

  const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setNameValue(e.target.value)
  }

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>)=> {
    setEmailValue(e.target.value)
  }

  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPasswordValue(e.target.value)
  }

  const onFormSubmit = () => setNameValue('asds')
  
  return (
    <AuthForm title={'Регистрация'} onSubmit={onFormSubmit}>
      <Input
        type={'text'}
        placeholder={'Имя'}
        onChange={onChangeName}
        value={nameValue}
        name={'name'}
        error={false}
        errorText={undefined}
        size={'default'}
      />

      <EmailInput onChange={onChangeEmail} value={emailValue} name={'email'} />
      <PasswordInput onChange={onChangePassword} value={passwordValue} name={'password'} />
      <Button type="primary" size="medium">
        Зарегистрироваться
      </Button>
      <p className={`text text_type_main-default text_color_inactive mt-20`}>
        Уже зарегистрированы?&ensp;
        <Link to={'/login'} className='text text_color_accent'>Войти</Link>
      </p>
    </AuthForm>
  )
}