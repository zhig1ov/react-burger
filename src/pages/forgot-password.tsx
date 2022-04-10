import React, { useState, ChangeEvent, useEffect } from "react";
import { AuthForm } from '../components/auth-form/auth-form'
import { Link, useHistory, Redirect, useLocation } from 'react-router-dom'
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { useDispatchHook, useSelectorHook } from '../services/hooks/hooks'
import { resetPassword } from '../services/actions/user'
import { TLocationTemplate } from "../utils/types";

export const ForgotPasswordPage = () => {
  const [emailValue, setEmailValue] = useState('')
  const dispatch = useDispatchHook()
  const history = useHistory()
  const user = useSelectorHook(state => state.user)
  const location = useLocation<TLocationTemplate>()
  const { from } = location.state || { from: { pathname: '/' } }

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmailValue(e.target.value)
  }
  
  const onFormSubmit = () => {
    dispatch(resetPassword({ email: emailValue}))
  }

  // useEffect(() => {
  //   if (user.resetPasswordSuccess) {
  //     // user.resetPasswordSuccess = false
  //     console.log('Сброс')
  //     history.push('/reset-password')
  //   }
  // }, [history, user])

  if (user.resetPasswordSuccess) {
    user.passwordReset = true
    return (
      <Redirect to={{
        pathname: '/reset-password',
        
      }}
      />
    );
  } 

  // if (user.name) {
  //   return <Redirect to={from} />
  // }

  return (
    <AuthForm title={'Восстановление пароля'} onSubmit={onFormSubmit}>
        <Input
          type={'text'}
          placeholder={'Укажите e-mail'}
          onChange={onChangeEmail}
          value={emailValue}
          name={'email'}
          error={false}
          errorText={''}
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