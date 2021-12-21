import React, { useState, useContext, useEffect } from 'react'
import { Button, CurrencyIcon, ConstructorElement} from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types'
import construcorStyle from './burger-constructor.module.css'
import OrderDetails from '../order-details/order-details'
import { IngredientsContext, TotalPriceContext } from '../../services/constructorContext'

function BurgerConstructor() {
  const { ingredients } = useContext(IngredientsContext)
  const { totalPrice, setTotalPrice } = useContext(TotalPriceContext)
  const [ modal, setModal ] = useState(false)
  const mainIngredients = ingredients.filter((item) => item.type !== "bun")
  const buns = ingredients.find(bun => bun.type === 'bun')
  console.log()

  useEffect(() => { 
    let total = 0
    ingredients.map(item =>(total += item.price))

    setTotalPrice(total)
  }, [ingredients, setTotalPrice])

  const handleClose = () => {
    setModal(false)
  }

  const handleOpen = () => {
    setModal(true)
  }

  return (
    <section className={`${construcorStyle.container} pt-25`}>
      {buns && 
      <ConstructorElement 
        key={"top"}
        type={"top"}
        isLocked={true}
        text={`${buns.name} ${'(верх)'}`}
        price={buns.price}
        thumbnail={buns.image}
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
      {buns && 
      <ConstructorElement
        key={"bottom"}
        type={"bottom"}
        isLocked={true}
        text={`${buns.name} ${'(низ)'}`}
        price={buns.price}
        thumbnail={buns.image}
      />}

    <div className={`${construcorStyle.flex} ${construcorStyle.flexCheck} pt-10`}>
      <div className={`${construcorStyle.flex} pr-10`}>
        <p className="text text_type_digits-medium text_color_primary pr-2">{totalPrice}</p>
        <CurrencyIcon className="pr-10" />
      </div>
      <Button type="primary" size="medium" onClick={handleOpen}>
        Оформить заказ
      </Button>
    </div>
    {modal && 
    <OrderDetails handleClose={handleClose}></OrderDetails>
    }
    </section>
  )
}

BurgerConstructor.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.shape({
        _id: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired
  }).isRequired).isRequired
}
export default BurgerConstructor