import React, { useEffect, useState } from 'react';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients'
import BurgerConstructor from '../burger-constructor/burger-constructor'

import { IngredientsContext, TotalPriceContext } from '../../services/constructorContext';
import appStyle from './app.module.css';


const apiIngredients = "https://norma.nomoreparties.space/api/ingredients";



function App() {
  const [ingredients, setIngredients] = useState([])
  const [ totalPrice, setTotalPrice ] = useState(0)

  useEffect(() => {
    const getIngredients = async () => {
      try {
        const res = await fetch(apiIngredients);

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
        <BurgerIngredients ingredients={ingredients} />
        <IngredientsContext.Provider value={{ ingredients, setIngredients }}>
          <TotalPriceContext.Provider value={{ totalPrice, setTotalPrice }}>
          <BurgerConstructor  />
         </TotalPriceContext.Provider>
        </IngredientsContext.Provider>
      </main>
    </div>
  );
}


export default App;
