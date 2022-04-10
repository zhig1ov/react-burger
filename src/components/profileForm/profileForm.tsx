import React, { useState, SyntheticEvent, FormEvent, FC } from "react"
import profileFormStyles from './profileForm.module.css'
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components"
import { useDispatchHook, useSelectorHook } from '../../services/hooks/hooks'
import { updateUser } from '../../services/actions/user'

type TDisabledForm = 'name' | 'email' | 'password'

export const ProfileForm: FC =  () => {

  const dispatch = useDispatchHook()
  const { email, name } = useSelectorHook((state) => state.user)

  const [values, setValues] = useState({
    name,
    email,
    password: ''
  })

  const [disabled, setDisabled] = useState({
    name: true,
    email: true,
    password: true
  })

  const toggleInputsDisable = (field: TDisabledForm) => {
    setDisabled({...disabled, [field]: !disabled[field] })
  }

  const resetForm = () => {
    setValues({
      name: name,
      email: email,
      password: ''
    })
    setDisabled({
      name: true,
      email: true,
      password: true
    })
  }

  const onFormChange = (e: SyntheticEvent<HTMLInputElement>) => {
    let target = e.target as HTMLInputElement
    const { name, value } = target //name - поле name у инпута, value - то, что мы вводим в инпут
    if (name && value ) setValues({ ...values, [name]: value })
  }

  const onFormSubmit = (e : FormEvent) => {
    e.preventDefault()
    const accessToken = document.cookie.replace(/(?:(?:^|.*;\s*)accessToken\s*=\s*([^;]*).*$)|^.*$/, "$1");
    const data: {name?: string, email?: string, password?: string} = {}
    if (values.name && values.name !== name) data.name = values.name
    if (values.email && values.email !== email) data.email = values.email
    if (values.password) data.password = values.password

    if(accessToken) {

      console.log({ email: data.email, password: data.password, accessToken: accessToken, name: data.name })
      dispatch(updateUser({ email: data.email, password: data.password, accessToken: accessToken, name: data.name }))
    }
  }

  return (
    <form action="" onSubmit={onFormSubmit} className={profileFormStyles.form}>
      <Input   
        type={'text'}
        icon={'EditIcon'}
        disabled={disabled.name}
        onIconClick={() => toggleInputsDisable('name')}
        placeholder={'Имя'}
        onChange={onFormChange}
        value={values.name}
        name={'name'}
        error={false}
        errorText={'Ошибка'}
        size={'default'}
        onBlur={() => () => toggleInputsDisable('name')}
      />
      <Input
        type={'text'}
        disabled={disabled.email}
        onIconClick={() => toggleInputsDisable('email')}
        placeholder={'Логин'}
        onChange={onFormChange}
        icon={'EditIcon'}
        value={values.email}
        name={'email'}
        error={false}
        errorText={'Ошибка'}
        size={'default'}
        onBlur={() => () => toggleInputsDisable('email')}
      />
      <Input
        type={'password'}
        disabled={disabled.password}
        onIconClick={() => toggleInputsDisable('password')}
        placeholder={'Пароль'}
        onChange={onFormChange}
        icon={'EditIcon'}
        value={values.password}
        name={'password'}
        error={false}
        errorText={'Ошибка'}
        size={'default'}
        onBlur={() => () => toggleInputsDisable('password')}
      />
      <div className={profileFormStyles.buttonsWrap}>
        <Button type="secondary" size="large" onClick={resetForm}>Отмена</Button>
        <Button type="primary" size="large">Сохранить</Button>
      </div>
    </form>
  )
}