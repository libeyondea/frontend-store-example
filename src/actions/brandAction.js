import {
	FETCH_BRAND_REQUESTED,
	FETCH_BRAND_SUCCEED,
	FETCH_BRAND_FAILED,
	FETCH_BRAND_RESETED
} from '../constants/brandConstant';

export const fetchBrandRequestedAction = () => ({
	type: FETCH_BRAND_REQUESTED
});
export const fetchBrandSucceedAction = (payload) => ({
	type: FETCH_BRAND_SUCCEED,
	payload
});
export const fetchBrandFailedAction = (payload) => ({
	type: FETCH_BRAND_FAILED,
	payload
});
export const fetchBrandResetedAction = () => ({
	type: FETCH_BRAND_RESETED
});
