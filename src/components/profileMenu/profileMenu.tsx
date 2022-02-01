import React, { FC } from "react"
import profileMenuStyles from './profileMenu.module.css'
import { NavLink, useHistory } from 'react-router-dom'
import { useDispatchHook } from '../../services/hooks/hooks'
import { logout } from '../../services/actions/user'

export const ProfileMenu: FC = () => {
  const dispatch = useDispatchHook()
  const history = useHistory()
  const onLogout = () => {
    dispatch(logout())
    history.replace({ pathname: '/logout'})
  }

  return (
    <div className={`${profileMenuStyles.itemsContainer} pr-15`}>
      <ul className={`${profileMenuStyles.linkList}`}>
        <li><NavLink exact to={'/profile'} activeClassName='text_color_primary' className={`${profileMenuStyles.linkListItem} text text_type_main-medium text_color_inactive`}>Профиль</NavLink></li>
        <li><NavLink exact to={'/profile/orders'} activeClassName='text_color_primary' className={`${profileMenuStyles.linkListItem} text text_type_main-medium text_color_inactive`}>История заказов</NavLink></li>
        <li><NavLink exact to={{pathname: '/login'}} onClick={onLogout} activeClassName='text_color_primary' className={`${profileMenuStyles.linkListItem} text text_type_main-medium text_color_inactive`}>Выход</NavLink></li>
      </ul>
      <p className='text text_type_main-default text_color_inactive mt-20'> В этом разделе вы можете изменить свои персональные данные</p>
    </div>
  )
}