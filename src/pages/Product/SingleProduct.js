import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import isEmpty from '../../helpers/isEmpty';
import ProductCard from '../../components/ProductCard/ProductCard';
import { singleProductThunk, relatedProductThunk, relatedProductResetedThunk } from '../../thunks/productThunk';
import { fetchCartThunk, addToCartThunk } from '../../thunks/cartThunk';
import Nav from 'react-bootstrap/Nav';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import LayoutContainer from '../../containers/Layout/LayoutContainer';

const SinglePost = ({
	addToCartThunk,
	fetchCartThunk,
	singleProductThunk,
	relatedProductThunk,
	relatedProductResetedThunk,
	relatedProduct,
	singleProduct,
	addToCart,
	login
}) => {
	const { id } = useParams();
	const history = useHistory();
	useEffect(() => {
		singleProductThunk(id);
		relatedProductThunk(id);
		return () => {
			relatedProductResetedThunk();
		};
	}, [singleProductThunk, id, relatedProductThunk, relatedProductResetedThunk]);

	const handleAddToCartSingleProduct = async (product_id, quantity) => {
		if (login.isAuthenticated) {
			const product = {
				product_id: product_id,
				quantity: quantity
			};
			await addToCartThunk(product);
			await fetchCartThunk();
		} else {
			history.push('/login');
		}
	};

	const handleAddToCart = async (product_id, quantity) => {
		if (login.isAuthenticated) {
			const product = {
				product_id: product_id,
				quantity: quantity
			};
			await addToCartThunk(product);
			await fetchCartThunk();
		} else {
			history.push('/login');
		}
	};
	return (
		<LayoutContainer>
			<div className="container">
				<h2 className="mt-4 mb-3">Product</h2>
				{singleProduct.isLoading ? (
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
						{singleProduct.isError ? (
							<>{singleProduct.errorMessage}</>
						) : (
							<>
								{isEmpty(singleProduct.product) ? (
									<>No posts</>
								) : (
									<>
										<ol className="breadcrumb mb-5">
											<li className="breadcrumb-item">
												<a href="/">Home</a>
											</li>
											<li className="breadcrumb-item">
												<a href="/">{singleProduct.product.category.title}</a>
											</li>
											<li className="breadcrumb-item active">{singleProduct.product.title}</li>
										</ol>
										<div className="row single-product">
											<div className="preview col-md-6">
												<Tab.Container id="left-tabs-example" defaultActiveKey="pic-1">
													<Tab.Content className="preview-pic">
														<Tab.Pane eventKey="pic-1">
															<img src={singleProduct.product.product_image[0].url} alt={singleProduct.product.title} />
														</Tab.Pane>
														<Tab.Pane eventKey="pic-2">
															<img src={singleProduct.product.product_image[0].url} alt={singleProduct.product.title} />
														</Tab.Pane>
														<Tab.Pane eventKey="pic-3">
															<img src={singleProduct.product.product_image[0].url} alt={singleProduct.product.title} />
														</Tab.Pane>
													</Tab.Content>
													<Nav as="nav" className="preview-thumbnail nav-tabs">
														<Nav.Item as="li">
															<Nav.Link eventKey="pic-1">
																<img
																	src={singleProduct.product.product_image[0].url}
																	alt={singleProduct.product.title}
																/>
															</Nav.Link>
														</Nav.Item>
														<Nav.Item as="li">
															<Nav.Link eventKey="pic-2">
																<img
																	src={singleProduct.product.product_image[0].url}
																	alt={singleProduct.product.title}
																/>
															</Nav.Link>
														</Nav.Item>
														<Nav.Item as="li">
															<Nav.Link eventKey="pic-3">
																<img
																	src={singleProduct.product.product_image[0].url}
																	alt={singleProduct.product.title}
																/>
															</Nav.Link>
														</Nav.Item>
													</Nav>
												</Tab.Container>
											</div>
											<div className="details col-md-6">
												<h3 className="product-title">{singleProduct.product.title}</h3>
												<div className="ratings">
													<div className="ratings-star">
														<div className="ratings-val" style={{ width: '40%' }} />
													</div>
													<span className="ratings-text">(666 Reviews)</span>
												</div>
												<p className="product-description">{singleProduct.product.excerpt}</p>
												<h4 className="price">
													<span className="text-price">Price: </span>
													{parseFloat(singleProduct.product.discount) === 0 ? (
														<>{singleProduct.product.price}₫</>
													) : (
														<>
															{singleProduct.product.price - parseFloat(singleProduct.product.discount)}₫
															<span className="discount">{singleProduct.product.price}₫</span>
														</>
													)}
												</h4>
												{/* <h5 className="sizes">
													Sizes:
													<span className="size" data-toggle="tooltip" title="small">
														s
													</span>
													<span className="size" data-toggle="tooltip" title="medium">
														m
													</span>
													<span className="size" data-toggle="tooltip" title="large">
														l
													</span>
													<span className="size" data-toggle="tooltip" title="xtra large">
														xl
													</span>
												</h5>
												<h5 className="colors">
													Colors:
													<span className="color orange not-available" data-toggle="tooltip" title="Not In store" />
													<span className="color green" />
													<span className="color blue" />
												</h5> */}
												<div className="action">
													{addToCart.isLoading ? (
														<button className="add-to-cart btn btn-default mr-2 disabled" type="button">
															<span className="spinner-grow spinner-grow-sm mr-1" role="status" aria-hidden="true" />
															Add To Cart
														</button>
													) : (
														<button
															className="add-to-cart btn btn-default mr-2"
															type="button"
															href="#!"
															onClick={handleAddToCartSingleProduct.bind(this, singleProduct.product.id, 1)}
														>
															Add To Cart
														</button>
													)}
													<button className="like btn btn-default" type="button">
														<span className="fa fa-heart" />
													</button>
												</div>
											</div>
										</div>
									</>
								)}
							</>
						)}
					</>
				)}
				<h3 className="my-4">Related Products</h3>
				<div className="row">
					{relatedProduct.isLoading ? (
						<div className="col-12 mb-4">
							<div className="spinner-grow text-success mr-5" role="status">
								<span className="sr-only">Loading...</span>
							</div>
							<div className="spinner-grow text-success mr-5" role="status">
								<span className="sr-only">Loading...</span>
							</div>
							<div className="spinner-grow text-success mr-5" role="status">
								<span className="sr-only">Loading...</span>
							</div>
						</div>
					) : (
						<>
							{relatedProduct.isError ? (
								<div className="col-12 mb-4">{relatedProduct.errorMessage}</div>
							) : (
								<>
									{isEmpty(relatedProduct.product) ? (
										<div className="col-12 mb-4">No posts</div>
									) : (
										<>
											{relatedProduct.product.map((node) => (
												<div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={node.id}>
													<ProductCard
														id={node.id}
														title={node.title}
														slug={node.slug}
														price={node.price}
														discount={node.discount}
														img1={node.product_image[0].url}
														img2={node.product_image[0].url}
														isLoading={addToCart.isLoading}
														addToCart={handleAddToCart.bind(this, node.id, 1)}
													/>
												</div>
											))}
										</>
									)}
								</>
							)}
						</>
					)}
				</div>
			</div>
		</LayoutContainer>
	);
};

SinglePost.propTypes = {};

const mapStateToProps = (state) => ({
	singleProduct: state.products.singleProduct,
	relatedProduct: state.products.relatedProduct,
	addToCart: state.carts.addToCart,
	login: state.auth.login
});
const mapDispatchToProps = {
	addToCartThunk,
	fetchCartThunk,
	singleProductThunk,
	relatedProductThunk,
	relatedProductResetedThunk
};

export default connect(mapStateToProps, mapDispatchToProps)(SinglePost);
