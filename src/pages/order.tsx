import React, { useEffect } from 'react';
import orderStyles from './order.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { useParams, Redirect, useRouteMatch } from 'react-router-dom';

import { useDispatchHook, useSelectorHook } from '../services/hooks/hooks'
import { getOrder, getUserOrder } from '../services/thunks/burger';
import Preloader from '../components/preloader/preloader'
import { createCardDate, getStatus, getPrice, getBurgerIngredients, getBurgerIngredientsObjWithCount } from '../utils/utils'

export function OrderPage() {
    const dispatch = useDispatchHook();
    const isProfile = !!useRouteMatch("/profile");
    const { id } = useParams<{ id: string }>();
    useEffect(() => {
        dispatch(isProfile ? getUserOrder(id) : getOrder(id))
    },[dispatch, isProfile, id]);

    const allIngredients  = useSelectorHook((store) => store.burger.ingredients)
    const order = useSelectorHook((store) => store.burger.currentOrder)
    const { orderLoaded } = useSelectorHook((store) => store.burger)
    const stringWithDay = order && order.createdAt && createCardDate(order?.createdAt);
    const burgerIngredients = order && order.ingredients && getBurgerIngredients(order?.ingredients, allIngredients)
    const arrUniqItem: Array<string> = Array.from(new Set(order?.ingredients))
    const bI = burgerIngredients && getBurgerIngredientsObjWithCount(burgerIngredients)
    const burgerPrice = burgerIngredients && getPrice(burgerIngredients)
    const name = order?.name
    const status = order?.status;
    const st = status ? getStatus(status) : null;
    if (orderLoaded && !order) {
        return <Redirect to='/' />;
    } else if (!order) {
        return <Preloader />;
    } else {
        return (
            <div className={orderStyles.container}>
                <div>
                    <span className={'text text_type_digits-default'}>#{id}</span>
                    <h1 className={`${orderStyles.title} text text_type_main-medium mb-3 mt-10`}>{name}</h1>
                    <p className={`${orderStyles.status} ${orderStyles[`status_color_${st?.textColor}`]} text text_type_main-default mb-15 `}>{st?.text}</p>
                    <p className={`${orderStyles.title} text text_type_main-medium mb-6`}>Состав:</p>
                    <ul className={`${orderStyles.list} mb-10`}>
                        {arrUniqItem.map((el: string, i: number) => {
                            return (
                                <li className={`${orderStyles.list__item} mr-6)`} key={i}>
                                    <div className={`${orderStyles.icon} mr-4`}>
                                        <img src={bI?.item[el]?.image_mobile} alt='Вкусная булка' />
                                    </div>
                                    <p className={`${orderStyles.ingredient} mr-4 text text_type_main-default`}>
                                        {bI?.item[el]?.name}
                                    </p>
                                    <span className={`mr-1 text text_type_digits-default`}>
                                        {bI?.count[el]} x{' '}
                                    </span>
                                    <span className={`${orderStyles.element__price} text`}>
                                        {bI?.item[el]?.price || 0}
                                        <CurrencyIcon type="primary" />
                                    </span>
                                </li>
                            )
                        })}
                    </ul>
                    <div className={orderStyles.info}>
                        <span className={'text text_type_main-default text_color_inactive'}>{stringWithDay}</span>
                        <span className={`${orderStyles.element__price} text`}>
                            {burgerPrice || 0}
                            <CurrencyIcon type="primary" />
                        </span>
                    </div>
                </div>
            </div >
        );
    }
}
