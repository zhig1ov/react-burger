import React, { FC, MouseEvent, useEffect } from "react"
import profileMenuStyles from './profileMenu.module.css'
import { NavLink, useHistory } from 'react-router-dom'
import { useDispatchHook, useSelectorHook } from '../../services/hooks/hooks'
import { logout, getUser } from '../../services/actions/user'

export const ProfileMenu: FC = () => {
  const dispatch = useDispatchHook()
  let { logoutSuccess } = useSelectorHook((state) => state.user)
  const history = useHistory()

  useEffect(() => {
    if (logoutSuccess) {
      history.push('/login')
    }
  }, [logoutSuccess, history])

  useEffect(() => {
    const accessToken = document.cookie.replace(/(?:(?:^|.*;\s*)accessToken\s*=\s*([^;]*).*$)|^.*$/, "$1")
    if (accessToken) {
      dispatch(getUser(accessToken))
    }
  }, [dispatch])


  const onLogout = (e: MouseEvent) => {
    e.preventDefault()
    const refreshToken = document.cookie.replace(/(?:(?:^|.*;\s*)refreshToken\s*=\s*([^;]*).*$)|^.*$/, "$1")
    if (refreshToken) {
      dispatch(logout(refreshToken))
    }
  }

  return (
    <div className={`${profileMenuStyles.itemsContainer} pr-15`}>
      <ul className={`${profileMenuStyles.linkList}`}>
        <li><NavLink exact to={'/profile'} activeClassName='text_color_primary' className={`${profileMenuStyles.linkListItem} text text_type_main-medium text_color_inactive`}>Профиль</NavLink></li>
        <li><NavLink exact to={'/profile/orders'} activeClassName='text_color_primary' className={`${profileMenuStyles.linkListItem} text text_type_main-medium text_color_inactive`}>История заказов</NavLink></li>
        <li><NavLink exact to={'/login'} onClick={(e) => onLogout(e)} activeClassName='text_color_primary' className={`${profileMenuStyles.linkListItem} text text_type_main-medium text_color_inactive`}>Выход</NavLink></li>
      </ul>
      <p className='text text_type_main-default text_color_inactive mt-20'> В этом разделе вы можете изменить свои персональные данные</p>
    </div>
  )
}