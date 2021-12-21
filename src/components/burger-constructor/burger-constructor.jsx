import React, { useState, useContext, useMemo } from 'react'
import { Button, CurrencyIcon, ConstructorElement} from '@ya.praktikum/react-developer-burger-ui-components'
import construcorStyle from './burger-constructor.module.css'
import OrderDetails from '../order-details/order-details'
import { IngredientsContext } from '../../services/constructorContext'
import Modal from '../modal/modal'

function BurgerConstructor() {
  const { ingredients } = useContext(IngredientsContext)
  const [ orderNum, setOrderNum ] = useState(null)

  const mainIngredients = ingredients.filter((item) => item.type !== "bun")
  const bun = ingredients.find(bun => bun.type === 'bun')

  const totalPrice = useMemo(() => 
  ingredients.reduce((sum, ingredient) => sum + ingredient.price, 0)
  , [ingredients])

  const ingredientsId = []

  ingredients.forEach(el => {
    ingredientsId.push(el._id)
  })

  const makeOrder = async (ingredientsId) => {
    const res = await fetch('https://norma.nomoreparties.space/api/orders', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ingredients: ingredientsId
      })
    })

    if (!res.ok) {
      throw new Error ('Response error')
    } 
    const data = await res.json()
    console.log(data)
    setOrderNum(data.order.number)
  }

  const handleClose = () => {
    setOrderNum(null)
  }

  const handleOpen = () => {
    makeOrder(ingredientsId)
  }

  return (
    <section className={`${construcorStyle.container} pt-25`}>
      {bun && 
      <ConstructorElement 
        key={"top"}
        type={"top"}
        isLocked={true}
        text={`${bun.name} ${'(верх)'}`}
        price={bun.price}
        thumbnail={bun.image}
      />}
      <ul className={`${construcorStyle.list} custom-scroll pr-1 pl-2 mt-4 mb-4 `}>
        {mainIngredients.map((item) => (
          <li key={item._id} className={"ml-4"}>
            <ConstructorElement
              type={"undefined"}
              isLocked={false}
              text={item.name}
              price={item.price}
              thumbnail={item.image}
            />
          </li>
        ))}
      </ul>
      {bun && 
      <ConstructorElement
        key={"bottom"}
        type={"bottom"}
        isLocked={true}
        text={`${bun.name} ${'(низ)'}`}
        price={bun.price}
        thumbnail={bun.image}
      />}

    <div className={`${construcorStyle.flex} ${construcorStyle.flexCheck} pt-10`}>
      <div className={`${construcorStyle.flex} pr-10`}>
        <p className="text text_type_digits-medium text_color_primary pr-2"> {totalPrice} </p>
        <CurrencyIcon className="pr-10" />
      </div>
      <Button type="primary" size="medium" onClick={handleOpen}>
        Оформить заказ
      </Button>
    </div>
    {orderNum && (
      <Modal handleClose={handleClose}>
        <OrderDetails orderNum={orderNum}></OrderDetails>
      </Modal>
    )
    }
    </section>
  )
}

export default BurgerConstructor