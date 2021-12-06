import {
	fetchCategoryRequestedAction,
	fetchCategorySucceedAction,
	fetchCategoryFailedAction,
	fetchCategoryResetedAction
} from '../actions/categoryAction';
import axios from 'axios';

export const fetchCategoryThunk = () => async (dispatch) => {
	try {
		dispatch(fetchCategoryRequestedAction());
		const res = await axios.get(`${process.env.REACT_APP_API_URL}/categories`);
		if (res.data.success) {
			dispatch(fetchCategorySucceedAction(res.data.data));
		}
	} catch (err) {
		dispatch(fetchCategoryFailedAction(err.message));
	}
};

export const fetchCategoryResetedThunk = () => (dispatch) => {
	dispatch(fetchCategoryResetedAction());
};
