import React, { useState, SyntheticEvent, FormEvent, FC } from "react"
import profileFormStyles from './profileForm.module.css'
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components"
import { useDispatchHook, useSelectorHook } from '../services/hooks/hooks'
import { CANCEL_GET_USER_DATA } from '../services/action-constants/user';
import { getUserData } from '../services/thunks/user'
import { dispatchData } from '../services/action-creators'

type TDisabledForm = 'name' | 'email' | 'password'
interface SubmitEvent extends Event {
  readonly submitter: HTMLElement;
}

export const ProfileForm: FC =  () => {
  const dispatch = useDispatchHook()
  const { name, email, password } = useSelectorHook((store: any) => store.user.user)
  
  const setValue = (e: SyntheticEvent) => {
    dispatch(dispatchData(
      (e.target as HTMLInputElement).name,
      (e.target as HTMLInputElement).value
    ))
  }

  const onFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const clickName = (e.nativeEvent as SubmitEvent).submitter.innerText
    const userData = { name, email }
    clickName === 'Сохранить' ? 
      dispatch(getUserData('PATCH', userData)) : 
      dispatch(getUserData('GET'))   
    clickName === 'Отмена' && 
    dispatch({ type: CANCEL_GET_USER_DATA })
  }

  const [disabled, setDisabled] = useState({
    name: true,
    email: true,
    password: true
  })

  const toggleInputsDisable = (field: TDisabledForm) => {
    setDisabled({...disabled, [field]: !disabled[field] })
  }

  return (
    <form action="" onSubmit={onFormSubmit} className={profileFormStyles.form}>
      <Input   
        type={'text'}
        icon={'EditIcon'}
        disabled={disabled.name}
        onIconClick={() => toggleInputsDisable('name')}
        placeholder={'Имя'}
        onChange={(e) => setValue(e)}
        value={name}
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
        onChange={(e) => setValue(e)}
        icon={'EditIcon'}
        value={email}
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
        onChange={(e) => setValue(e)}
        icon={'EditIcon'}
        value={password}
        name={'password'}
        error={false}
        errorText={'Ошибка'}
        size={'default'}
        onBlur={() => () => toggleInputsDisable('password')}
      />
      <div className={profileFormStyles.buttonsWrap}>
        <Button type="secondary" size="large">Отмена</Button>
        <Button type="primary" size="large">Сохранить</Button>
      </div>
    </form>
  )
}