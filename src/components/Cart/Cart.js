import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import isEmpty from '../../helpers/isEmpty';
import Dropdown from 'react-bootstrap/Dropdown';
import NavItem from 'react-bootstrap/NavItem';
import NavLink from 'react-bootstrap/NavLink';

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

const Cart = ({ fetchCartThunk, isLoading, isError, errorMessage, product }) => {
	useEffect(() => {
		fetchCartThunk();
		return () => {};
	}, [fetchCartThunk]);
	return (
		<Dropdown className="cart-dropdown" as={NavItem}>
			<Dropdown.Toggle as={NavLink} id="dropdown-custom-2">
				<i className="fa fa-shopping-cart" aria-hidden="true" /> Cart{' '}
				<span className="badge badge-pill badge-danger">
					{isLoading ? (
						<div className="spinner-border spinner-border-sm"></div>
					) : isError ? (
						errorMessage
					) : isEmpty(product) ? (
						'0'
					) : (
						totalObj(product, 'quantity')
					)}
				</span>
			</Dropdown.Toggle>
			<Dropdown.Menu align="right">
				<div className="row total-header-section">
					<div className="col-lg-6 col-sm-6 col-6">
						<i className="fa fa-shopping-cart" aria-hidden="true" />{' '}
						<span className="badge badge-pill badge-danger">
							{isLoading ? (
								<div className="spinner-border spinner-border-sm"></div>
							) : isError ? (
								errorMessage
							) : isEmpty(product) ? (
								'0'
							) : (
								totalObj(product, 'quantity')
							)}
						</span>
					</div>
					<div className="col-lg-6 col-sm-6 col-6 total-section text-right">
						<p>
							Total:{' '}
							<span className="total-price">
								{isLoading ? (
									<div className="spinner-border spinner-border-sm"></div>
								) : isError ? (
									errorMessage
								) : isEmpty(product) ? (
									'0'
								) : (
									totalPrice(product, 'quantity', 'price', 'discount')
								)}
							</span>
						</p>
					</div>
				</div>
				{isLoading ? (
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
				) : (
					<>
						{isError ? (
							<div className="row cart-detail justify-content-center">{errorMessage}</div>
						) : (
							<>
								{isEmpty(product) ? (
									<div className="row cart-detail justify-content-center">No products</div>
								) : (
									<>
										{product.map((node) => (
											<div className="row cart-detail" key={node.id}>
												<div className="col-lg-4 col-sm-4 col-4 cart-detail-img">
													<img src={node.product.product_image[0].url} alt={node.product.title} />
												</div>
												<div className="col-lg-8 col-sm-8 col-8 cart-detail-product">
													<Link to={`/products/${node.product.id}/${node.product.slug}`}>{node.product.title}</Link>
													<div className="meta-cart">
														<span className="price">{node.product.price}</span>
														<span className="discount">{node.product.discount}</span>
														<span className="count">Qty: {node.quantity}</span>
													</div>
												</div>
											</div>
										))}
									</>
								)}
							</>
						)}
					</>
				)}
				<div className="row">
					<div className="col-lg-12 col-sm-12 col-12 text-center view-cart">
						<button className="btn btn-primary btn-block">View Cart</button>
					</div>
					<div className="col-lg-12 col-sm-12 col-12 text-center checkout">
						<button className="btn btn-primary btn-block">Checkout</button>
					</div>
				</div>
			</Dropdown.Menu>
		</Dropdown>
	);
};

Cart.propTypes = {};

export default Cart;
