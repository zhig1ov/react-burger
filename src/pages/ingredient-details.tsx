import React, { FC } from 'react'
import { useSelectorHook } from '../services/hooks/hooks';
import ingredientDetailsStyles from './ingredient-details.module.css'
import { useParams } from 'react-router-dom'

export const IngredientDetailsPage: FC = () => {
  const { id }: any = useParams()
  const data = useSelectorHook(state => state.burger.ingredients)
  const ingredients = data.filter((ingredient) => ingredient._id === id)[0]

  return (
    <>
      {ingredients && 
        <div className={ingredientDetailsStyles.container}>
        <h3 className={`${ingredientDetailsStyles.header} pl-10 pt-10 text text_type_main-large text_color_primary`}>Детали ингредиента</h3>
        <img className={ingredientDetailsStyles.image} src={ingredients.image} alt={ingredients.name} />
        <p className="pb-8 pt-4 text text_type_main-medium text_color_primary">{ingredients.name}</p>
        <ul className={`mb-15  ${ingredientDetailsStyles.listContainer}`}>
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
        </div>
      }
    </>
  )
}