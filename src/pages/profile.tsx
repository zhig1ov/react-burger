import React, { FC, useState, ChangeEvent} from "react"
import profileStyles from './profile.module.css'
import { AuthForm } from '../components/auth-form/auth-form'
import { Input, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { Link } from 'react-router-dom'
import { DropTarget } from "react-dnd"
import { ProfileForm } from "../components/profileForm/profileForm"
import { ProfileMenu } from "../components/profileMenu/profileMenu"



export const ProfilePage: FC = () => {
 

  return (
    <div className={profileStyles.container}>
      <ProfileMenu />
      <ProfileForm />
    </div>
  )
}