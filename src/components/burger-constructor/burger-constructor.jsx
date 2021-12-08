import React from 'react'
import { Button, CurrencyIcon, ConstructorElement} from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types'
import construcorStyle from './burger-constructor.module.css'

function BurgerConstructor({data}) {

  const ingredients = data.filter((item) => item.type !== "bun")

  return (
    <section className={`${construcorStyle.container} pt-25`}>
      <ConstructorElement 
        key={"top"}
        type={"top"}
        isLocked={true}
        text={`${data[0].name} (верх)`}
        price={data[0].price}
        thumbnail={data[0].image}
      />
      <ul className={`${construcorStyle.list} custom-scroll pr-1 pl-2 mt-4 mb-4 `}>
        {ingredients.map((item) => (
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
      <ConstructorElement
        key={"bottom"}
        type={"bottom"}
        isLocked={true}
        text={`${data[0].name} (низ)`}
        price={data[0].price}
        thumbnail={data[0].image}
      />

    <div className={`${construcorStyle.flex} ${construcorStyle.flexCheck} pt-10`}>
      <div className={`${construcorStyle.flex} pr-10`}>
        <p className="text text_type_digits-medium text_color_primary pr-2">610</p>
        <CurrencyIcon className="pr-10" />
      </div>
      <Button type="primary" size="medium">
        Оформить заказ
      </Button>
    </div>
    </section>
  )
}

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
        _id: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired
  }).isRequired).isRequired
}
export default BurgerConstructor