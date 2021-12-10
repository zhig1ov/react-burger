import React from 'react'
import Modal from '../modal/modal'
import PropTypes from 'prop-types'

import orderDetailsStyle from './order-details.module.css'

const OrderDetails = ({ handleClose }) => {
  return (
    <Modal handleClose={handleClose}>
    <div className={`pt-8 pb-30 ${orderDetailsStyle.container}`}>
      <p className={`pt-9 pb-8 text text_type_digits-large`}>034536</p>
      <p className="text text_type_main-medium">идентификатор заказа</p>
      <div className={`mt-15 mb-15 ${orderDetailsStyle.check}`}></div>
      <p className="pb-2 text text_type_main-default">Ваш заказ начали готовить</p>
      <p className="text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной станции</p>
    </div>
  </Modal>
  )
}

OrderDetails.propTypes = {
  handleClose: PropTypes.func.isRequired
}

export default OrderDetails