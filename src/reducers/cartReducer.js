import { CollectionsBookmarkOutlined } from "@material-ui/icons";
import {
  ADD_PRODUCT_TO_CART,
  DELETE_PRODUCT_FROM_CART,
  ADD_PRODUCT_QUANTITY,
  SUBSTRACT_PRODUCT_QUANTITY,
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
    case ADD_PRODUCT_TO_CART:
      return {
        ...state,
        products: [...state.products, action.payload],
        total: state.total + action.payload.price,
      };
    case DELETE_PRODUCT_FROM_CART:
      let currentProduct = state.products.filter(
        (product) => product.productId === action.payload
      );
      return {
        ...state,
        products: state.products.filter(
          (product) => product.productId !== action.payload
        ),
        total:
          state.total - currentProduct[0].price * currentProduct[0].quantity,
      };
    case ADD_PRODUCT_QUANTITY:
      // let discount;
      let totalDiscount = 0;
      let currentProductAdd = state.products.filter(
        (product) => product.productId === action.payload
      );
      let currentProductFlag = currentProductAdd[0].flag;
      console.log("CurrentProductAdd", currentProductAdd[0].saleQuantityIncrement);
      switch (currentProductAdd[0].saleQuantityIncrement) {
        case 2:
          if ((currentProductAdd[0].quantity + 1) % 2 === 0) {
            currentProductFlag = +1;
            totalDiscount = currentProductFlag * currentProductAdd[0].discount;
          }
          return {
            ...state,
            products: state.products.map((item) =>
              item.productId === action.payload
                ? {
                    ...item,
                    quantity: item.quantity + 1,
                    flag: currentProductFlag,
                  }
                : item
            ),
            discount: state.discount + totalDiscount,
            total: RoundFixed2(
              state.total -
                totalDiscount +
                state.products.find((item) => item.productId === action.payload)
                  .price
            ),
          };
          break;
        case 3: 
        if ((currentProductAdd[0].quantity + 1) % 3 > 1) {
          currentProductFlag = +1;
          totalDiscount = currentProductFlag * currentProductAdd[0].discount;
        }
        return {
          ...state,
          products: state.products.map((item) =>
            item.productId === action.payload
              ? {
                  ...item,
                  quantity: item.quantity + 1,
                }
              : item
          ),
          discount: state.discount + totalDiscount,
          total:
            state.total -
            totalDiscount +
            state.products.find((item) => item.productId === action.payload)
              .price,
        };
          break;
        default:
          return {
            ...state,
            products: state.products.map((item) =>
              item.productId === action.payload
                ? {
                    ...item,
                    quantity: item.quantity + 1,
                  }
                : item
            ),
            discount: state.discount,
            total:
              state.total +
              state.products.find((item) => item.productId === action.payload)
                .price,
          };
          break;
      }
      // if (currentProductAdd[0].saleQuantityIncrement > 0) {
      //   if ((currentProductAdd[0].quantity + 1) % 2 === 0) {
      //     currentProductFlag = +1;
      //     totalDiscount = currentProductFlag * currentProductAdd[0].discount;
      //   } else if (
      //     currentProductAdd[0].quantity + 1 > 1 && currentProductAdd[0].saleQuantityIncrement
      //   ) {
      //     currentProductFlag = +1;
      //     totalDiscount = currentProductFlag * currentProductAdd[0].discount;
      //   }
 

    case SUBSTRACT_PRODUCT_QUANTITY:
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
        total:
          state.total -
          state.products.find((item) => item.productId === action.payload)
            .price,
      };
    default:
      return state;
  }
};
