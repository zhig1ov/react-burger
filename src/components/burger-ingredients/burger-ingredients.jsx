import React, { useState, useRef, useMemo } from 'react' 
import IngredientsItem from '../ingredients-item/ingredients-item'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import IngredientsStyle from './burger-ingredients.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { ADD_CURRENT_INGREDIENT, REMOVE_CURRENT_INGREDIENT } from '../../services/actions'
import Modal from '../modal/modal'
import IngredientDeatils from '../ingredient-details/ingredient-details'


function BurgerIngredients() {
  const ingredients = useSelector(state => state.burger.ingredients)
  const dispatch = useDispatch()

  const [current, setCurrent] = useState('buns')

  const bunTab = useRef();
  const sauceTab = useRef();
  const mainTab = useRef();

  // useEffect(() => {
  //   if (current === "buns") {
  //     bunTab.current.scrollIntoView({behavior: 'smooth'})
  //   } else if (current === "sauces") {
  //     sauceTab.current.scrollIntoView({behavior: 'smooth'})
  //   } else if (current === "main") {
  //     mainTab.current.scrollIntoView({behavior: 'smooth'})
  //   }
  // }, [current])
  

  const buns = useMemo(() =>
   ingredients.filter((ingredient) => ingredient.type === 'bun'), [ingredients])

  const mains = useMemo(() =>
   ingredients.filter((ingredient) => ingredient.type === 'main'), [ingredients])
   
  const sauces = useMemo(() =>
   ingredients.filter((ingredient) => ingredient.type === 'sauce'), [ingredients])

  const handleOpen = (item) => {
    dispatch({
      type: ADD_CURRENT_INGREDIENT,
      item: item
    })
  }

  const handleClose = () => {
    dispatch({
      type: REMOVE_CURRENT_INGREDIENT
    })
  }

  const currentModalIngredient = useSelector(state => state.burger.currentIngredient)

  const handleScroll = (e) => {
    const topPrice = e.target.getBoundingClientRect().top
    
    const bunPosition = { top: bunTab.current.getBoundingClientRect().top, bottom: bunTab.current.getBoundingClientRect().bottom }
    const mainPosition= { top: mainTab.current.getBoundingClientRect().top, bottom: mainTab.current.getBoundingClientRect().bottom }
    const saucePosition = { top: sauceTab.current.getBoundingClientRect().top, bottom: sauceTab.current.getBoundingClientRect().bottom }

    if (bunPosition.top <= topPrice && bunPosition.bottom > topPrice) {
      setCurrent('buns')
    } else if (saucePosition.top <= topPrice && saucePosition.bottom > topPrice) {
      setCurrent('sauces')
    } else if (mainPosition.top <= topPrice && mainPosition.bottom > topPrice) {
      setCurrent('main')
    }
  }

  return(
    <>
      <section className={`${IngredientsStyle.container} pt-10 pr-10`}>
        <h1 className="text text_type_main-large pb-5">Соберите бургер</h1>
        <div className={IngredientsStyle.flex}>
          <Tab value="buns" active={current === 'buns'} >
            Булки
          </Tab>
          <Tab value="sauces" active={current === 'sauces'} >
            Соусы
          </Tab>
          <Tab value="main" active={current === 'main'} >
            Начинки
          </Tab>
        </div>
        <div  className={`${IngredientsStyle.type} custom-scroll mt-10 pr-1`} onScroll={handleScroll}>
          <div ref={bunTab}>
            <h3 className="text text_type_main-medium pb-6">Булки</h3>
            <div className={IngredientsStyle.grid}>
              {buns.map((item) => (
                <IngredientsItem key={item._id} ingredient={item} handleClick={handleOpen} />
              ))}
            </div>
          </div>
          <div ref={sauceTab}>
            <h3 className="text text_type_main-medium pb-6">Соусы</h3>
            <div className={IngredientsStyle.grid}>
              {sauces.map((item) => (
                <IngredientsItem key={item._id} ingredient={item} handleClick={handleOpen} />
              ))}
            </div>
          </div>
          <div ref={mainTab}>
            <h3 className="text text_type_main-medium pb-6">Начинки</h3>
            <div className={IngredientsStyle.grid}>
              {mains.map((item) => (
                <IngredientsItem key={item._id} ingredient={item} handleClick={handleOpen} />
              ))}
            </div>
          </div>
        </div>
      </section>
      {currentModalIngredient && 
        <Modal handleClose={handleClose}>
          <IngredientDeatils></IngredientDeatils>
        </Modal>}
    </>
  )
}

export default BurgerIngredients