import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutThunk } from '../../thunks/authThunk';
import Navigation from '../../components/Navigation/Navigation';
import { fetchCartThunk } from '../../thunks/cartThunk';
import { fetchCategoryThunk } from '../../thunks/categoryThunk';

const Layout = ({ children, logoutThunk, login, fetchCartThunk, fetchCart, fetchCategoryThunk, fetchCategory }) => {
	useEffect(() => {
		fetchCategoryThunk();
		if (login.isAuthenticated) {
			fetchCartThunk();
		}
	}, [fetchCategoryThunk, fetchCartThunk, login]);
	return (
		<>
			<Navigation logoutThunk={logoutThunk} login={login} fetchCart={fetchCart} fetchCategory={fetchCategory} />
			{children}
			<footer className="py-5 mt-5 bg-light">
				<div className="container">
					<div className="row">
						<div className="col-12 col-md">
							<img
								className="mb-2 rounded-circle"
								src="https://avatars1.githubusercontent.com/u/57558120?s=460&u=edcf8c9d01f9f5b76c1c6e30d6c775ec147cc434&v=4"
								width={66}
								height={66}
								alt="logo"
							/>
							<small className="d-block mb-3 text-dark">Copyright © Your Website 2020</small>
						</div>
						<div className="col-6 col-md">
							<h5 className="text-white">Features</h5>
							<ul className="list-unstyled text-small mb-0">
								<li>
									<a className="text-secondary" href="#!">
										Cool stuff
									</a>
								</li>
								<li>
									<a className="text-secondary" href="#!">
										Random feature
									</a>
								</li>
								<li>
									<a className="text-secondary" href="#!">
										Team feature
									</a>
								</li>
								<li>
									<a className="text-secondary" href="#!">
										Stuff for developers
									</a>
								</li>
								<li>
									<a className="text-secondary" href="#!">
										Another one
									</a>
								</li>
								<li>
									<a className="text-secondary" href="#!">
										Last time
									</a>
								</li>
							</ul>
						</div>
						<div className="col-6 col-md">
							<h5 className="text-white">Resources</h5>
							<ul className="list-unstyled text-small mb-0">
								<li>
									<a className="text-secondary" href="#!">
										Resource
									</a>
								</li>
								<li>
									<a className="text-secondary" href="#!">
										Resource name
									</a>
								</li>
								<li>
									<a className="text-secondary" href="#!">
										Another resource
									</a>
								</li>
								<li>
									<a className="text-secondary" href="#!">
										Final resource
									</a>
								</li>
							</ul>
						</div>
						<div className="col-6 col-md">
							<h5 className="text-white">About</h5>
							<ul className="list-unstyled text-small mb-0">
								<li>
									<a className="text-secondary" href="#!">
										Team
									</a>
								</li>
								<li>
									<a className="text-secondary" href="#!">
										Locations
									</a>
								</li>
								<li>
									<a className="text-secondary" href="#!">
										Privacy
									</a>
								</li>
								<li>
									<a className="text-secondary" href="#!">
										Terms
									</a>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</footer>
		</>
	);
};

Layout.propTypes = {
	logoutThunk: PropTypes.func.isRequired,
	login: PropTypes.object.isRequired,
	children: PropTypes.node.isRequired
};

const mapStateToProps = (state) => ({
	login: state.auth.login,
	fetchCart: state.carts.fetchCart,
	fetchCategory: state.categories.fetchCategory
});

const mapDispatchToProps = {
	logoutThunk,
	fetchCartThunk,
	fetchCategoryThunk
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Layout));
