import { CollectionsBookmarkOutlined } from "@material-ui/icons";
import {
  ADD_PRODUCT_TO_CART,
  DELETE_PRODUCT_FROM_CART,
  SUBSTRACT_PRODUCT_QUANTITY,
  RESET_CART,
} from "../actions/types";

const initialState = {
  products: [],
  sub_total: 0,
  discount: 0,
  total: 0,
};

const RoundFixed2 = (number) => {
  return Math.round((number + Number.EPSILON) * 100) / 100;
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case DELETE_PRODUCT_FROM_CART:
      let productToDelete = state.products.includes(
        (product) => product.productId === action.payload.productId
      );
      let discountGroups = Math.floor(
        productToDelete.quantity / productToDelete.saleQuantityIncrement
      );
      let remainingProductsAmount =
        productToDelete.quantity % productToDelete.saleQuantityIncrement > 0
          ? (productToDelete.quantity % productToDelete.saleQuantityIncrement) *
            productToDelete.price
          : null;
      let discountToRemove = discountGroups * productToDelete.discount;
      console.log("disc to rem", discountToRemove);
      console.log(
        "remaining to remove",
        remainingProductsAmount * productToDelete.price
      );
      return {
        ...state,
        products: state.products.filter(
          (product) => product.productId !== action.payload
        ),
        discount: state.discount - discountToRemove,
        total: state.total - discountToRemove - remainingProductsAmount,
      };
    case ADD_PRODUCT_TO_CART:
      let totalDiscount = state.discount;
      let currentProductToAdd = action.payload;
      let addPrice = currentProductToAdd.price;
      let currentQty = 0;
      let currentTotal;
      if (
        state.products.some(
          (product) => product.productId === action.payload.productId
        )
      ) {
        currentQty = state.products.find(
          (product) => product.productId === action.payload.productId
        ).quantity;
      }
      const totalQty = ++currentQty;
      if (totalQty % currentProductToAdd.saleQuantityIncrement === 0) {
        console.log(
          "What????",
          totalQty % currentProductToAdd.saleQuantityIncrement,
          currentProductToAdd.saleQuantityIncrement
        );
        totalDiscount = state.discount + currentProductToAdd.discount;
        currentTotal = RoundFixed2(
          state.total + addPrice - currentProductToAdd.discount
        );
      } else {
        addPrice = currentProductToAdd.price;
        currentTotal = RoundFixed2(state.total + addPrice);
      }
      return {
        ...state,
        products: state.products.some(
          (item) => item.productId === currentProductToAdd.productId
        )
          ? state.products.map((item) =>
              item.productId === currentProductToAdd.productId
                ? { ...item, quantity: totalQty }
                : item
            )
          : [...state.products, currentProductToAdd],
        discount: RoundFixed2(totalDiscount),
        total: currentTotal,
      };

    case SUBSTRACT_PRODUCT_QUANTITY:
      const selectedProduct = state.products.find(
        (item) => item.productId === action.payload
      );
      let priceSubstract = 0;
      selectedProduct.flag === 1
        ? (priceSubstract = selectedProduct.salePrice)
        : (priceSubstract = selectedProduct.price);

      return {
        ...state,
        products: state.products.map((item) =>
          item.productId === action.payload
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        ),
        total: state.total - priceSubstract,
      };
    case RESET_CART:
      return { ...initialState };
    default:
      return state;
  }
};
