import React, { useMemo } from 'react'
import IngredientsItemStyle from './ingredients-item.module.css'
import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import ingredientsShape from '../../utils/types'
import { useDrag } from 'react-dnd'
import { useSelector } from 'react-redux'


const IngredientsItem = ({ ingredient, handleClick }) => {
  const constructorElements = useSelector(state => state.burger.constructorElements)
  const bun = useSelector(state => state.burger.bun)


 
  const count = useMemo(() => {
    if(ingredient.type !== 'bun') {
      return constructorElements.reduce((acc, item) => item._id === ingredient._id ? acc + 1 : acc, 0)
    } else if (bun && bun._id === ingredient._id) {
      return 1
    }
  }, [constructorElements, bun, ingredient._id, ingredient.type])

  const [, dragRef] = useDrag({
    type: 'ingredient',
    item: { ingredient }
  })

  return (
    <article onClick={() => handleClick(ingredient)} className={IngredientsItemStyle.container} ref={dragRef}>
      {count > 0 && 
        <Counter count={1} size="default" />}
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
  ingredient: ingredientsShape.isRequired
}

export default IngredientsItem