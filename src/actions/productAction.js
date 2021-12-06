import {
	FETCH_NEW_PRODUCT_REQUESTED,
	FETCH_NEW_PRODUCT_SUCCEED,
	FETCH_NEW_PRODUCT_FAILED,
	FETCH_NEW_PRODUCT_RESETED,
	SINGLE_PRODUCT_REQUESTED,
	SINGLE_PRODUCT_SUCCEED,
	SINGLE_PRODUCT_FAILED,
	SINGLE_PRODUCT_RESETED,
	RELATED_PRODUCT_REQUESTED,
	RELATED_PRODUCT_SUCCEED,
	RELATED_PRODUCT_FAILED,
	RELATED_PRODUCT_RESETED,
	FILTER_PRODUCT_REQUESTED,
	FILTER_PRODUCT_SUCCEED,
	FILTER_PRODUCT_BY_VALUE_SUCCEED,
	FILTER_PRODUCT_FAILED,
	FILTER_PRODUCT_RESETED
} from '../constants/productConstant';

export const fetchNewProductRequestedAction = () => ({
	type: FETCH_NEW_PRODUCT_REQUESTED
});
export const fetchNewProductSucceedAction = (payload) => ({
	type: FETCH_NEW_PRODUCT_SUCCEED,
	payload
});
export const fetchNewProductFailedAction = (payload) => ({
	type: FETCH_NEW_PRODUCT_FAILED,
	payload
});
export const fetchNewProductResetedAction = () => ({
	type: FETCH_NEW_PRODUCT_RESETED
});

export const singleProductRequestedAction = () => ({
	type: SINGLE_PRODUCT_REQUESTED
});
export const singleProductSucceedAction = (payload) => ({
	type: SINGLE_PRODUCT_SUCCEED,
	payload
});
export const singleProductFailedAction = (payload) => ({
	type: SINGLE_PRODUCT_FAILED,
	payload
});
export const singleProductResetedAction = () => ({
	type: SINGLE_PRODUCT_RESETED
});

export const relatedProductRequestedAction = () => ({
	type: RELATED_PRODUCT_REQUESTED
});
export const relatedProductSucceedAction = (payload) => ({
	type: RELATED_PRODUCT_SUCCEED,
	payload
});
export const relatedProductFailedAction = (payload) => ({
	type: RELATED_PRODUCT_FAILED,
	payload
});
export const relatedProductResetedAction = () => ({
	type: RELATED_PRODUCT_RESETED
});

export const filterProductRequestedAction = () => ({
	type: FILTER_PRODUCT_REQUESTED
});
export const filterProductSucceedAction = (product, category_id, current_page) => ({
	type: FILTER_PRODUCT_SUCCEED,
	payload: {
		product: product,
		category_id: category_id,
		current_page: current_page
	}
});
export const filterProductByValueSucceedAction = (brand_id) => ({
	type: FILTER_PRODUCT_BY_VALUE_SUCCEED,
	payload: {
		brand_id: brand_id
	}
});
export const filterProductFailedAction = (payload) => ({
	type: FILTER_PRODUCT_FAILED,
	payload
});
export const filterProductResetedAction = () => ({
	type: FILTER_PRODUCT_RESETED
});
