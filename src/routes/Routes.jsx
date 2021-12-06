import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AuthRouteLogT from '../guards/AuthRouteLogT';
import AuthRouteLogF from '../guards/AuthRouteLogF';

const Home = lazy(() => import('../pages/Home/Home'));
const Register = lazy(() => import('../pages/Auth/Register'));
const Login = lazy(() => import('../pages/Auth/Login'));

const SingleProduct = lazy(() => import('../pages/Product/SingleProduct'));
const FilterProduct = lazy(() => import('../pages/Product/FilterProduct'));

const Cart = lazy(() => import('../pages/Cart/Cart'));

const Checkout = lazy(() => import('../pages/Cart/Checkout'));

//const FetchUser = lazy(() => import('../pages/User/FetchUser'));
//const SingleUser = lazy(() => import('../pages/User/SingleUser'));

//const FetchTag = lazy(() => import('../pages/Tag/FetchTag'));
//const SingleTag = lazy(() => import('../pages/Tag/SingleTag'));

const FourZeroFour = lazy(() => import('../pages/Error/404'));

const About = lazy(() => import('../pages/About/About'));

const Routes = () => {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<Router>
				<Switch>
					<Route exact path="/" component={Home} />

					<AuthRouteLogF exact path="/register" component={Register} />
					<AuthRouteLogF exact path="/login" component={Login} />

					<Route exact path="/products/:id/:slug" component={SingleProduct} />
					<Route exact path="/shop/:id/:slug" component={FilterProduct} />

					<AuthRouteLogT exact path="/Cart" component={Cart} />

					<AuthRouteLogT exact path="/checkout" component={Checkout} />

					{/*<Route exact path="/users" component={FetchUser} />*/}
					{/*<Route exact path="/users/:id/:user_name" component={SingleUser} />*/}

					{/*<Route exact path="/tags" component={FetchTag} />*/}
					{/*<Route exact path="/tags/:id/:slug" component={SingleTag} />*/}

					<Route exact path="/about" component={About} />

					<Route component={FourZeroFour} />
				</Switch>
			</Router>
		</Suspense>
	);
};

export default Routes;
