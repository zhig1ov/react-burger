import React from 'react'
import ingredientDetailsStyles from './ingredient-details.module.css'
import { useSelectorHook } from "../../services/hooks/hooks"

const IngredientDeatils = () => {
  const ingredients = useSelectorHook(state => state.burger.currentIngredient)
  
  return (
    <>
      {ingredients && 
        <>
        <h3 className={`${ingredientDetailsStyles.header} pl-10 pt-10 text text_type_main-large text_color_primary`}>Детали ингредиента</h3>
        <img className={ingredientDetailsStyles.image} src={ingredients.image} alt={ingredients.name} />
        <p className="pb-8 pt-4 text text_type_main-medium text_color_primary">{ingredients.name}</p>
        <ul className={`mb-15  ${ingredientDetailsStyles.container}`}>
          <li>
            <p className="pb-2 text text_type_main-default text_color_inactive">Калории,ккал</p>
            <p className="text text_type_digits-default text_color_inactive">{ingredients.calories}</p>
          </li>
          <li>
            <p className="pb-2 text text_type_main-default text_color_inactive">Белки, г</p>
            <p className="text text_type_digits-default text_color_inactive">{ingredients.proteins}</p>
          </li>
          <li>
            <p className="pb-2 text text_type_main-default text_color_inactive">Жиры, г</p>
            <p className="text text_type_digits-default text_color_inactive">{ingredients.fat}</p>
          </li>
          <li>
            <p className="pb-2 text text_type_main-default text_color_inactive">Углеводы, г</p>
            <p className="text text_type_digits-default text_color_inactive">{ingredients.carbohydrates}</p>
          </li>
        </ul>
        </>
      }
    </>
  )
}

export default IngredientDeatils