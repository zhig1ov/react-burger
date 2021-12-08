import React from 'react';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients'
import BurgerConstructor from '../burger-constructor/burger-constructor'
import data from '../../utils/data.json'

import appStyle from './app.module.css';


function App() {

  return (
    <div className={appStyle.app}>
      <AppHeader />
      <main className={appStyle.main} >
        <BurgerIngredients data={data} />
        <BurgerConstructor data={data} />
      </main>
    </div>
  );
}

export default App;
