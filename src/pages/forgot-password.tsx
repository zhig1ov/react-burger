import React, { SyntheticEvent } from "react"
import { AuthForm } from '../components/auth-form/auth-form'
import { Link, Redirect  } from 'react-router-dom'
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { useDispatchHook, useSelectorHook } from '../services/hooks/hooks'
import { restorePassword } from '../services/thunks/user'
import { SET_RESTORE_EMAIL } from '../services/action-constants/user'
import Preloader from '../components/preloader/preloader'

export const ForgotPasswordPage = () => {
  const dispatch = useDispatchHook()
  const { 
    changePasswordRequest, 
    changePasswordEmail, 
    changePasswordMessage
  } = useSelectorHook((store: any) => store.user)
  const accessToken = document.cookie.indexOf('accessToken=') !== -1

  const onFormSubmit = () => {
    if(changePasswordEmail.length)
      dispatch(restorePassword('/password-reset', changePasswordEmail))
  }

  const setValue = (e: SyntheticEvent) => {
    dispatch({
      type: SET_RESTORE_EMAIL,
      email: (e.target as HTMLInputElement).value
    })
  }

  return (
    changePasswordRequest ? (
      <Preloader />
      ) : ( accessToken ) ? (
      <Redirect to={'/'} />
      ) : ( changePasswordMessage ) ? (
      <Redirect to={'/reset-password'} /> 
      ) : (
    <AuthForm title={'Восстановление пароля'} onSubmit={onFormSubmit}>
        <Input
          type={'text'}
          placeholder={'Укажите e-mail'}
          onChange={(e) => setValue(e)}
          value={changePasswordEmail}
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
  )
}