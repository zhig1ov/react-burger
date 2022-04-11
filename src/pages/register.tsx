import React, { FC, SyntheticEvent } from "react"
import { AuthForm } from '../components/auth-form/auth-form'
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { Link, useHistory, Redirect } from 'react-router-dom'
import { useDispatchHook, useSelectorHook } from '../services/hooks/hooks'
import { dispatchData } from '../services/action-creators'
import { registerNewUser } from '../services/thunks/user'
import Preloader from '../components/preloader/preloader'

export const RegisterPage: FC = () => {
  const dispatch = useDispatchHook()
  const history = useHistory()
  const { user: {name, email, password}, registerRequest } = useSelectorHook((store: any) => store.user)
  const { state }: any = history.location
  const accessToken = document.cookie.indexOf('accessToken=') !== -1

  const onFormSubmit = () => {
    dispatch(registerNewUser({ name, email, password }))
  }

  const setValue = (e: SyntheticEvent) => {
    dispatch(dispatchData(
      (e.target as HTMLInputElement).name,
      (e.target as HTMLInputElement).value
    ))
  }

  return (
    registerRequest ? (
      <Preloader />
      ) : ( accessToken ) ? (
      <Redirect to={state?.from || '/'} />
      ) : (
      <AuthForm title={'Регистрация'} onSubmit={onFormSubmit}>
        <Input
          type={'text'}
          placeholder={'Имя'}
          onChange={(e) => setValue(e)}
          value={name}
          name={'name'}
          error={false}
          errorText={undefined}
          size={'default'}
        />
        <Input
          type={'text'}
          placeholder={'E-mail'}
          onChange={(e) => setValue(e)}
          value={email}
          name={'email'}
          error={false}
          errorText={undefined}
          size={'default'}
        />
        <PasswordInput onChange={(e) => setValue(e)} value={password} name={'password'} />
        <Button type="primary" size="medium">
          Зарегистрироваться
        </Button>
        <p className={`text text_type_main-default text_color_inactive mt-20`}>
          Уже зарегистрированы?&ensp;
          <Link to={'/login'} className='text text_color_accent'>Войти</Link>
        </p>
      </AuthForm>
    )
  )
}