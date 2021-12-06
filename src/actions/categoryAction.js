import {
	FETCH_CATEGORY_REQUESTED,
	FETCH_CATEGORY_SUCCEED,
	FETCH_CATEGORY_FAILED,
	FETCH_CATEGORY_RESETED,
	SINGLE_CATEGORY_REQUESTED,
	SINGLE_CATEGORY_SUCCEED,
	SINGLE_CATEGORY_FAILED,
	SINGLE_CATEGORY_RESETED
} from '../constants/categoryConstant';

export const fetchCategoryRequestedAction = () => ({
	type: FETCH_CATEGORY_REQUESTED
});
export const fetchCategorySucceedAction = (payload) => ({
	type: FETCH_CATEGORY_SUCCEED,
	payload
});
export const fetchCategoryFailedAction = (payload) => ({
	type: FETCH_CATEGORY_FAILED,
	payload
});
export const fetchCategoryResetedAction = () => ({
	type: FETCH_CATEGORY_RESETED
});

export const singleCategoryRequestedAction = () => ({
	type: SINGLE_CATEGORY_REQUESTED
});
export const singleCategorySucceedAction = (payload) => ({
	type: SINGLE_CATEGORY_SUCCEED,
	payload
});
export const singleCategoryFailedAction = (payload) => ({
	type: SINGLE_CATEGORY_FAILED,
	payload
});
export const singleCategoryResetedAction = () => ({
	type: SINGLE_CATEGORY_RESETED
});
