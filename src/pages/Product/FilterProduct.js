import React, { useEffect } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import isEmpty from '../../helpers/isEmpty';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import ProductCard from '../../components/ProductCard/ProductCard';
import Pagination from '../../components/Pagination/Pagination';
import {
	fetchNewProductThunk,
	fetchNewProductResetedThunk,
	filterProductThunk,
	filterProductResetedThunk,
	filterProductByValueThunk
} from '../../thunks/productThunk';
import { fetchCartThunk, addToCartThunk } from '../../thunks/cartThunk';
import { fetchBrandThunk } from '../../thunks/brandThunk';
import LayoutContainer from '../../containers/Layout/LayoutContainer';

const FilterProduct = ({
	fetchNewProductThunk,
	fetchNewProductResetedThunk,
	addToCartThunk,
	fetchCartThunk,
	fetchNewProduct,
	addToCart,
	login,
	filterProductThunk,
	filterProductResetedThunk,
	filterProduct,
	fetchCategory,
	filterProductByValueThunk,
	fetchBrandThunk,
	fetchBrand
}) => {
	const { id } = useParams();
	const history = useHistory();
	const handleCheckboxChange = (brand_id) => {
		filterProductByValueThunk(brand_id);
	};
	useEffect(() => {
		filterProductThunk(id);
		fetchBrandThunk();
		return () => {
			filterProductResetedThunk();
		};
	}, [filterProductThunk, filterProductResetedThunk, id, fetchBrandThunk]);

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
			<Container>
				<Row>
					<div className="col-lg-3">
						<h3 className="mt-4 mb-2">Categories</h3>
						<div className="list-group">
							{fetchCategory.isLoading ? (
								<li className="list-group-item align-items-center">
									<div className="spinner-grow spinner-grow-sm text-success mr-2" role="status">
										<span className="sr-only">Loading...</span>
									</div>
									<div className="spinner-grow spinner-grow-sm text-success mr-2" role="status">
										<span className="sr-only">Loading...</span>
									</div>
									<div className="spinner-grow spinner-grow-sm text-success mr-2" role="status">
										<span className="sr-only">Loading...</span>
									</div>
								</li>
							) : (
								<>
									{isEmpty(fetchCategory.category) ? (
										<li className="list-group-item align-items-center">No category</li>
									) : (
										<>
											{fetchCategory.category.map((node) => (
												<Link to={`/shop/${node.id}/${node.slug}`} key={node.id} className="list-group-item">
													{node.title}
												</Link>
											))}
										</>
									)}
								</>
							)}
						</div>
						<h3 className="mt-4 mb-2">Brand</h3>
						<div className="list-group">
							{fetchBrand.isLoading ? (
								<li className="list-group-item align-items-center">
									<div className="spinner-grow spinner-grow-sm text-success mr-2" role="status">
										<span className="sr-only">Loading...</span>
									</div>
									<div className="spinner-grow spinner-grow-sm text-success mr-2" role="status">
										<span className="sr-only">Loading...</span>
									</div>
									<div className="spinner-grow spinner-grow-sm text-success mr-2" role="status">
										<span className="sr-only">Loading...</span>
									</div>
								</li>
							) : (
								<>
									{isEmpty(fetchBrand.brand) ? (
										<li className="list-group-item align-items-center">No category</li>
									) : (
										<>
											{fetchBrand.brand.map((item) => (
												<li className="list-group-item" key={item.id}>
													<div className="custom-control custom-checkbox">
														<input
															className="custom-control-input"
															name="brand"
															type="checkbox"
															id={item.id}
															checked={filterProduct.brandCheck.includes(item.id)}
															onChange={handleCheckboxChange.bind(this, item.id)}
														/>
														<label className="custom-control-label" htmlFor={item.id}>
															{item.title}
														</label>
													</div>
												</li>
											))}
										</>
									)}
								</>
							)}
						</div>
					</div>
					<div className="col-lg-9">
						<div className="row my-4">
							<div className="col-md-7"></div>
							<div className="col-md-5">
								<div className="row">
									<label
										className="col-sm-4 d-flex justify-content-end align-items-center"
										htmlFor="inputGroupSelect01"
									>
										Sort by
									</label>
									<div className="col-sm-8 input-group">
										<select defaultValue="" className="custom-select" id="inputGroupSelect01">
											<option value="">Choose...</option>
											<option value={1}>One</option>
											<option value={2}>Two</option>
											<option value={3}>Three</option>
										</select>
									</div>
								</div>
							</div>
						</div>
						<div className="row">
							{filterProduct.isLoading ? (
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
									{isEmpty(filterProduct.newProduct) ? (
										<div className="col-12 mb-4">No posts</div>
									) : (
										<>
											{filterProduct.newProduct.map((node) => (
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
						</div>
						<Pagination />
					</div>
				</Row>
			</Container>
		</LayoutContainer>
	);
};

FilterProduct.propTypes = {
	fetchNewProduct: PropTypes.shape({
		product: PropTypes.array
	}).isRequired
};

const mapStateToProps = (state) => ({
	fetchNewProduct: state.products.fetchNewProduct,
	addToCart: state.carts.addToCart,
	login: state.auth.login,
	filterProduct: state.products.filterProduct,
	fetchCategory: state.categories.fetchCategory,
	fetchBrand: state.brands.fetchBrand
});
const mapDispatchToProps = {
	fetchNewProductThunk,
	fetchNewProductResetedThunk,
	addToCartThunk,
	fetchCartThunk,
	filterProductThunk,
	filterProductResetedThunk,
	filterProductByValueThunk,
	fetchBrandThunk
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterProduct);
