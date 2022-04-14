import React from 'react'
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import headerStyle from './app-header.module.css'
import { NavLink } from 'react-router-dom'
import { useSelectorHook } from '../../services/hooks/hooks'

const AppHeader = () => {
  const { name } = useSelectorHook((state) => state.user)

  return(
    <header>
      <nav className={headerStyle.container}>
      <div className={headerStyle.flex}>
        <NavLink to={'/'} exact={true} className={`${headerStyle.item} text text_type_main-default text_color_primary pl-2`}>
          <BurgerIcon type="primary" />
          <p>Конструктор</p>
        </NavLink>
        <NavLink to={'./orders'} exact={true} className={`${headerStyle.item} text text_type_main-default text_color_inactive pl-2 `}>
          <ListIcon type="primary" />
          <p>Лента заказов</p>
        </NavLink>
      </div>
      <Logo />
      <NavLink to={"/profile"} exact={true} className={`${headerStyle.item} text text_type_main-default text_color_inactive pl-2`} activeClassName='text_color_primary'>
        <ProfileIcon type="primary" />
        <p>Личный кабинет</p>
      </NavLink>
      </nav>
    </header>
  )
}

export default AppHeader