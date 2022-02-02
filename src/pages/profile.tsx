import React, { FC } from "react"
import profileStyles from './profile.module.css'
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