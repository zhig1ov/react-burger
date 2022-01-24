import React, { FC, useState, ChangeEvent, MouseEvent } from "react";
import ResetPasswordStyle from './reset-password.module.css'
import {  Button, Input } from '@ya.praktikum/react-developer-burger-ui-components'
import { AuthForm } from "../components/auth-form/auth-form"

export const ResetPassword = () => {
  const [passwordValue, setPasswordValue] = React.useState('')
  const [codeValue, setCodeValue] = React.useState('')
  const [passwordShow, setPasswordShow] = useState(false)
  
  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPasswordValue(e.target.value)
  }

  const onChangeCode = (e: ChangeEvent<HTMLInputElement>) => {
    setCodeValue(e.target.value)
  }

  const onFormSubmit = () => setCodeValue('asds');

  return (
    <AuthForm title={'Восстановление пароля'} onSubmit={onFormSubmit} >
      <Input
          type={passwordShow ? 'text' : 'password'}
          value={passwordValue}
          name={"password"}
          placeholder="Введите новый пароль"
          size="default"
          onChange={(e) => setPasswordValue(e.target.value)}
          icon={passwordShow ? 'ShowIcon' : 'HideIcon'}
          onIconClick={() => setPasswordShow(!passwordShow)}
        />
         <Input
          type={'text'}
          placeholder={'Введите код из письма'}
          onChange={onChangeCode}
          icon="EditIcon"
          value={codeValue}
          name={'code'}
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