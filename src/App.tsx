import React from 'react';
import AppHeader from './components/app-header/app-header';
import BurgerIngredients from './components/burger-ingredients/burger-ingredients'
import BurgerConstructor from './components/burger-constructor/burger-constructor'
import data from './utils/data.json'

import './App.css';


function App() {

  return (
    <div className="App">
      <AppHeader />
      <main className={"main"} >
        <BurgerIngredients data={data} />
        <BurgerConstructor data={data} />
      </main>
    </div>
  );
}

export default App;
