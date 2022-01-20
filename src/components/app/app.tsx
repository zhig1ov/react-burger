import React, { useEffect } from 'react'
import AppHeader from '../app-header/app-header'
import BurgerIngredients from '../burger-ingredients/burger-ingredients'
import BurgerConstructor from '../burger-constructor/burger-constructor'
import appStyle from './app.module.css'
import apiLink from '../../utils/constants'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { useDispatchHook } from '../../services/hooks/hooks'
import { getIngredients } from '../../services/actions/index'
import { useSelectorHook } from "../../services/hooks/hooks"

const App = () => {
  const dispatch = useDispatchHook()
  const ingredients = useSelectorHook(state => state.burger.ingredients)

  useEffect(() => {
    dispatch(getIngredients())
  }, [dispatch]);
  
  return (
    <div className={appStyle.app}>
      <AppHeader />
      <main className={appStyle.main} >
        {ingredients && 
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients />
            <BurgerConstructor  />
          </DndProvider>
      }
      </main>
    </div>
  );
}

export { App, apiLink }


