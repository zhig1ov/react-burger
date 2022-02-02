import React, { useMemo, FC } from 'react'
import IngredientsItemStyle from './ingredients-item.module.css'
import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import { useSelectorHook } from "../../services/hooks/hooks"
import { useDrag } from 'react-dnd'
import { TIngredients } from '../../utils/types'
import { Link, useLocation } from 'react-router-dom'

interface IIngredientsItem {
  handleClick: Function,
  ingredient: TIngredients
}

const IngredientsItem: FC<IIngredientsItem> = ({ ingredient, handleClick }) => {
  const constructorElements = useSelectorHook(state => state.burger.constructorElements)
  const bun = useSelectorHook(state => state.burger.bun)
  const location = useLocation()

  const count = useMemo(() => {
    if (ingredient.type !== 'bun') {
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
    <Link to={{pathname: `/ingredients/${ingredient._id}`, state: { background: location }}} className={'text_color_primary'} style={{ textDecoration: 'none'}}>
    <article onClick={() => handleClick(ingredient)} className={IngredientsItemStyle.container} ref={dragRef}>
      {count! > 0 && 
        <Counter count={count!} size="default" />}
      <img src={ingredient.image} alt={ingredient.name} />
      <div className={`${IngredientsItemStyle.flex} pb-1 pt-1`} >
        <span style={{textAlign: "center"}} className="text text_type_digits-default">{ingredient.price}</span>
        <CurrencyIcon type={"primary"} />
      </div>
      <p className="text text_type_main-default text_color_primary">{ingredient.name}</p>
    </article>
    </Link>
  )
}

export default IngredientsItem