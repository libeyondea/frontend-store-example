import { combineReducers } from 'redux';
import authReducer from './authReducer';
import productReducer from './productReducer';
import categoryReducer from './categoryReducer';
import brandReducer from './brandReducer';
import cartReducer from './cartReducer';

const rootReducer = combineReducers({
	auth: authReducer,
	products: productReducer,
	categories: categoryReducer,
	brands: brandReducer,
	carts: cartReducer
});

export default rootReducer;
