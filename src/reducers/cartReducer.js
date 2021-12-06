import {
	FETCH_CART_REQUESTED,
	FETCH_CART_SUCCEED,
	FETCH_CART_FAILED,
	FETCH_CART_RESETED,
	ADD_TO_CART_REQUESTED,
	ADD_TO_CART_SUCCEED,
	ADD_TO_CART_FAILED,
	ADD_TO_CART_RESETED,
	DELETE_CART_ITEM_REQUESTED,
	DELETE_CART_ITEM_SUCCEED,
	DELETE_CART_ITEM_FAILED,
	DELETE_CART_ITEM_RESETED,
	CHECKOUT_REQUESTED,
	CHECKOUT_SUCCEED,
	CHECKOUT_FAILED,
	CHECKOUT_RESETED
} from '../constants/cartConstant';
import { produce } from 'immer';

const initialState = {
	fetchCart: {
		cart: {},
		isLoading: true,
		isError: false,
		errorMessage: {}
	},
	addToCart: {
		cart: {},
		isLoading: false,
		isError: false,
		errorMessage: {}
	},
	deleteCartItem: {
		cart: {},
		isLoading: false,
		isError: false,
		errorMessage: {}
	},
	checkout: {
		cart: {},
		isLoading: false,
		isError: false,
		errorMessage: {}
	}
};

const cartReducer = (state = initialState, action) =>
	produce(state, (draft) => {
		switch (action.type) {
			case FETCH_CART_REQUESTED:
				draft.fetchCart.cart = {};
				draft.fetchCart.isLoading = true;
				draft.fetchCart.isError = false;
				draft.fetchCart.errorMessage = {};
				break;
			case FETCH_CART_SUCCEED:
				draft.fetchCart.cart = action.payload;
				draft.fetchCart.isLoading = false;
				draft.fetchCart.isError = false;
				draft.fetchCart.errorMessage = {};
				break;
			case FETCH_CART_FAILED:
				draft.fetchCart.cart = {};
				draft.fetchCart.isLoading = false;
				draft.fetchCart.isError = true;
				draft.fetchCart.errorMessage = action.payload;
				break;
			case FETCH_CART_RESETED:
				draft.fetchCart.cart = {};
				draft.fetchCart.isLoading = true;
				draft.fetchCart.isError = false;
				draft.fetchCart.errorMessage = {};
				break;
			//
			case ADD_TO_CART_REQUESTED:
				draft.addToCart.cart = {};
				draft.addToCart.isLoading = true;
				draft.addToCart.isError = false;
				draft.addToCart.errorMessage = {};
				break;
			case ADD_TO_CART_SUCCEED:
				draft.addToCart.cart = action.payload;
				draft.addToCart.isLoading = false;
				draft.addToCart.isError = false;
				draft.addToCart.errorMessage = {};
				break;
			case ADD_TO_CART_FAILED:
				draft.addToCart.cart = {};
				draft.addToCart.isLoading = false;
				draft.addToCart.isError = true;
				draft.addToCart.errorMessage = action.payload;
				break;
			case ADD_TO_CART_RESETED:
				draft.addToCart.cart = {};
				draft.addToCart.isLoading = true;
				draft.addToCart.isError = false;
				draft.addToCart.errorMessage = {};
				break;
			//
			case DELETE_CART_ITEM_REQUESTED:
				draft.deleteCartItem.cart = {};
				draft.deleteCartItem.isLoading = true;
				draft.deleteCartItem.isError = false;
				draft.deleteCartItem.errorMessage = {};
				break;
			case DELETE_CART_ITEM_SUCCEED:
				draft.deleteCartItem.cart = action.payload;
				draft.deleteCartItem.isLoading = false;
				draft.deleteCartItem.isError = false;
				draft.deleteCartItem.errorMessage = {};
				break;
			case DELETE_CART_ITEM_FAILED:
				draft.deleteCartItem.cart = {};
				draft.deleteCartItem.isLoading = false;
				draft.deleteCartItem.isError = true;
				draft.deleteCartItem.errorMessage = action.payload;
				break;
			case DELETE_CART_ITEM_RESETED:
				draft.deleteCartItem.cart = {};
				draft.deleteCartItem.isLoading = true;
				draft.deleteCartItem.isError = false;
				draft.deleteCartItem.errorMessage = {};
				break;
			//
			case CHECKOUT_REQUESTED:
				draft.checkout.cart = {};
				draft.checkout.isLoading = true;
				draft.checkout.isError = false;
				draft.checkout.errorMessage = {};
				break;
			case CHECKOUT_SUCCEED:
				draft.checkout.cart = action.payload;
				draft.checkout.isLoading = false;
				draft.checkout.isError = false;
				draft.checkout.errorMessage = {};
				break;
			case CHECKOUT_FAILED:
				draft.checkout.cart = {};
				draft.checkout.isLoading = false;
				draft.checkout.isError = true;
				draft.checkout.errorMessage = action.payload;
				break;
			case CHECKOUT_RESETED:
				draft.checkout.cart = {};
				draft.checkout.isLoading = true;
				draft.checkout.isError = false;
				draft.checkout.errorMessage = {};
				break;
			default:
				break;
		}
	});

export default cartReducer;
