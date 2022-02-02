import React, { useState, ChangeEvent, useEffect } from "react"
import { AuthForm } from '../components/auth-form/auth-form'
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { Link, useHistory, Redirect, useLocation } from 'react-router-dom'
import { useDispatchHook, useSelectorHook } from "../services/hooks/hooks"
import { createUser } from "../services/actions/user"
import { TLocationTemplate } from "../utils/types"


export const RegisterPage = () => {
  const [nameValue, setNameValue] = useState('')
  const [emailValue, setEmailValue] = useState('')
  const [passwordValue, setPasswordValue] = useState('')
  const user = useSelectorHook((state) => state.user)
  const dispatch = useDispatchHook()
  const history = useHistory()
  const location = useLocation<TLocationTemplate>()

  const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setNameValue(e.target.value)
  }

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>)=> {
    setEmailValue(e.target.value)
  }

  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPasswordValue(e.target.value)
  }

  const onFormSubmit = () => {
    dispatch(createUser({ email: emailValue, password: passwordValue, name: nameValue}))
  }

  useEffect(() => {
    if (user.registerSuccess) {
      user.registerSuccess = false
      history.push('/')
    }
  }, [user, history])

  if (user.name) {
    const { from } = location.state || { from: { pathname: '/' } }
    return <Redirect to={from} />
  }
  
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
      <Input
        type={'text'}
        placeholder={'E-mail'}
        onChange={onChangeEmail}
        value={emailValue}
        name={'email'}
        error={false}
        errorText={undefined}
        size={'default'}
      />
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