import React, { FC } from 'react';
import orderItem from './style.module.css';
import { useSelectorHook } from '../../services/hooks/hooks'
import { createCardDate, getPrice, getBurgerIngredients, getStatus } from '../../utils/utils';
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import { NUNBER_OF_ELEMENTS_TO_BE_DRAWN } from '../../utils/constants';
import { TProps } from './types';
import { TIngredients } from '../../utils/types';

const OrderItem: FC<TProps> = ({ number, name, status, ingredients, createdAt }) => {
    const st = status ? getStatus(status) : null;
    const allIngredients  = useSelectorHook((store) => store.burger.ingredients);
    const orderDate = createCardDate(createdAt);
    const burgerIngredients = getBurgerIngredients(ingredients, allIngredients);
    const burgerItem = burgerIngredients.slice(0, NUNBER_OF_ELEMENTS_TO_BE_DRAWN);
    const count = burgerIngredients.length;
    let zIndex = NUNBER_OF_ELEMENTS_TO_BE_DRAWN;
    const numberIngredients = count - NUNBER_OF_ELEMENTS_TO_BE_DRAWN;
    const totalPrice = getPrice(burgerIngredients);
    return (
        <div className={`${orderItem.orders__item} p-6`}>
            <div className={orderItem.orders__info}>
                <span className="text text_type_digits-default">#{number}</span>
                <span className="text text_type_main-default text_color_inactive">
                    {orderDate}
                </span>
            </div>
            <div>
                <h2 className={`text text_type_main-medium mb-2`}>{name}</h2>
                {status ? <span className={`text text_type_main-default status_color_${st?.textColor}`}>{st?.text}</span> : null}
            </div>
            <div className={orderItem.orders__info}>
                <ul className={orderItem.list}>
                    {burgerItem.map((el: TIngredients, i: number) => {
                        zIndex -= 1
                        return (
                            <li className={orderItem.list__item} key={i} style={{ zIndex: zIndex }}>
                                <div className={orderItem.icon}>
                                    <img src={el.image_mobile} alt='ингредиент бургера' />
                                </div>
                            </li>
                        )
                    })}
                    {count > 6 ? (<div className={orderItem.overlay}>
                        <span>{`+${numberIngredients}`}</span>
                    </div>) : null}
                </ul>
                <span className={`${orderItem.element__price} text`}>
                    { totalPrice }
                    <CurrencyIcon type={"primary"} />
                </span>
            </div>
        </div>
    );
}

export default OrderItem;
