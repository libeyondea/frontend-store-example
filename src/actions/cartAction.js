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

export const fetchCartRequestedAction = () => ({
	type: FETCH_CART_REQUESTED
});
export const fetchCartSucceedAction = (payload) => ({
	type: FETCH_CART_SUCCEED,
	payload
});
export const fetchCartFailedAction = (payload) => ({
	type: FETCH_CART_FAILED,
	payload
});
export const fetchCartResetedAction = () => ({
	type: FETCH_CART_RESETED
});

export const addToCartRequestedAction = () => ({
	type: ADD_TO_CART_REQUESTED
});
export const addToCartSucceedAction = (payload) => ({
	type: ADD_TO_CART_SUCCEED,
	payload
});
export const addToCartFailedAction = (payload) => ({
	type: ADD_TO_CART_FAILED,
	payload
});
export const addToCartResetedAction = () => ({
	type: ADD_TO_CART_RESETED
});

export const deleteCartItemRequestedAction = () => ({
	type: DELETE_CART_ITEM_REQUESTED
});
export const deleteCartItemSucceedAction = (payload) => ({
	type: DELETE_CART_ITEM_SUCCEED,
	payload
});
export const deleteCartItemFailedAction = (payload) => ({
	type: DELETE_CART_ITEM_FAILED,
	payload
});
export const deleteCartItemResetedAction = () => ({
	type: DELETE_CART_ITEM_RESETED
});

export const checkoutRequestedAction = () => ({
	type: CHECKOUT_REQUESTED
});
export const checkoutSucceedAction = (payload) => ({
	type: CHECKOUT_SUCCEED,
	payload
});
export const checkoutFailedAction = (payload) => ({
	type: CHECKOUT_FAILED,
	payload
});
export const checkoutResetedAction = () => ({
	type: CHECKOUT_RESETED
});
