import {
	fetchNewProductRequestedAction,
	fetchNewProductSucceedAction,
	fetchNewProductFailedAction,
	fetchNewProductResetedAction,
	singleProductRequestedAction,
	singleProductSucceedAction,
	singleProductFailedAction,
	singleProductResetedAction,
	relatedProductRequestedAction,
	relatedProductSucceedAction,
	relatedProductFailedAction,
	relatedProductResetedAction,
	filterProductRequestedAction,
	filterProductSucceedAction,
	filterProductByValueSucceedAction,
	filterProductFailedAction,
	filterProductResetedAction
} from '../actions/productAction';
import axios from 'axios';

export const fetchNewProductThunk = () => async (dispatch) => {
	try {
		dispatch(fetchNewProductRequestedAction());
		const res = await axios.get(`${process.env.REACT_APP_API_URL}/products?per_page=8`);
		if (res.data.success) {
			dispatch(fetchNewProductSucceedAction(res.data.data));
		}
	} catch (err) {
		dispatch(fetchNewProductFailedAction(err.message));
	}
};
export const fetchNewProductResetedThunk = () => (dispatch) => {
	dispatch(fetchNewProductResetedAction());
};

export const singleProductThunk = (id) => async (dispatch) => {
	try {
		dispatch(singleProductRequestedAction());
		const res = await axios.get(`${process.env.REACT_APP_API_URL}/products/${id}`);
		if (res.data.success) {
			dispatch(singleProductSucceedAction(res.data.data));
		}
	} catch (err) {
		dispatch(singleProductFailedAction(err.message));
	}
};

export const singleProductResetedThunk = () => (dispatch) => {
	dispatch(singleProductResetedAction());
};

export const relatedProductThunk = (id) => async (dispatch) => {
	try {
		dispatch(relatedProductRequestedAction());
		const res = await axios.get(`${process.env.REACT_APP_API_URL}/related-products?per_page=4&id=${id}`);
		if (res.data.success) {
			dispatch(relatedProductSucceedAction(res.data.data));
		}
	} catch (err) {
		dispatch(relatedProductFailedAction(err.message));
	}
};

export const relatedProductResetedThunk = () => (dispatch) => {
	dispatch(relatedProductResetedAction());
};

export const filterProductThunk = (category_id) => async (dispatch) => {
	try {
		dispatch(filterProductRequestedAction());
		const res = await axios.get(`${process.env.REACT_APP_API_URL}/products`);
		if (res.data.success) {
			dispatch(filterProductSucceedAction(res.data.data, category_id));
		}
	} catch (err) {
		dispatch(filterProductFailedAction(err.message));
	}
};

export const filterProductByValueThunk = (brand_id) => async (dispatch) => {
	await dispatch(filterProductByValueSucceedAction(brand_id));
};

export const filterProductResetedThunk = () => (dispatch) => {
	dispatch(filterProductResetedAction());
};
