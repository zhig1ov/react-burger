import React, { useState, ChangeEvent, useEffect } from "react";
// import ResetPasswordStyle from './reset-password.module.css'
import {  Button, Input } from '@ya.praktikum/react-developer-burger-ui-components'
import { AuthForm } from "../components/auth-form/auth-form"
import { Link, Redirect, useHistory } from 'react-router-dom'
import { useDispatchHook, useSelectorHook } from "../services/hooks/hooks";
import { resetPasswordCode } from '../services/actions/user'

export const ResetPasswordPage = () => {
  const [passwordValue, setPasswordValue] = useState('')
  const [codeValue, setCodeValue] = useState('')
  const [passwordShow, setPasswordShow] = useState(false)
  let { resetPasswordCodeSuccess, name } = useSelectorHook((state) => state.user)
  const dispatch = useDispatchHook()
  const history = useHistory()
  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPasswordValue(e.target.value)
  }

  const onChangeCode = (e: ChangeEvent<HTMLInputElement>) => {
    setCodeValue(e.target.value)
  }

  const onFormSubmit = () => {
    dispatch(resetPasswordCode({ password: passwordValue, code: codeValue }))
  }

  useEffect(() => {
    if (resetPasswordCodeSuccess) {
      resetPasswordCodeSuccess = false
      history.push('/login')
    }
  }, [resetPasswordCodeSuccess, history])

  if (name) {
    return <Redirect to='/' />
  }

  return (
    <AuthForm title={'Восстановление пароля'} onSubmit={onFormSubmit} >
      <Input
          type={passwordShow ? 'text' : 'password'}
          value={passwordValue}
          name={"password"}
          placeholder="Введите новый пароль"
          size="default"
          onChange={onChangePassword}
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
            <Link to={'/login'} className='text text_color_accent'>Войти</Link>
          </p>
      </AuthForm>
  )
}