import React from 'react';
import PropTypes from 'prop-types';
import Pagination from 'react-bootstrap/Pagination';

const PaginationCustom = (props) => {
	return (
		<Pagination className="justify-content-center flex-wrap">
			<Pagination.First />
			<Pagination.Prev />
			<Pagination.Item active>{1}</Pagination.Item>
			<Pagination.Ellipsis />

			<Pagination.Item>{11}</Pagination.Item>
			<Pagination.Item>{12}</Pagination.Item>
			<Pagination.Item>{13}</Pagination.Item>

			<Pagination.Ellipsis />
			<Pagination.Item>{20}</Pagination.Item>
			<Pagination.Next />
			<Pagination.Last />
		</Pagination>
	);
};

PaginationCustom.propTypes = {};

export default PaginationCustom;
