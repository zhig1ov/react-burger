import React, { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import feedStyle from './feed.module.css'
import OrderItem from "../components/order-item/order-item"
import { WS_CONNECTION_START, WS_CONNECTION_CLOSE } from '../services/action-constants/ws'
import { TOrder } from '../utils/types'
import Preloader from '../components/preloader/preloader'
import { useDispatchHook, useSelectorHook } from '../services/hooks/hooks'
import { filterOrdersByStatus } from '../utils/utils'


export function FeedPage() {
    let location = useLocation();

    const dispatch = useDispatchHook();
    useEffect(() => {
        dispatch({ type: WS_CONNECTION_START });
        return () => {
            dispatch({ type: WS_CONNECTION_CLOSE })
        }
    }, [dispatch]);

    const { orders, total, totalToday } = useSelectorHook((store) => store.ws)
    const statusArrays = filterOrdersByStatus(orders)
    const doneArray = statusArrays?.done.slice(0, 20);

    if (!orders) {
        return <Preloader />
    } else {
        return (
            <div className={`${feedStyle.container} p-10`}>
                <div>
                    <h2 className={'text text_type_main-large mb-5'}>Лента заказов</h2>
                    <ul className={feedStyle.orders}>
                        {orders?.map((el: TOrder) => (
                            <li className={`${feedStyle.order} mb-4`} key={el._id}>
                                <Link to={{
                                    pathname: `/feed/${el.number}`,
                                    state: { background: location }
                                }} className={feedStyle.link}>
                                    <OrderItem 
                                        number={el.number}
                                        name={el.name}
                                        ingredients={el.ingredients}
                                        createdAt={el.createdAt}
                                    />
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className={`${feedStyle.queue} pl-4`}>
                    <div className={feedStyle.queue__list}>
                        <div>
                            <h3 className={'text text_type_main-medium mb-6'}>Готовы:</h3>
                            <ul className={`${feedStyle.list} ${feedStyle.list_blue} text text_type_digits-default`}>
                                {doneArray?.map((el: TOrder) => (
                                    <li key={el._id} >
                                        {el.number}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h3 className={'text text_type_main-medium'}>В работе:</h3>
                            <ul className={`${feedStyle.list} text text_type_digits-default`}>
                                {statusArrays?.pending.map((el: TOrder) => (
                                    <li key={el._id} >
                                        {el.number}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div>
                        <h3 className={'text text_type_main-medium'}>Выполнено за все время:</h3>
                        <span className={`${feedStyle.total} text text_type_digits-large`}>{total || 0}</span>
                    </div>
                    <div>
                        <h3 className={'text text_type_main-medium'}>Выполнено за сегодня:</h3>
                        <span className={`${feedStyle.total} text text_type_digits-large`}>{totalToday || 0}</span>
                    </div>
                </div>
            </div>
        )
    }
}
