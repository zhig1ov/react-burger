import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { Button, CurrencyIcon, ConstructorElement} from '@ya.praktikum/react-developer-burger-ui-components'
import construcorStyle from './burger-constructor.module.css'
import OrderDetails from '../order-details/order-details'
import Modal from '../modal/modal'
import { useDrop } from 'react-dnd'
import { useDispatchHook } from '../../services/hooks/hooks'
import { ADD_BUN, ADD_INGREDIENT, CLEAR_CONSTRUCTOR_INGREDIENTS, CLEAR_ORDER_MODAL, SORT_CONSTRUCTOR_INGREDIENTS } from '../../services/action-constants/burger'
import update from 'immutability-helper'
import { v4 as uuidv4 } from 'uuid';
import BurgerConstructorElement from '../burgerConstructorElement/burger-constructor-element'
import { makeOrder } from '../../services/thunks/burger'
import { useSelectorHook } from "../../services/hooks/hooks"
import { TIngredients } from '../../utils/types'
import { useHistory, useLocation } from 'react-router-dom'

type TAccessToken = Array<string> | null

const BurgerConstructor = () => {
  const [ totalPrice, setTotalPrice ] = useState<number>(0)
  const dispatch = useDispatchHook()
  const constructorElements = useSelectorHook(state => state.burger.constructorElements)
  const orderNumber = useSelectorHook(state => state.burger.orderNumber)
  const bun = useSelectorHook(state => state.burger.bun)
  const { user:{name} } = useSelectorHook((store) => store.user)
  const history = useHistory()
  const location = useLocation()

  useEffect(() => {
    if(bun) {
      const bunPrice = bun.price * 2
      setTotalPrice(constructorElements.reduce((sum, ingredient) => sum + ingredient.price, bunPrice))
    }
  }, [constructorElements, bun])

    const handleClose = () => {
      dispatch({
        type: CLEAR_ORDER_MODAL
      })
    }

    const elementsId = useMemo(() => {
      const itemsArr = constructorElements.map(el => el._id)
      if(bun) {
        itemsArr.push(bun?._id)
      return itemsArr
      }
    }, [constructorElements, bun])


    const handleOpen = () => {

      const accessToken: TAccessToken = document.cookie.match(/(accessToken=)(.+)/);
      
      if(!accessToken){
          history.replace({
              pathname: '/login',
              state: { background: location}
          })
          history.push('/login')
      } else {
        dispatch(makeOrder(elementsId))
        dispatch({
          type: CLEAR_CONSTRUCTOR_INGREDIENTS
        })
      }
    }

    const [, dropTarget] = useDrop({
      accept: 'ingredient',
      drop(ingredient: {ingredient: TIngredients}) {
        dropHandler(ingredient)
      }
    })

    function dropHandler(ingredient: {ingredient: TIngredients}): void {
      if (ingredient.ingredient.type !== 'bun') {
        dispatch ({
          type: ADD_INGREDIENT,
          item: {
            ...ingredient.ingredient,
          uuid: uuidv4()
          }
        })
      } else if (ingredient.ingredient.type === 'bun') {
        dispatch({
          type: ADD_BUN,
          item: ingredient.ingredient
        })
      }
    }

    const moveIngredient = useCallback(
      (dragIndex, hoverIndex) => {
        const ingredient = constructorElements[dragIndex];
        dispatch({
          type: SORT_CONSTRUCTOR_INGREDIENTS,
          sortedIngredients: update(constructorElements, {
            $splice: [
              [dragIndex, 1],
              [hoverIndex, 0, ingredient],
            ],
          }),
        });
      },
      [constructorElements, dispatch]
    );
      
  return (
    <section className={`${construcorStyle.container} pt-25`} ref={dropTarget}>
      {bun && 
      <ConstructorElement 
        type={"top"}
        isLocked={true}
        handleClose={undefined}
        text={`${bun.name} ${'(????????)'}`}
        price={bun.price}
        thumbnail={bun.image}
      />}
      <ul className={`${construcorStyle.list} custom-scroll pr-1 pl-2 mt-4 mb-4 `}>
        {constructorElements.map((item, index) => (
          <BurgerConstructorElement key={item.uuid} ingredient={item} index={index} moveIngredient={moveIngredient}></BurgerConstructorElement>
        ))}
      </ul>
      {bun && 
      <ConstructorElement
        type={"bottom"}
        isLocked={true}
        handleClose={undefined}
        text={`${bun.name} ${'(??????)'}`}
        price={bun.price}
        thumbnail={bun.image}
      />}
      {constructorElements && bun && 
        <div className={`${construcorStyle.flex} ${construcorStyle.flexCheck} pt-10`}>
          <div className={`${construcorStyle.flex} pr-10`}>
            <p className="text text_type_digits-medium text_color_primary pr-2"> {totalPrice} </p>
            <CurrencyIcon type={'primary'} />
          </div>
          <Button type="primary" size="medium" onClick={handleOpen}>
            ???????????????? ??????????
          </Button>
        </div>
      }
      {orderNumber && 
        <Modal handleClose={handleClose}>
          <OrderDetails></OrderDetails>
        </Modal>
      }
    </section>
  )
}

export default BurgerConstructor