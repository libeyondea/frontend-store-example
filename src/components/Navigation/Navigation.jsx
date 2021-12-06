import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Dropdown from 'react-bootstrap/Dropdown';
import NavItem from 'react-bootstrap/NavItem';
import NavLink from 'react-bootstrap/NavLink';
import isEmpty from '../../helpers/isEmpty';

const totalObj = function (arr, prop) {
	return arr.reduce(function (a, b) {
		return a + b[prop];
	}, 0);
};
const totalPrice = function (arr, qty, price, discount) {
	return arr.reduce(function (a, b) {
		return a + b[qty] * (b.product[price] - b.product[discount]);
	}, 0);
};
const Navigation = ({ login, fetchCart, fetchCategory, logoutThunk }) => {
	const history = useHistory(null);
	const handleLogoutSubmit = (event) => {
		event.preventDefault();
		logoutThunk(history);
	};
	return (
		<Navbar
			collapseOnSelect
			expand="lg"
			bg="light"
			variant="light"
			fixed="top"
			className="shadow-sm"
			style={{ minHeight: '72px' }}
		>
			<Container>
				<Navbar.Brand to="/" as={Link}>
					D4z-Shop
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="responsive-navbar-nav" />
				<Navbar.Collapse id="responsive-navbar-nav">
					<Nav className="ml-auto align-items-lg-center">
						<Nav.Item>
							<Nav.Link to="/" as={Link}>
								Home
							</Nav.Link>
						</Nav.Item>
						<Nav.Item>
							<Nav.Link to="/about" as={Link}>
								About
							</Nav.Link>
						</Nav.Item>
						<Dropdown as={NavItem}>
							<Dropdown.Toggle as={NavLink} id="dropdown-custom-1">
								Categories
							</Dropdown.Toggle>
							<Dropdown.Menu align="right">
								{fetchCategory.isLoading ? (
									<>
										<div className="spinner-grow spinner-grow-sm text-success mr-2" role="status">
											<span className="sr-only">Loading...</span>
										</div>
										<div className="spinner-grow spinner-grow-sm text-success mr-2" role="status">
											<span className="sr-only">Loading...</span>
										</div>
										<div className="spinner-grow spinner-grow-sm text-success mr-2" role="status">
											<span className="sr-only">Loading...</span>
										</div>
									</>
								) : (
									<>
										{isEmpty(fetchCategory.category) ? (
											<>No category</>
										) : (
											<>
												{fetchCategory.category.map((node) => (
													<Dropdown.Item as={Link} to={`/shop/${node.id}/${node.slug}`} key={node.id}>
														{node.title}
													</Dropdown.Item>
												))}
											</>
										)}
									</>
								)}
							</Dropdown.Menu>
						</Dropdown>
						{login.isAuthenticated ? (
							<>
								{fetchCart.isLoading ? (
									<>
										<Dropdown className="cart-dropdown" as={NavItem}>
											<Dropdown.Toggle as={NavLink} id="dropdown-custom-2">
												<i className="fa fa-shopping-cart" aria-hidden="true" /> Cart{' '}
												<span className="badge badge-pill badge-danger">
													<div className="spinner-border spinner-border-sm"></div>
												</span>
											</Dropdown.Toggle>
											<Dropdown.Menu align="right">
												<div className="row total-header-section">
													<div className="col-lg-6 col-sm-6 col-6">
														<i className="fa fa-shopping-cart" aria-hidden="true" />{' '}
														<span className="badge badge-pill badge-danger">
															<div className="spinner-border spinner-border-sm"></div>
														</span>
													</div>
													<div className="col-lg-6 col-sm-6 col-6 total-section text-right">
														<p>
															Total:{' '}
															<span className="total-price">
																<div className="spinner-border spinner-border-sm"></div>
															</span>
														</p>
													</div>
												</div>
												<div className="row cart-detail justify-content-center">
													<div className="spinner-grow text-success mr-5" role="status">
														<span className="sr-only">Loading...</span>
													</div>
													<div className="spinner-grow text-success mr-5" role="status">
														<span className="sr-only">Loading...</span>
													</div>
													<div className="spinner-grow text-success" role="status">
														<span className="sr-only">Loading...</span>
													</div>
												</div>
											</Dropdown.Menu>
										</Dropdown>
									</>
								) : (
									<Dropdown className="cart-dropdown" as={NavItem}>
										<Dropdown.Toggle as={NavLink} id="dropdown-custom-2">
											<i className="fa fa-shopping-cart" aria-hidden="true" /> Cart{' '}
											<span className="badge badge-pill badge-danger">
												{isEmpty(fetchCart.cart.product_cart) ? '0' : totalObj(fetchCart.cart.product_cart, 'quantity')}
											</span>
										</Dropdown.Toggle>
										<Dropdown.Menu align="right">
											<div className="row total-header-section">
												<div className="col-lg-3 col-sm-3 col-3">
													<i className="fa fa-shopping-cart" aria-hidden="true" />{' '}
													<span className="badge badge-pill badge-danger">
														{isEmpty(fetchCart.cart.product_cart)
															? '0'
															: totalObj(fetchCart.cart.product_cart, 'quantity')}
													</span>
												</div>
												<div className="col-lg-9 col-sm-9 col-9 total-section text-right">
													<p>
														Total:{' '}
														<span className="total-price">
															{fetchCart.isLoading ? (
																<div className="spinner-border spinner-border-sm"></div>
															) : isEmpty(fetchCart.cart.product_cart) ? (
																'0'
															) : (
																<>{totalPrice(fetchCart.cart.product_cart, 'quantity', 'price', 'discount')}₫</>
															)}
														</span>
													</p>
												</div>
											</div>
											{isEmpty(fetchCart.cart.product_cart) ? (
												<div className="row cart-detail justify-content-center">No products</div>
											) : (
												<>
													<div className="show-scroll">
														{fetchCart.cart.product_cart.map((node) => (
															<div className="row cart-detail" key={node.id}>
																<div className="col-lg-4 col-sm-4 col-4 cart-detail-img">
																	<img src={node.product.product_image[0].url} alt={node.product.title} />
																</div>
																<div className="col-lg-8 col-sm-8 col-8 cart-detail-product">
																	<Link to={`/products/${node.product.id}/${node.product.slug}`}>
																		{node.product.title}
																	</Link>
																	<div className="meta-cart">
																		{parseFloat(node.product.discount) === 0 ? (
																			<span className="price">{node.product.price}₫</span>
																		) : (
																			<>
																				<span className="price">
																					{node.product.price - parseFloat(node.product.discount)}₫
																				</span>
																				<span className="discount">{node.product.price}₫</span>
																			</>
																		)}
																		<span className="count">Qty: {node.quantity}</span>
																	</div>
																</div>
															</div>
														))}
													</div>
													<div className="row">
														<div className="col-lg-12 col-sm-12 col-12 text-center view-cart">
															<Link to="/cart" className="btn btn-primary rounded-pill py-2 btn-block">
																View Cart
															</Link>
														</div>
														<div className="col-lg-12 col-sm-12 col-12 text-center checkout">
															<Link to="/checkout" className="btn btn-dark rounded-pill py-2 btn-block">
																Checkout
															</Link>
														</div>
													</div>
												</>
											)}
										</Dropdown.Menu>
									</Dropdown>
								)}
							</>
						) : (
							<Dropdown className="cart-dropdown" as={NavItem}>
								<Dropdown.Toggle as={NavLink} id="dropdown-custom-2">
									<i className="fa fa-shopping-cart" aria-hidden="true" /> Cart{' '}
									<span className="badge badge-pill badge-danger">0</span>
								</Dropdown.Toggle>
								<Dropdown.Menu align="right">
									<div className="text-center">Đăng nhập để xem giỏ hàng</div>
								</Dropdown.Menu>
							</Dropdown>
						)}
						{login.isAuthenticated ? (
							<Dropdown as={NavItem}>
								<Dropdown.Toggle as={NavLink} id="dropdown-custom-1">
									<img
										src={login.user.avatar}
										width={40}
										height={40}
										className="rounded-circle mr-1"
										alt={login.user.user_name}
									/>
									{login.user.user_name}
								</Dropdown.Toggle>
								<Dropdown.Menu align="right">
									<Dropdown.Item>Profile</Dropdown.Item>
									<Dropdown.Divider />
									<Dropdown.Item onClick={handleLogoutSubmit}>Logout</Dropdown.Item>
								</Dropdown.Menu>
							</Dropdown>
						) : (
							<>
								<Nav.Item>
									<Nav.Link as={Link} to="/register">
										Register
									</Nav.Link>
								</Nav.Item>
								<Nav.Item>
									<Nav.Link as={Link} to="/login">
										Login
									</Nav.Link>
								</Nav.Item>
							</>
						)}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

Navigation.propTypes = {};

export default Navigation;
