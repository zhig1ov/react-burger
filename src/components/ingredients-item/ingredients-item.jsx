import React, { useState } from 'react'
import IngredientsItemStyle from './ingredients-item.module.css'
import IngredientDeatils from '../ingredient-details/ingredient-details'
import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import Modal from '../modal/modal'
import PropTypes from 'prop-types'


const IngredientsItem = ({ ingredient }) => {
  const [ modal, setModal ] = useState(false)

  const handleClose = () => {
    setModal(false)
  }

  const handleOpen = () => {
    setModal(true)
  }

  return (
    <>
    <article onClick={handleOpen} className={IngredientsItemStyle.container}>
      <Counter count={1} size="default" />
      <img src={ingredient.image} alt={ingredient.name} />
      <div className={`${IngredientsItemStyle.flex} pb-1 pt-1`} >
        <span style={{textAlign: "center"}} className="text text_type_digits-default">{ingredient.price}</span>
        <CurrencyIcon type={"primary"} />
      </div>
      <p className="text text_type_main-default text_color_primary">{ingredient.name}</p>
    </article>
      {modal &&
        <Modal handleClose={handleClose}>
          <IngredientDeatils ingredients={ingredient} handleClose={handleClose}></IngredientDeatils>
        </Modal>
      }
    </>
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