import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import LayoutContainer from '../../containers/Layout/LayoutContainer';
import isEmpty from '../../helpers/isEmpty';
import { Formik } from 'formik';
import * as Yup from 'yup';
import InputForm from '../../components/Form/InputForm';
import SelectForm from '../../components/Form/SelectForm';
import CheckBoxForm from '../../components/Form/CheckBoxForm';
import PhoneInputForm from '../../components/Form/PhoneInputForm';
import { checkoutThunk } from '../../thunks/cartThunk';

const totalObj = function (arr, prop) {
	return arr.reduce(function (a, b) {
		return a + b[prop];
	}, 0);
};
const totalPrice = function (arr, qty, price, discount, shipping) {
	return (
		arr.reduce(function (a, b) {
			return a + b[qty] * (b.product[price] - b.product[discount]);
		}, 0) + shipping
	);
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
const Checkout = ({ fetchCart, checkoutThunk, checkout }) => {
	const history = useHistory();
	const [shipping, setShipping] = useState(60000);
	const initialValues = {
		first_name: '',
		last_name: '',
		email: '',
		phone_number: '',
		address: '',
		shipping: 60000,
		agreecheckout: false
	};
	const validationSchema = Yup.object({
		first_name: Yup.string()
			.min(1, 'Fisrt name must be at least 1 characters')
			.max(16, 'Fisrt name must be at most 16 characters')
			.required('First name is required'),
		last_name: Yup.string()
			.min(1, 'Last name must be at least 1 characters')
			.max(16, 'Last name must be at most 16 characters')
			.required('Last name is required'),
		email: Yup.string()
			.matches(
				/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
				'Email invalid'
			)
			.required('Email is required'),
		phone_number: Yup.string()
			.min(10, 'Phone number must be at least 10 characters')
			.matches(/^[0-9]+$/)
			.required('Phone number is required'),
		address: Yup.string()
			.min(6, 'Address must be at least 6 characters')
			.max(66, 'Address must be at most 66 characters')
			.required('Address is required'),
		shipping: Yup.string().oneOf(['60000', '100000'], 'Invalid shipping').required('Select shipping'),
		agreecheckout: Yup.boolean().oneOf([true], 'You must tick here').required('Required')
	});
	const onSubmit = (values) => {
		const checkout = {
			first_name: values.first_name,
			last_name: values.last_name,
			email: values.email,
			phone_number: values.phone_number,
			address: values.address,
			shipping: parseInt(values.shipping),
			sub_total: subTotalPrice(fetchCart.cart.product_cart, 'quantity', 'price'),
			promo: '',
			discount: discountPrice(fetchCart.cart.product_cart, 'quantity', 'discount'),
			total: totalPrice(fetchCart.cart.product_cart, 'quantity', 'price', 'discount', parseInt(values.shipping)),
			order_product: fetchCart.cart.product_cart.map((node) => {
				return {
					product_id: node.product.id,
					price: node.product.price * node.quantity,
					discount: node.product.discount * node.quantity,
					total: (node.product.price - node.product.discount) * node.quantity,
					quantity: node.quantity
				};
			})
		};
		console.log(checkout);
		checkoutThunk(checkout, history);
	};
	return (
		<LayoutContainer>
			<div className="container">
				<h2 className="mt-4 mb-3">Checkout</h2>
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
									<li className="breadcrumb-item active">Checkout</li>
								</ol>
								<div className="row">
									<div className="col-lg-12 bg-white mb-5">
										<div className="table-responsive rounded shadow rounded">
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
															<div className="py-2 text-uppercase">Total</div>
														</th>
													</tr>
												</thead>
												<tbody>
													{fetchCart.cart.product_cart.map((node) => (
														<tr key={node.id}>
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
																<strong>{node.quantity}</strong>
															</td>
															<td className="border-0 align-middle text-success">
																<strong>{(node.product.price - node.product.discount) * node.quantity}₫</strong>
															</td>
														</tr>
													))}
												</tbody>
											</table>
										</div>
									</div>
								</div>
								<div className="row bg-white">
									<div className="col-md-7">
										<h4 className="mb-3">Billing address</h4>
										<Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
											{({ values, errors, touched, handleSubmit, setFieldValue, setFieldTouched }) => (
												<form onSubmit={handleSubmit}>
													<div className="form-row">
														<div className="form-group col-md-6">
															<InputForm
																label="First name"
																placeholder="First name"
																id="first_name"
																name="first_name"
																type="text"
															/>
														</div>
														<div className="form-group col-md-6">
															<InputForm
																label="Last name"
																placeholder="Last name"
																id="last_name"
																name="last_name"
																type="text"
															/>
														</div>
													</div>
													<div className="form-group">
														<InputForm label="Email" placeholder="Email" id="email" name="email" type="text" />
													</div>
													<div className="form-group">
														<PhoneInputForm
															label="Phone number"
															inputProps={{
																name: 'phone_number',
																id: 'phone_number'
															}}
															placeholder="84 336 077 131"
															country={'vn'}
															onChange={(value) => setFieldValue('phone_number', value)}
															onBlur={() => setFieldTouched('phone_number', true)}
															value={values.phone_number}
															errors={errors.phone_number}
															touched={touched.phone_number}
														/>
													</div>
													<div className="form-group">
														<InputForm label="Address" placeholder="Address" id="address" name="address" type="text" />
													</div>
													<div className="form-group">
														<SelectForm label="Shipping" name="shipping">
															<option value="60000">Delivery of the week</option>
															<option value="100000">Delivery in 24h</option>
														</SelectForm>
														{setShipping(parseInt(values.shipping))}
													</div>
													<div className="form-group form-check">
														<CheckBoxForm
															label="Shipping address is the same as my billing address"
															id="agreecheckout"
															name="agreecheckout"
														/>
													</div>
													{checkout.isLoading ? (
														<button
															type="submit"
															className="btn btn-dark rounded-pill py-2 btn-block d-flex align-items-center justify-content-center"
														>
															<span className="spinner-grow spinner-grow-sm mr-1" role="status" aria-hidden="true" />
															Checkout now
														</button>
													) : (
														<button type="submit" className="btn btn-dark rounded-pill py-2 btn-block">
															Checkout now
														</button>
													)}
												</form>
											)}
										</Formik>
									</div>
									<div className="col-md-5">
										<div className="row">
											<div className="col-md-12">
												<div className="rounded shadow mb-4">
													<div className="bg-light rounded-pill px-4 py-3 text-uppercase font-weight-bold">
														Coupon code
													</div>
													<div className="p-4">
														<p className="font-italic mb-4">
															If you have a coupon code, please enter it in the box below
														</p>
														<div className="input-group mb-4 border rounded-pill p-2">
															<input
																type="text"
																placeholder="Apply coupon"
																aria-describedby="button-addon3"
																className="form-control border-0"
															/>
															<div className="input-group-append border-0">
																<button id="button-addon3" type="button" className="btn btn-dark px-4 rounded-pill">
																	<i className="fa fa-gift mr-2" />
																	Apply coupon
																</button>
															</div>
														</div>
													</div>
												</div>
											</div>
											<div className="col-md-12">
												<div className="rounded shadow">
													<div className="bg-light rounded-pill px-4 py-3 text-uppercase font-weight-bold">
														Order summary{' '}
													</div>
													<div className="p-4">
														<p className="font-italic mb-4">
															Shipping and additional costs are calculated based on values you have entered.
														</p>
														<ul className="list-unstyled mb-0">
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
															<li className="d-flex justify-content-between py-3 border-bottom">
																<strong className="text-muted">Shipping and handling</strong>
																<strong>{shipping}₫</strong>
															</li>
															<li className="d-flex justify-content-between py-3">
																<strong className="text-muted">Total</strong>
																<h5 className="font-weight-bold text-success">
																	{totalPrice(fetchCart.cart.product_cart, 'quantity', 'price', 'discount', shipping)}₫
																</h5>
															</li>
														</ul>
													</div>
												</div>
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
	checkout: state.carts.checkout
});

const mapDispatchToProps = { checkoutThunk };

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
