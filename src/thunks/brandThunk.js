import {
	fetchBrandRequestedAction,
	fetchBrandSucceedAction,
	fetchBrandFailedAction,
	fetchBrandResetedAction
} from '../actions/brandAction';
import axios from 'axios';

export const fetchBrandThunk = () => async (dispatch) => {
	try {
		dispatch(fetchBrandRequestedAction());
		const res = await axios.get(`${process.env.REACT_APP_API_URL}/brands`);
		if (res.data.success) {
			dispatch(fetchBrandSucceedAction(res.data.data));
		}
	} catch (err) {
		dispatch(fetchBrandFailedAction(err.message));
	}
};

export const fetchBrandResetedThunk = () => (dispatch) => {
	dispatch(fetchBrandResetedAction());
};
