import {
	FETCH_CATEGORY_REQUESTED,
	FETCH_CATEGORY_SUCCEED,
	FETCH_CATEGORY_FAILED,
	FETCH_CATEGORY_RESETED
} from '../constants/categoryConstant';
import { produce } from 'immer';

const initialState = {
	fetchCategory: {
		category: [],
		isLoading: true,
		isError: false,
		errorMessage: {}
	}
};

const categoryReducer = (state = initialState, action) =>
	produce(state, (draft) => {
		switch (action.type) {
			case FETCH_CATEGORY_REQUESTED:
				draft.fetchCategory.category = [];
				draft.fetchCategory.isLoading = true;
				draft.fetchCategory.isError = false;
				draft.fetchCategory.errorMessage = null;
				break;
			case FETCH_CATEGORY_SUCCEED:
				draft.fetchCategory.category = action.payload;
				draft.fetchCategory.isLoading = false;
				draft.fetchCategory.isError = false;
				draft.fetchCategory.errorMessage = null;
				break;
			case FETCH_CATEGORY_FAILED:
				draft.fetchCategory.category = [];
				draft.fetchCategory.isLoading = false;
				draft.fetchCategory.isError = true;
				draft.fetchCategory.errorMessage = action.payload;
				break;
			case FETCH_CATEGORY_RESETED:
				draft.fetchCategory.category = [];
				draft.fetchCategory.isLoading = false;
				draft.fetchCategory.isError = false;
				draft.fetchCategory.errorMessage = null;
				break;
			default:
				break;
		}
	});

export default categoryReducer;
