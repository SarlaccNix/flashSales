import {
  ADD_PRODUCT_TO_CART,
  DELETE_PRODUCT_FROM_CART,
  ADD_PRODUCT_QUANTITY,
  SUBSTRACT_PRODUCT_QUANTITY
} from "../actions/types";

const initialState = {
  products: [],
  sub_total: 0,
  discount: 0,
  total: 0,
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PRODUCT_TO_CART:
      return {
        ...state,
        products: [...state.products, action.payload],
		total: state.total + action.payload.price
      };
    case DELETE_PRODUCT_FROM_CART:
      return {
        ...state,
        products: state.products.filter(
          (product) => product.productId !== action.payload
        ),
		total: state.total - action.payload.price * action.payload.quantity
      };
    case ADD_PRODUCT_QUANTITY:
      return {
        ...state,
        products: state.products.map(item => item.productId === action.payload
			? {
			  ...item,
			  quantity: item.quantity + 1,
			}
			: item
		  ),
		total: state.total + state.products.find(item => item.productId === action.payload).price
      };
    case SUBSTRACT_PRODUCT_QUANTITY:
      return {
        ...state,
        products: state.products.map(item => item.productId === action.payload
			? {
			  ...item,
			  quantity: item.quantity - 1,
			}
			: item
		  ),
		total: state.total - state.products.find(item => item.productId === action.payload).price
      };
    default:
      return state;
  }
};
