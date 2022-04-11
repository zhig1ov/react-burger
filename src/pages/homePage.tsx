import React, { FC } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import BurgerIngredients from '../components/burger-ingredients/burger-ingredients'
import BurgerConstructor from '../components/burger-constructor/burger-constructor'
import { useSelectorHook } from '../services/hooks/hooks'
import Preloader from '../components/preloader/preloader'

export const HomePage: FC = () => {
  const {
    ingredientsRequest
  } = useSelectorHook((store: any) => store.burger)

  return (
    <>
      {ingredientsRequest ? <Preloader /> : 
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor  />
        </DndProvider>
      }
    </>
  )
}