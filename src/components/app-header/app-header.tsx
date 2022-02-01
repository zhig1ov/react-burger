import React from 'react'
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import headerStyle from './app-header.module.css'
import { Link } from 'react-router-dom'

import { _checkResponse } from '../../services/actions/index'

const AppHeader = () => {
  return(
    <header>
      <nav className={headerStyle.container}>
      <div className={headerStyle.flex}>
        <a className={`${headerStyle.item} pt-4 pb-4 pl-5 pr-5 ml-2 `} href="/#">
          <BurgerIcon type="primary" />
          <p className={`text text_type_main-default text_color_primary pl-2`}>Конструктор</p>
        </a>
        <a className={`${headerStyle.item} pt-4 pb-4 pl-5 pr-5 ml-2 `} href="/#">
          <ListIcon type="primary" />
          <p className={`text text_type_main-default text_color_inactive pl-2`}>Лента заказов</p>
        </a>
      </div>
      <Logo />
      <a className={`${headerStyle.item} pt-4 pb-4 pl-5 pr-5 ml-2`} href="/#">
        <ProfileIcon type="primary" />
        <p className={`text text_type_main-default text_color_inactive pl-2`}><Link to={'/profile'}>Личный кабинет</Link></p>
      </a>
      </nav>
    </header>
  )
}

export default AppHeader