import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

import orderDetailsStyle from './order-details.module.css'

const OrderDetails = () => {
  const orderNum = useSelector(store => store.burger.orderNumber)

  return (
    <div className={`pt-8 pb-30 ${orderDetailsStyle.container}`}>
      <p className={`pt-9 pb-8 text text_type_digits-large`}>{orderNum}</p>
      <p className="text text_type_main-medium">идентификатор заказа</p>
      <div className={`mt-15 mb-15 ${orderDetailsStyle.check}`}></div>
      <p className="pb-2 text text_type_main-default">Ваш заказ начали готовить</p>
      <p className="text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной станции</p>
    </div>
  )
}

OrderDetails.propTypes = {
  orderNum: PropTypes.number.isRequired
}

export default OrderDetails