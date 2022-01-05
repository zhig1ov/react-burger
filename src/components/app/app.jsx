import React, { useEffect, useState } from 'react';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients'
import BurgerConstructor from '../burger-constructor/burger-constructor'
import { IngredientsContext } from '../../services/constructorContext';
import appStyle from './app.module.css';
import apiLink from '../../utils/constants';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { useSelector } from 'react-redux'


function App() {
  const [ ingredients, setIngredients ] = useState([])

  useEffect(() => {
    
    const getIngredients = async () => {
      try {
        const res = await fetch(`${apiLink}/ingredients`);
        if (!res.ok) {
          throw new Error('Response error')
        }
        const ingredientsData = await res.json();
        setIngredients(ingredientsData.data);
      }
      catch (err) {
        console.log(err.message);
      }
    };
    getIngredients();
  }, []);
  
  return (
    <div className={appStyle.app}>
      <AppHeader />
      <main className={appStyle.main} >
      <IngredientsContext.Provider value={{ ingredients, setIngredients }}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor  />
        </DndProvider>
      </IngredientsContext.Provider>
      </main>
    </div>
  );
}

export { App, apiLink}


