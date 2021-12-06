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
	FILTER_MORE_PRODUCT_SUCCEED,
	FILTER_MORE_PRODUCT_REQUESTED,
	FILTER_PRODUCT_FAILED,
	FILTER_PRODUCT_RESETED
} from '../constants/productConstant';
import { concat } from 'lodash';
import _ from 'lodash';
import isEmpty from '../helpers/isEmpty';

function sortAsc(arr, field) {
	return arr.sort(function (a, b) {
		if (a[field] > b[field]) return 1;
		if (b[field] > a[field]) return -1;
		return 0;
	});
}

function sortDesc(arr, field) {
	return arr.sort(function (a, b) {
		if (a[field] > b[field]) return -1;
		if (b[field] > a[field]) return 1;
		return 0;
	});
}

function addFilterIfNotExists(filter, appliedFilters) {
	let index = appliedFilters.indexOf(filter);
	if (index === -1) appliedFilters.push(filter);
	return appliedFilters;
}

function removeFilter(filter, appliedFilters) {
	let index = appliedFilters.indexOf(filter);
	appliedFilters.splice(index, 1);
	return appliedFilters;
}
const initialState = {
	fetchNewProduct: {
		product: [],
		isLoading: true,
		isError: false,
		errorMessage: {}
	},
	singleProduct: {
		product: {},
		isLoading: true,
		isError: false,
		errorMessage: {}
	},
	relatedProduct: {
		product: [],
		isLoading: true,
		isError: false,
		errorMessage: {}
	},
	filterProduct: {
		product: [],
		newProduct: [],
		brandCheck: [],
		pagination: {
			current_page: 1
		},
		isLoadingMore: false,
		isLoading: true,
		isError: false,
		errorMessage: {}
	}
};
const postReducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_NEW_PRODUCT_REQUESTED:
			return {
				...state,
				fetchNewProduct: {
					...state.fetchNewProduct,
					isLoading: true
				}
			};
		case FETCH_NEW_PRODUCT_SUCCEED:
			return {
				...state,
				fetchNewProduct: {
					...state.fetchNewProduct,
					product: action.payload,
					isLoading: false
				}
			};
		case FETCH_NEW_PRODUCT_FAILED:
			return {
				...state,
				fetchNewProduct: {
					...state.fetchNewProduct,
					isError: true,
					errorMessage: action.payload
				}
			};
		case FETCH_NEW_PRODUCT_RESETED:
			return {
				...state,
				fetchNewProduct: {
					...state.fetchNewProduct,
					product: [],
					isLoading: true,
					isError: false,
					errorMessage: {}
				}
			};
		//
		case SINGLE_PRODUCT_REQUESTED:
			return {
				...state,
				singleProduct: {
					...state.singleProduct,
					isLoading: true
				}
			};
		case SINGLE_PRODUCT_SUCCEED:
			return {
				...state,
				singleProduct: {
					...state.singleProduct,
					product: action.payload,
					isLoading: false
				}
			};
		case SINGLE_PRODUCT_FAILED:
			return {
				...state,
				singleProduct: {
					...state.singleProduct,
					isError: true,
					errorMessage: action.payload
				}
			};
		case SINGLE_PRODUCT_RESETED:
			return {
				...state,
				singleProduct: {
					...state.singleProduct,
					product: {},
					isLoading: true,
					isError: false,
					errorMessage: {}
				}
			};
		//
		case RELATED_PRODUCT_REQUESTED:
			return {
				...state,
				relatedProduct: {
					...state.relatedProduct,
					isLoading: true
				}
			};
		case RELATED_PRODUCT_SUCCEED:
			return {
				...state,
				relatedProduct: {
					...state.relatedProduct,
					product: action.payload,
					isLoading: false
				}
			};
		case RELATED_PRODUCT_FAILED:
			return {
				...state,
				relatedProduct: {
					...state.relatedProduct,
					isError: true,
					errorMessage: action.payload
				}
			};
		case RELATED_PRODUCT_RESETED:
			return {
				...state,
				relatedProduct: {
					...state.relatedProduct,
					product: [],
					isLoading: true,
					isError: false,
					errorMessage: {}
				}
			};
		//
		case FILTER_PRODUCT_REQUESTED:
			return {
				...state,
				filterProduct: {
					...state.filterProduct,
					isLoading: true
				}
			};
		case FILTER_PRODUCT_SUCCEED:
			let category_id = action.payload.category_id;
			let product = _.filter(action.payload.product, function (item) {
				return item.category.id === category_id;
			});
			return {
				...state,
				filterProduct: {
					...state.filterProduct,
					product: product,
					newProduct: product,
					pagination: {
						...state.filterProduct.pagination,
						current_page: action.payload.current_page
					},
					isLoading: false
				}
			};
		case FILTER_PRODUCT_BY_VALUE_SUCCEED:
			const newState = { ...state };
			let brand_id = action.payload.brand_id;
			let newArray = [...state.filterProduct.brandCheck, brand_id];
			let newProduct;

			if (state.filterProduct.brandCheck.includes(brand_id)) {
				newArray = newArray.filter((item) => item !== brand_id);
			}
			if (isEmpty(newArray)) {
				newProduct = state.filterProduct.product;
			} else {
				newProduct = _.filter(state.filterProduct.product, function (item) {
					return newArray.includes(item.brand.id.toLowerCase());
				});
			}
			return {
				...state,
				filterProduct: {
					...state.filterProduct,
					brandCheck: newArray,
					newProduct: newProduct
				}
			};
		case FILTER_MORE_PRODUCT_REQUESTED:
			return {
				...state,
				filterProduct: {
					...state.filterProduct,
					isLoadingMore: true
				}
			};
		case FILTER_MORE_PRODUCT_SUCCEED:
			return {
				...state,
				filterProduct: {
					...state.filterProduct,
					product: concat(state.filterProduct.product, action.payload.product),
					pagination: {
						...state.filterProduct.pagination,
						current_page: action.payload.current_page
					},
					isLoadingMore: false
				}
			};
		case FILTER_PRODUCT_FAILED:
			return {
				...state,
				filterProduct: {
					...state.filterProduct,
					isError: true,
					errorMessage: action.payload
				}
			};
		case FILTER_PRODUCT_RESETED:
			return {
				...state,
				filterProduct: {
					...state.filterProduct,
					product: [],
					newProduct: [],
					brandCheck: [],
					pagination: {
						...state.filterProduct.pagination,
						current_page: 1
					},
					isLoadingMore: false,
					isLoading: true,
					isError: false,
					errorMessage: {}
				}
			};
		default:
			return state;
	}
};

export default postReducer;
