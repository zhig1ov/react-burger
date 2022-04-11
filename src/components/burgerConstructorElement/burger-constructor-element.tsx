import React, { useRef, FC } from 'react'
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components'
import { useDrop, useDrag } from 'react-dnd'
import { useDispatchHook } from '../../services/hooks/hooks'
import { REMOVE_INGREDIENT } from '../../services/action-constants/burger'
import { TIngredients } from '../../utils/types'

interface IBurgerConstructorElement {
  ingredient: TIngredients
  index: number
  moveIngredient: Function
}

type TItem = {
  id: string, 
  index: number
}

const BurgerConstructorElement: FC<IBurgerConstructorElement> = ({ ingredient, index, moveIngredient }) => {
  const dispatch = useDispatchHook()
  const ref = useRef<HTMLLIElement>(null)

  const [{ handlerId }, drop] = useDrop({
    accept: "constructorIngredient",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: TItem, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index
      const hoverIndex = index

      if (dragIndex === hoverIndex) {
        return;
      }
      
      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      const clientOffset = monitor.getClientOffset()

      let hoverClientY = 0
      if (clientOffset !== null) {
        hoverClientY = clientOffset.y - hoverBoundingRect.top
      }

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveIngredient(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "constructorIngredient",
    item: () => {
      return { id: ingredient._id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0.2 : 1;

  drag(drop(ref));

  function handleRemoveIngredient(index: number) {
    dispatch({
      type: REMOVE_INGREDIENT,
      index: index
    })
  }

  return (
    <li className={'ml-4'} style={{ opacity }} ref={ref} data-handler-id={handlerId}>
      <ConstructorElement
        type={undefined}
        isLocked={false}
        handleClose={() => handleRemoveIngredient(index)}
        text={ingredient.name}
        thumbnail={ingredient.image}
        price={ingredient.price} />
    </li>
  )
}

export default BurgerConstructorElement