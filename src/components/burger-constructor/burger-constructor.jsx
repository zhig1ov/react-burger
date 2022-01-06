import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react'
import { Button, CurrencyIcon, ConstructorElement} from '@ya.praktikum/react-developer-burger-ui-components'
import construcorStyle from './burger-constructor.module.css'
import OrderDetails from '../order-details/order-details'

import Modal from '../modal/modal'
import { useDrop, useDrag } from 'react-dnd'
import { useDispatch, useSelector } from 'react-redux'
import { ADD_BUN, ADD_INGREDIENT, CLEAR_CONSTRUCTOR_INGREDIENTS, CLEAR_ORDER_MODAL, REMOVE_INGREDIENT, SORT_CONSTRUCTOR_INGREDIENTS, makeOrder } from '../../services/actions'
import update from 'immutability-helper'
import { v4 as uuidv4 } from 'uuid'



const BurgerConstructorElement = ({ingredient, index, moveIngredient}) => {
  // console.log(makeOrder())
  const dispatch = useDispatch()
  const ref = useRef(null)

  const [{ handlerId }, drop] = useDrop({
    accept: "constructorIngredient",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveIngredient(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "constructorIngredient",
    item: () => {
      return { id: ingredient._id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0.2 : 1;

  drag(drop(ref));

  function handleRemoveIngredient(index) {
    dispatch({
      type: REMOVE_INGREDIENT,
      index: index
    })
  }

  return (
    <li className={'ml-4'} style={{ opacity }} ref={ref} data-handler-id={handlerId}>
      <ConstructorElement
        type={null}
        isLocked={false}
        handleClose={() => handleRemoveIngredient(index)}
        text={ingredient.name}
        thumbnail={ingredient.image}
        price={ingredient.price} />
    </li>
  )
}

const BurgerConstructor = () => {
  const dispatch = useDispatch()
  const constructorElements = useSelector(state => state.burger.constructorElements)

  const orderNumber = useSelector(state => state.burger.orderNumber)

  const bun = useSelector(state => state.burger.bun)

  const [ totalPrice, setTotalPrice ] = useState(0)

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
      dispatch(makeOrder(elementsId))
      dispatch({
        type: CLEAR_CONSTRUCTOR_INGREDIENTS
      })
    }

    console.log(elementsId)

    const [, dropTarget] = useDrop({
      accept: 'ingredient',
      drop(ingredient) {
        dropHandler(ingredient)
      }
    })

    function dropHandler(ingredient) {
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
        text={`${bun.name} ${'(верх)'}`}
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
        text={`${bun.name} ${'(низ)'}`}
        price={bun.price}
        thumbnail={bun.image}
      />}
{constructorElements && bun && 
    <div className={`${construcorStyle.flex} ${construcorStyle.flexCheck} pt-10`}>
    <div className={`${construcorStyle.flex} pr-10`}>
      <p className="text text_type_digits-medium text_color_primary pr-2"> {totalPrice} </p>
      <CurrencyIcon className="pr-10" />
    </div>
    <Button type="primary" size="medium" onClick={handleOpen}>
      Оформить заказ
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