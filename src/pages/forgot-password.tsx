import React, { useState, ChangeEvent, SyntheticEvent, useEffect } from "react";
// import forgotPasswordStyle from './forgot-password.module.css'
import { AuthForm } from '../components/auth-form/auth-form'
import { Link, useHistory, Redirect } from 'react-router-dom'
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { useDispatchHook, useSelectorHook } from '../services/hooks/hooks'
import { resetPassword } from '../services/actions/user'

export const ForgotPasswordPage = () => {
  const [emailValue, setEmailValue] = useState('')
  const dispatch = useDispatchHook()
  const history = useHistory()
  let { resetPasswordSuccess, name } = useSelectorHook(state => state.user)
  
  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmailValue(e.target.value)
  }
  
  const onFormSubmit = () => {
    dispatch(resetPassword({ email: emailValue}))
  }
  
  useEffect(() => {
    if (resetPasswordSuccess) {
      resetPasswordSuccess = false
      history.push('/reset-password')
    }
  }, [history, resetPasswordSuccess])
  
  if (name) {
    return <Redirect to='/' />
  }


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