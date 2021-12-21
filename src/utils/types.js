import PropTypes from 'prop-types'

const ingredientsShape = PropTypes.shape({
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  calories: PropTypes.number.isRequired,
  proteins: PropTypes.number.isRequired,
  fat: PropTypes.number.isRequired,
  carbohydrates: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  _id: PropTypes.string.isRequired
})

export default ingredientsShape