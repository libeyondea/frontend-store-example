import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import LayoutContainer from '../../containers/Layout/LayoutContainer';
import isEmpty from '../../helpers/isEmpty';
import {
	fetchCartThunk,
	addToCartThunk,
	deleteCartItemThunk,
	deleteCartItemResetedThunk
} from '../../thunks/cartThunk';
import Swal from 'sweetalert2';

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

const subTotalPrice = function (arr, qty, price) {
	return arr.reduce(function (a, b) {
		return a + b[qty] * b.product[price];
	}, 0);
};

const discountPrice = function (arr, qty, discount) {
	return arr.reduce(function (a, b) {
		return a + b[qty] * b.product[discount];
	}, 0);
};

const Cart = ({
	login,
	fetchCart,
	fetchCartThunk,
	deleteCartItemThunk,
	deleteCartItemResetedThunk,
	addToCartThunk,
	addToCart
}) => {
	const history = useHistory();
	const handleDeleteCartItem = async (product_id) => {
		if (login.isAuthenticated) {
			const product = {
				product_id: product_id
			};
			await Swal.fire({
				title: 'Do you want to delete item?',
				icon: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
				confirmButtonText: 'Yes',
				cancelButtonText: 'No'
			}).then(async (result) => {
				if (result.isConfirmed) {
					await deleteCartItemThunk(product);
					await fetchCartThunk();
				}
			});
		} else {
			history.push('/login');
		}
	};
	const handleAddToCart = async (product_id, quantity, prevQuantity) => {
		if (login.isAuthenticated) {
			const product = {
				product_id: product_id,
				quantity: quantity
			};
			if (quantity === -1 && prevQuantity <= 1) {
				await Swal.fire({
					title: 'Do you want to delete item?',
					icon: 'warning',
					showCancelButton: true,
					confirmButtonColor: '#3085d6',
					cancelButtonColor: '#d33',
					confirmButtonText: 'Yes',
					cancelButtonText: 'No'
				}).then(async (result) => {
					if (result.isConfirmed) {
						await addToCartThunk(product);
						await fetchCartThunk();
					}
				});
			} else {
				await addToCartThunk(product);
				await fetchCartThunk();
			}
		} else {
			history.push('/login');
		}
	};
	return (
		<LayoutContainer>
			<div className="container">
				<h2 className="mt-4 mb-3">Cart</h2>
				{fetchCart.isLoading ? (
					<>
						<div className="spinner-grow text-success mr-5" role="status">
							<span className="sr-only">Loading...</span>
						</div>
						<div className="spinner-grow text-success mr-5" role="status">
							<span className="sr-only">Loading...</span>
						</div>
						<div className="spinner-grow text-success mr-5" role="status">
							<span className="sr-only">Loading...</span>
						</div>
					</>
				) : (
					<>
						{isEmpty(fetchCart.cart.product_cart) ? (
							<div>Cart empty</div>
						) : (
							<>
								<ol className="breadcrumb mb-5">
									<li className="breadcrumb-item">
										<a href="/">Home</a>
									</li>
									<li className="breadcrumb-item active">Cart</li>
								</ol>
								<div className="row">
									<div className="col-lg-12 bg-white mb-5">
										<div className="table-responsive rounded shadow">
											<table className="table cart-table">
												<thead>
													<tr>
														<th scope="col" className="border-0 bg-light">
															<div className="p-2 px-3 text-uppercase">Product</div>
														</th>
														<th scope="col" className="border-0 bg-light">
															<div className="py-2 text-uppercase">Price</div>
														</th>
														<th scope="col" className="border-0 bg-light">
															<div className="py-2 text-uppercase">Quantity</div>
														</th>
														<th scope="col" className="border-0 bg-light">
															<div className="py-2 text-uppercase">Remove</div>
														</th>
													</tr>
												</thead>
												<tbody>
													{fetchCart.cart.product_cart.map((node) => (
														<tr key={node.product.id}>
															<th scope="row" className="border-0">
																<div className="p-2">
																	<img
																		src={node.product.product_image[0].url}
																		alt={node.product.title}
																		width={70}
																		className="img-fluid rounded shadow-sm mr-3"
																	/>
																	<div className="d-inline-block align-middle">
																		<h5 className="mb-0">
																			<Link
																				to={`/products/${node.product.id}/${node.product.slug}`}
																				className="text-dark d-inline-block align-middle"
																			>
																				{node.product.title}
																			</Link>
																		</h5>
																		<span className="text-muted font-weight-normal font-italic d-block">
																			Category: {node.product.category.title}
																		</span>
																	</div>
																</div>
															</th>
															<td className="border-0 align-middle">
																<strong>
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
																</strong>
															</td>
															<td className="border-0 align-middle">
																{addToCart.isLoading ? (
																	<button type="button" className="btn btn-danger " disabled>
																		<i className="fa fa-cog fa-spin fa-fw" />
																	</button>
																) : (
																	<button
																		type="submit"
																		className="btn btn-danger"
																		onClick={handleAddToCart.bind(this, node.product.id, -1, node.quantity)}
																	>
																		<i className="fa fa-minus fa-fw" />
																	</button>
																)}
																<strong className="mx-3">{node.quantity}</strong>
																{addToCart.isLoading ? (
																	<button type="button" className="btn btn-success " disabled>
																		<i className="fa fa-cog fa-spin fa-fw" />
																	</button>
																) : (
																	<button
																		type="submit"
																		className="btn btn-success"
																		onClick={handleAddToCart.bind(this, node.product.id, 1)}
																	>
																		<i className="fa fa-plus fa-fw" />
																	</button>
																)}
															</td>
															<td className="border-0 align-middle">
																<a
																	href="#!"
																	className="text-danger"
																	onClick={handleDeleteCartItem.bind(this, node.product.id)}
																>
																	<i className="fa fa-trash" />
																</a>
															</td>
														</tr>
													))}
												</tbody>
											</table>
										</div>
									</div>
								</div>
								<div className="row bg-white">
									<div className="col-12">
										<div className="rounded shadow">
											<div className="bg-light rounded-pill px-4 py-3 text-uppercase font-weight-bold">Total price</div>
											<div className="p-4">
												<ul className="list-unstyled mb-4">
													<li className="d-flex justify-content-between py-3 border-bottom">
														<strong className="text-muted">Quantity</strong>
														<strong>{totalObj(fetchCart.cart.product_cart, 'quantity')}</strong>
													</li>
													<li className="d-flex justify-content-between py-3 border-bottom">
														<strong className="text-muted">Subtotal</strong>
														<strong>{subTotalPrice(fetchCart.cart.product_cart, 'quantity', 'price')}₫</strong>
													</li>
													<li className="d-flex justify-content-between py-3 border-bottom">
														<strong className="text-muted">Discount</strong>
														<strong className="text-danger">
															-{discountPrice(fetchCart.cart.product_cart, 'quantity', 'discount')}₫
														</strong>
													</li>
													<li className="d-flex justify-content-between py-3">
														<strong className="text-muted">Total</strong>
														<h5 className="font-weight-bold text-success">
															{totalPrice(fetchCart.cart.product_cart, 'quantity', 'price', 'discount')}₫
														</h5>
													</li>
												</ul>
												<Link to="/checkout" className="btn btn-dark rounded-pill py-2 btn-block">
													Procceed to checkout
												</Link>
											</div>
										</div>
									</div>
								</div>
							</>
						)}
					</>
				)}
			</div>
		</LayoutContainer>
	);
};

const mapStateToProps = (state) => ({
	fetchCart: state.carts.fetchCart,
	login: state.auth.login,
	addToCart: state.carts.addToCart
});

const mapDispatchToProps = {
	fetchCartThunk,
	deleteCartItemThunk,
	deleteCartItemResetedThunk,
	addToCartThunk
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
