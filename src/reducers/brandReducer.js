import {
	FETCH_BRAND_REQUESTED,
	FETCH_BRAND_SUCCEED,
	FETCH_BRAND_FAILED,
	FETCH_BRAND_RESETED
} from '../constants/brandConstant';
import { produce } from 'immer';

const initialState = {
	fetchBrand: {
		brand: [],
		isLoading: true,
		isError: false,
		errorMessage: {}
	}
};

const brandReducer = (state = initialState, action) =>
	produce(state, (draft) => {
		switch (action.type) {
			case FETCH_BRAND_REQUESTED:
				draft.fetchBrand.brand = [];
				draft.fetchBrand.isLoading = true;
				draft.fetchBrand.isError = false;
				draft.fetchBrand.errorMessage = null;
				break;
			case FETCH_BRAND_SUCCEED:
				draft.fetchBrand.brand = action.payload;
				draft.fetchBrand.isLoading = false;
				draft.fetchBrand.isError = false;
				draft.fetchBrand.errorMessage = null;
				break;
			case FETCH_BRAND_FAILED:
				draft.fetchBrand.brand = [];
				draft.fetchBrand.isLoading = false;
				draft.fetchBrand.isError = true;
				draft.fetchBrand.errorMessage = action.payload;
				break;
			case FETCH_BRAND_RESETED:
				draft.fetchBrand.brand = [];
				draft.fetchBrand.isLoading = false;
				draft.fetchBrand.isError = false;
				draft.fetchBrand.errorMessage = null;
				break;
			default:
				break;
		}
	});

export default brandReducer;
