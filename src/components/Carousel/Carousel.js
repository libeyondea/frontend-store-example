import React from 'react';
import Carousel from 'react-bootstrap/Carousel';

const Carousels = () => {
	return (
		<header>
			<Carousel>
				<Carousel.Item>
					<img className="d-block w-100" src="/images/b1.jpg" alt="First slide" />
					<Carousel.Caption>
						<h3></h3>
					</Carousel.Caption>
				</Carousel.Item>
				<Carousel.Item>
					<img className="d-block w-100" src="/images/b2.jpg" alt="Third slide" />
					<Carousel.Caption>
						<h3></h3>
					</Carousel.Caption>
				</Carousel.Item>
				<Carousel.Item>
					<img className="d-block w-100" src="/images/b3.jpg" alt="Third slide" />
					<Carousel.Caption>
						<h3></h3>
					</Carousel.Caption>
				</Carousel.Item>
			</Carousel>
		</header>
	);
};

export default Carousels;
