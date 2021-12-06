import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProductCard = ({ title, price, discount, img1, img2, isLoading, addToCart, id, slug, quantity }) => {
	return (
		<div className="product-grid4">
			<div className="product-image4">
				<Link to={`/products/${id}/${slug}`}>
					<img className="pic-1" src={img1} alt={title} />
					<img className="pic-2" src={img2} alt={title} />
				</Link>
				<ul className="social">
					<li>
						<a href="#!" data-tip="Quick View">
							<i className="fa fa-eye" />
						</a>
					</li>
					<li>
						<a href="#!" data-tip="Add to Wishlist">
							<i className="fa fa-shopping-bag" />
						</a>
					</li>
					<li>
						<a href="#!" data-tip="Add to Cart">
							<i className="fa fa-shopping-cart" />
						</a>
					</li>
				</ul>
				<span className="product-new-label">New</span>
				{parseFloat(discount) !== 0 && (
					<span className="product-discount-label">
						-{Math.round(((parseFloat(discount) * 100) / price + Number.EPSILON) * 10) / 10}%
					</span>
				)}
			</div>
			<div className="product-content">
				<h3 className="title">
					<Link to={`/products/${id}/${slug}`}>{title}</Link>
				</h3>
				{parseFloat(discount) === 0 ? (
					<div className="price">{price}₫</div>
				) : (
					<div className="price">
						{price - parseFloat(discount)}₫<span>{price}₫</span>
					</div>
				)}
				<div className="ratings d-flex justify-content-center">
					<div className="ratings-star">
						<div className="ratings-val" style={{ width: '40%' }} />
					</div>
					<span className="ratings-text">(666 Reviews)</span>
				</div>
				{isLoading ? (
					<a className="btn add-to-cart disabled" href="#!">
						<span className="spinner-grow spinner-grow-sm mr-1" role="status" aria-hidden="true" />
						Add To Cart
					</a>
				) : (
					<a className="add-to-cart" href="#!" onClick={addToCart}>
						Add To Cart
					</a>
				)}
			</div>
		</div>
	);
};

ProductCard.propTypes = {};

export default ProductCard;
