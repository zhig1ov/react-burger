import React, { useState, useRef, useMemo, RefObject, useCallback } from 'react' 
import IngredientsItem from '../ingredients-item/ingredients-item'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import IngredientsStyle from './burger-ingredients.module.css'
import { useDispatchHook } from '../../services/hooks/hooks'
import { ADD_CURRENT_INGREDIENT, REMOVE_CURRENT_INGREDIENT } from '../../services/action-constants/burger'
import Modal from '../modal/modal'
import IngredientDeatils from '../ingredient-details/ingredient-details'
import { useSelectorHook } from "../../services/hooks/hooks"
import { TIngredients } from '../../utils/types'
import { useHistory } from 'react-router-dom'


const BurgerIngredients = () => {
  const ingredients = useSelectorHook(state => state.burger.ingredients)
  const dispatch = useDispatchHook()
  const [current, setCurrent] = useState('buns')
  const history = useHistory()

  const bunTab = useRef<HTMLDivElement | null>(null)
  const sauceTab = useRef<HTMLDivElement | null>(null)
  const mainTab = useRef<HTMLDivElement | null>(null)

  const buns = useMemo(() =>
   ingredients.filter((ingredient) => ingredient.type === 'bun'), [ingredients])

  const mains = useMemo(() =>
   ingredients.filter((ingredient) => ingredient.type === 'main'), [ingredients])
   
  const sauces = useMemo(() =>
   ingredients.filter((ingredient) => ingredient.type === 'sauce'), [ingredients])

  const handleOpen = (item: TIngredients) => {
    dispatch({
      type: ADD_CURRENT_INGREDIENT,
      item: item
    })
  }

  const handleClose = () => {
    dispatch({
      type: REMOVE_CURRENT_INGREDIENT
    })
    history.goBack()
  }

  const currentModalIngredient = useSelectorHook(state => state.burger.currentIngredient)

  const handleScroll = useCallback((e) => {
    const topPrice = e.target.getBoundingClientRect().top

    const getCoord = (
      ref: RefObject<HTMLHeadingElement> | null
      ): number => {
        if (ref !== null) return ref?.current?.getBoundingClientRect().top!
        else return 0
      }
      
      const getDist = (topCoord: number) => {
        return Math.abs(topCoord - topPrice)
      }

      const sauceCoord = getCoord(sauceTab)
      const mainCoord = getCoord(mainTab)
      const bunCoord = getCoord(bunTab)

      const closestBlockCoord = Math.min(
        getDist(sauceCoord)!,
        getDist(mainCoord)!,
        getDist(bunCoord)!
      )

      if (closestBlockCoord === getDist(sauceCoord)) {
        setCurrent("sauces")
      } else if (closestBlockCoord === getDist(mainCoord)) {
        setCurrent("main")
      } else setCurrent("buns")
    }, [])

    
  const bunScroll = (value: string) => {
    setCurrent(value)
    bunTab.current?.scrollIntoView({ behavior: "smooth" })
  }

  const mainScroll = (value: string) => {
    setCurrent(value)
    mainTab.current?.scrollIntoView({ behavior: "smooth" })
  }

  const sauceScroll = (value: string) => {
    setCurrent(value)
    sauceTab.current?.scrollIntoView({ behavior: "smooth" })
  }

  return(
    <>
      <section className={`${IngredientsStyle.container} pt-10 pr-10`}>
        <h1 className="text text_type_main-large pb-5">Соберите бургер</h1>
        <div className={IngredientsStyle.flex}>
          <Tab value="buns" active={current === 'buns'} onClick={bunScroll}>
            Булки
          </Tab>
          <Tab value="sauces" active={current === 'sauces'} onClick={sauceScroll}>
            Соусы
          </Tab>
          <Tab value="main" active={current === 'main'} onClick={mainScroll}>
            Начинки
          </Tab>
        </div>
        <div  className={`${IngredientsStyle.type} custom-scroll mt-10 pr-1`} onScroll={handleScroll}>
          <div >
            <h3 className="text text_type_main-medium pb-6" ref={bunTab}>Булки</h3>
            <div className={IngredientsStyle.grid}>
              {buns.map((item) => (
                <IngredientsItem key={item._id} ingredient={item} handleClick={handleOpen} />
              ))}
            </div>
          </div>
          <div >
            <h3 className="text text_type_main-medium pb-6" ref={sauceTab}>Соусы</h3>
            <div className={IngredientsStyle.grid}>
              {sauces.map((item) => (
                <IngredientsItem key={item._id} ingredient={item} handleClick={handleOpen} />
              ))}
            </div>
          </div>
          <div>
            <h3 className="text text_type_main-medium pb-6" ref={mainTab}>Начинки</h3>
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
        </Modal>
      }
    </>
  )
}

export default BurgerIngredients