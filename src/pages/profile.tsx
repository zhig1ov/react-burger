import React, { FC } from "react"
import { NavLink, Switch, Route, useRouteMatch } from 'react-router-dom'
import { useDispatchHook, useSelectorHook } from '../services/hooks/hooks'
import { logoutUser } from '../services/thunks/user'
import Preloader from '../components/preloader/preloader'
import profileMenuStyles from './profileMenu.module.css'
import { ProfileForm } from './profile-form'
import { OrderProfile } from '../components/order-profile/order-profile';

export const ProfilePage: FC = () => {
  const dispatch = useDispatchHook()
  const { logoutRequest } = useSelectorHook((store: any) => store.user)
  const { path } = useRouteMatch()
  const onLogout: () => void = () => dispatch(logoutUser())

  return (
    logoutRequest ? (
      <Preloader /> 
      ) : (
      <main className={profileMenuStyles.container}>
        <div className={`${profileMenuStyles.itemsContainer} pr-15`}>
          <ul className={`${profileMenuStyles.linkList}`}>
            <li><NavLink exact to={'/profile'} activeClassName='text_color_primary' className={`${profileMenuStyles.linkListItem} text text_type_main-medium text_color_inactive`}>Профиль</NavLink></li>
            <li><NavLink exact to={'/profile/orders'} activeClassName='text_color_primary' className={`${profileMenuStyles.linkListItem} text text_type_main-medium text_color_inactive`}>История заказов</NavLink></li>
            <li><NavLink exact to={'/login'} onClick={onLogout} activeClassName='text_color_primary' className={`${profileMenuStyles.linkListItem} text text_type_main-medium text_color_inactive`}>Выход</NavLink></li>
          </ul>
          <p className='text text_type_main-default text_color_inactive mt-20'> В этом разделе вы можете изменить свои персональные данные</p>
        </div>  
      <Switch>
        <Route path={path} exact>
          <ProfileForm />
        </Route>
        <Route path='/profile/orders' exact={true}>
                        <OrderProfile />
                    </Route>
      </Switch>
      </main>
    )
  )
}