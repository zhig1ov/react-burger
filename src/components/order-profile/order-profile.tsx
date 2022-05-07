import React, { useEffect } from 'react';
import orderProfile from './order-profile.module.css';
import { Link, useLocation } from 'react-router-dom';
import OrderItem from '../order-item/order-item';
import { useDispatchHook, useSelectorHook } from '../../services/hooks/hooks'
import { WS_CONNECTION_START_AUTH, WS_CONNECTION_CLOSE_AUTH } from '../../services/action-constants/ws-actions-auth';
import { TOrder } from '../../utils/types'

export function OrderProfile() {
	const dispatch = useDispatchHook();
	const location = useLocation();

	useEffect(
		() => {
			dispatch({ type: WS_CONNECTION_START_AUTH });
			return () => {
				dispatch({ type: WS_CONNECTION_CLOSE_AUTH })
				return;
			}
		},
		[dispatch]
	);

	const { orders } = useSelectorHook((store) => store.wsAuth);
	return (
    <ul className={orderProfile.orders}>
      {
        orders?.map((el: TOrder, i: number) => (
          <li className={orderProfile.order} key={i}>
            <Link 
              to={{
                pathname: `/profile/orders/${el.number}`,
                state: { background: location }
              }}
              className={orderProfile.order__link} 
            >
              <OrderItem
                number={el.number}
                name={el.name}
                ingredients={el.ingredients}
                createdAt={el.createdAt}
                status={el.status}
              />
            </Link>
          </li>
        ))
      }
    </ul>
	);
}
