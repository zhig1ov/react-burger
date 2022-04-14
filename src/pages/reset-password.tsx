import React, { useState, SyntheticEvent, FC } from "react";
// import ResetPasswordStyle from './reset-password.module.css'
import {  Button, Input } from '@ya.praktikum/react-developer-burger-ui-components'
import { AuthForm } from "../components/auth-form/auth-form"
import { Link, Redirect } from 'react-router-dom'
import { useDispatchHook, useSelectorHook } from "../services/hooks/hooks"
import { dispatchData } from '../services/action-creators'
import { getNewPassword } from '../services/thunks/user'
import { Preloader } from '../components/preloader/preloader'

export const ResetPasswordPage: FC = () => {
  const [passwordShow, setPasswordShow] = useState(false)
  const dispatch = useDispatchHook()
  const { user: {newPassword}, resetCode,newPasswordRequest} = useSelectorHook((store: any) => store.user)
  const accessToken: boolean = document.cookie.indexOf('accessToken=') !== -1

  const onFormSubmit = () => {
    dispatch(getNewPassword('/password-reset/reset', newPassword, resetCode))
  }

  const setValue = (e: SyntheticEvent) => {
    dispatch(dispatchData(
      (e.target as HTMLInputElement).name,
      (e.target as HTMLInputElement).value
    ))
  }

  return (
    newPasswordRequest ? (
      <Preloader />
      ) : ( accessToken || newPassword === 'changed' ) ? (
      <Redirect to={'/'} />
      ) : (
      <AuthForm title={'Восстановление пароля'} onSubmit={onFormSubmit} >
        <Input
          type={passwordShow ? 'text' : 'password'}
          value={newPassword}
          name={"newPassword"}
          placeholder="Введите новый пароль"
          size="default"
          onChange={(e) => setValue(e)}
          icon={passwordShow ? 'ShowIcon' : 'HideIcon'}
          onIconClick={() => setPasswordShow(!passwordShow)}
        />
        <Input
          type={'text'}
          placeholder={'Введите код из письма'}
          onChange={(e) => setValue(e)}
          icon="EditIcon"
          value={resetCode}
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
  )
}