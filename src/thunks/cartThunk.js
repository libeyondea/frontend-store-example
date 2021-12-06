import {
	fetchCartRequestedAction,
	fetchCartSucceedAction,
	fetchCartFailedAction,
	fetchCartResetedAction,
	addToCartRequestedAction,
	addToCartSucceedAction,
	addToCartFailedAction,
	addToCartResetedAction,
	deleteCartItemRequestedAction,
	deleteCartItemSucceedAction,
	deleteCartItemFailedAction,
	deleteCartItemResetedAction,
	checkoutRequestedAction,
	checkoutSucceedAction,
	checkoutFailedAction,
	checkoutResetedAction
} from '../actions/cartAction';
import axios from 'axios';
import Swal from 'sweetalert2';

export const fetchCartThunk = () => async (dispatch) => {
	try {
		//dispatch(fetchCartRequestedAction());
		const res = await axios.get(`${process.env.REACT_APP_API_URL}/carts`);
		if (res.data.success) {
			dispatch(fetchCartSucceedAction(res.data.data));
		}
	} catch (err) {
		dispatch(fetchCartFailedAction(err.message));
	}
};

export const fetchCartResetedThunk = () => (dispatch) => {
	dispatch(fetchCartResetedAction());
};

export const addToCartThunk = (product) => async (dispatch) => {
	try {
		dispatch(addToCartRequestedAction());
		const res = await axios.post(`${process.env.REACT_APP_API_URL}/add-to-carts`, product);
		if (res.data.success) {
			dispatch(addToCartSucceedAction(res.data.data));
		}
	} catch (err) {
		dispatch(addToCartFailedAction(err.message));
	}
};

export const addToCartResetedThunk = () => (dispatch) => {
	dispatch(addToCartResetedAction());
};

export const deleteCartItemThunk = (product) => async (dispatch) => {
	try {
		dispatch(deleteCartItemRequestedAction());
		const res = await axios.post(`${process.env.REACT_APP_API_URL}/delete-cart-item`, product);
		if (res.data.success) {
			dispatch(deleteCartItemSucceedAction(res.data.data));
		}
	} catch (err) {
		dispatch(deleteCartItemFailedAction(err.message));
	}
};

export const deleteCartItemResetedThunk = () => (dispatch) => {
	dispatch(deleteCartItemResetedAction());
};

export const checkoutThunk = (checkout, history) => async (dispatch) => {
	try {
		dispatch(checkoutRequestedAction());
		const res = await axios.post(`${process.env.REACT_APP_API_URL}/checkout`, checkout);
		if (res.data.success) {
			dispatch(checkoutSucceedAction(res.data.data));
			history.push('/');
			Swal.fire({
				icon: 'success',
				text: 'Checkout success'
			});
		}
	} catch (err) {
		dispatch(checkoutFailedAction(err.message));
	}
};

export const checkoutResetedThunk = () => (dispatch) => {
	dispatch(checkoutResetedAction());
};
