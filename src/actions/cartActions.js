import { ADD_PRODUCT_TO_CART, DELETE_PRODUCT_FROM_CART, CALCULATE_FINAL_PRICE, ADD_PRODUCT_QUANTITY, SUBSTRACT_PRODUCT_QUANTITY } from './types'

export const addProductToCart = product => async dispatch => {
	try {
		dispatch({
			type: ADD_PRODUCT_TO_CART,
			payload: product
		})
	} catch (err) {
		console.error(err)
	}
}

export const deleteProductFromCart = productId => async dispatch => {
	try {
		await dispatch({
			type: DELETE_PRODUCT_FROM_CART,
			payload: productId
		})
	} catch (err) {
		console.error(err)
	}
}

export const AddProductQuantity = (productId) => async dispatch => {
	try {
		await dispatch({
			type: ADD_PRODUCT_QUANTITY,
			payload: productId
		})
	} catch (err) {
		console.error(err)
	}
}

export const SubstractProductQuantity = (productId) => async dispatch => {
	try {
		await dispatch({
			type: SUBSTRACT_PRODUCT_QUANTITY,
			payload: productId
		})
	} catch (err) {
		console.error(err)
	}
}

export const getFinalPrice = () => async dispatch => {
	try {
		await dispatch({
			type: CALCULATE_FINAL_PRICE,
			// payload: finalPrice
		})
	} catch (err) {
		console.error(err)
	}
}


