import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import isEmpty from '../../helpers/isEmpty';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import ProductCard from '../../components/ProductCard/ProductCard';
import { fetchNewProductThunk, fetchNewProductResetedThunk } from '../../thunks/productThunk';
import { fetchCartThunk, addToCartThunk } from '../../thunks/cartThunk';
import LayoutContainer from '../../containers/Layout/LayoutContainer.jsx';
import Carousel from '../../components/Carousel/Carousel';

const Home = ({
	fetchNewProductThunk,
	fetchNewProductResetedThunk,
	addToCartThunk,
	fetchCartThunk,
	fetchNewProduct,
	addToCart,
	login
}) => {
	const history = useHistory();
	useEffect(() => {
		fetchNewProductThunk();
		return () => {
			fetchNewProductResetedThunk();
		};
	}, [fetchNewProductThunk, fetchNewProductResetedThunk]);
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
			<Carousel />
			<Container>
				<h1 className="my-4">New product</h1>
				<Row>
					{fetchNewProduct.isLoading ? (
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
							{fetchNewProduct.isError ? (
								<div className="col-12 mb-4">{fetchNewProduct.errorMessage}</div>
							) : (
								<>
									{isEmpty(fetchNewProduct.product) ? (
										<div className="col-12 mb-4">No posts</div>
									) : (
										<>
											{fetchNewProduct.product.map((node) => (
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
				</Row>
				<h1 className="my-4">Products are bought the most</h1>
				<Row>
					{fetchNewProduct.isLoading ? (
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
							{fetchNewProduct.isError ? (
								<div className="col-12 mb-4">{fetchNewProduct.errorMessage}</div>
							) : (
								<>
									{isEmpty(fetchNewProduct.product) ? (
										<div className="col-12 mb-4">No posts</div>
									) : (
										<>
											{fetchNewProduct.product.map((node) => (
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
				</Row>
			</Container>
		</LayoutContainer>
	);
};

Home.propTypes = {
	fetchNewProduct: PropTypes.shape({
		product: PropTypes.array
	}).isRequired
};

const mapStateToProps = (state) => ({
	fetchNewProduct: state.products.fetchNewProduct,
	addToCart: state.carts.addToCart,
	login: state.auth.login
});
const mapDispatchToProps = {
	fetchNewProductThunk,
	fetchNewProductResetedThunk,
	addToCartThunk,
	fetchCartThunk
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
