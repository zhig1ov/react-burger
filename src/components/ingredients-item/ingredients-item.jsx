import React from 'react'
import IngredientsItemStyle from './ingredients-item.module.css'
import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import PropTypes from 'prop-types'


const IngredientsItem = ({ ingredient }) => {
  return (
    <article className={IngredientsItemStyle.container}>
      <Counter count={1} size="default" />
      <img src={ingredient.image} alt={ingredient.name} />
      <div className={`${IngredientsItemStyle.flex} pb-1 pt-1`} >
        <span style={{textAlign: "center"}} className="text text_type_digits-default">{ingredient.price}</span>
        <CurrencyIcon type={"primary"} />
      </div>
      <p className="text text_type_main-default text_color_primary">{ingredient.name}</p>
    </article>
  )
}

IngredientsItem.propTypes = {
  ingredient: PropTypes.shape({
        image: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired
  }).isRequired
}

export default IngredientsItem