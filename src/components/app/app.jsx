import React, { useEffect, useState } from 'react';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients'
import BurgerConstructor from '../burger-constructor/burger-constructor'
import { IngredientsContext } from '../../services/constructorContext';
import appStyle from './app.module.css';

const apiLink = "https://norma.nomoreparties.space/api";

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
        <BurgerIngredients />
        <BurgerConstructor  />
      </IngredientsContext.Provider>
      </main>
    </div>
  );
}

export { App, apiLink}
