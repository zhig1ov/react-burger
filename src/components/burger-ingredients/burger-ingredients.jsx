import React, { useState, useRef, useEffect, useContext, useMemo } from 'react' 
import IngredientsItem from '../ingredients-item/ingredients-item'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import IngredientsStyle from './burger-ingredients.module.css'
import { IngredientsContext } from '../../services/constructorContext'

function BurgerIngredients() {
  const { ingredients } = useContext(IngredientsContext)
  const [current, setCurrent] = useState('buns')

  const bunTab = useRef();
  const sauceTab = useRef();
  const mainTab = useRef();

  useEffect(() => {
    if (current === "buns") {
      bunTab.current.scrollIntoView({behavior: 'smooth'})
    } else if (current === "sauces") {
      sauceTab.current.scrollIntoView({behavior: 'smooth'})
    } else if (current === "main") {
      mainTab.current.scrollIntoView({behavior: 'smooth'})
    }
  }, [current])

  const buns = useMemo(() => ingredients.filter((ingredient) => ingredient.type === 'bun'), [ingredients])

  const mains = ingredients.filter((ingredient) => ingredient.type === 'main')
  const sauces = ingredients.filter((ingredient) => ingredient.type === 'sauce')

  return(
    <section className={`${IngredientsStyle.container} pt-10 pr-10`}>
      <h1 className="text text_type_main-large pb-5">Соберите бургер</h1>
      <div className={IngredientsStyle.flex}>
        <Tab value="buns" active={current === 'buns'} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="sauces" active={current === 'sauces'} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="main" active={current === 'main'} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>
      <div  className={`${IngredientsStyle.type} custom-scroll mt-10 pr-1`}>
        <div ref={bunTab}>
          <h3 className="text text_type_main-medium pb-6">Булки</h3>
          <div className={IngredientsStyle.grid}>
            {buns.map((item) => (
              <IngredientsItem key={item._id} ingredient={item} />
            ))}
          </div>
        </div>
        <div ref={sauceTab}>
          <h3 className="text text_type_main-medium pb-6">Соусы</h3>
          <div className={IngredientsStyle.grid}>
            {sauces.map((item) => (
              <IngredientsItem key={item._id} ingredient={item} />
            ))}
          </div>
        </div>
        <div ref={mainTab}>
          <h3 className="text text_type_main-medium pb-6">Начинки</h3>
          <div className={IngredientsStyle.grid}>
            {mains.map((item) => (
              <IngredientsItem key={item._id} ingredient={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default BurgerIngredients