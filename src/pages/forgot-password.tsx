import React, { FC, useState, ChangeEvent } from "react";
import forgotPasswordStyle from './forgot-password.module.css'
import { AuthForm } from '../components/auth-form/auth-form'
import { Link } from 'react-router-dom'
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { useDispatchHook } from "../services/hooks/hooks"

export const ForgotPassword = () => {
  const [emailValue, setEmailValue] = useState('')
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmailValue(e.target.value)
  }
  
  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmailValue(e.target.value)
  }
  
  const onFormSubmit = () => setEmailValue('asds')

  return (
    <AuthForm title={'Восстановление пароля'} onSubmit={onFormSubmit}>
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
        <Button type="primary" size="medium">
          Восстановить
        </Button>
        <p className={`text text_type_main-default text_color_inactive mt-20`}>
          Вспомнили пароль?&ensp;
            {/* <Link to={'/login'}>Войти</Link> */}
        </p>
      </AuthForm>
  )
}