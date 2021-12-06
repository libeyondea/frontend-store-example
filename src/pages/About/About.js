import React from 'react';
import LayoutContainer from '../../containers/Layout/LayoutContainer.jsx';

const About = () => {
	return (
		<LayoutContainer>
			<div className="about">
				<div className="container">
					<div className="row">
						<div className="about-flex">
							<div className="col-one-forth">
								<div className="row">
									<div className="col-md-12 about">
										<h2>About</h2>
										<ul>
											<li>
												<a href="#!">History</a>
											</li>
											<li>
												<a href="#!">Staff</a>
											</li>
											<li>
												<a href="#!">Connect with us</a>
											</li>
											<li>
												<a href="#!">Faqs</a>
											</li>
											<li>
												<a href="#!">Career</a>
											</li>
										</ul>
									</div>
								</div>
							</div>
							<div className="col-three-forth">
								<h2>Giới thiệu</h2>
								<div className="row">
									<div className="col-md-12">
										<p>
											Với mục tiêu mang đến cơ hội trải nghiệm các sản phẩm làm đẹp chất lượng tốt – giá tốt nhất thị
											trường, góp phần đắp đầy những vẻ đẹp khuyết thiếu, truyền cảm hứng dùng mỹ phẩm và giúp vẻ
											đẹpViệt tỏa sáng, Beauty Garden luôn không ngừng phấn đấu để hoàn thiện chất lượng dịch vụ của
											chính mình.
										</p>
										<p>
											Gần 7 năm kinh nghiệm hoạt động trong lĩnh vực mỹ phẩm làm đẹp, hiện đội ngũ nhân viên của Beauty
											Garden đã lên đến 150 người cùng hệ thống cửa hàng trải khắp ba miền đất nước. Beauty Garden đang
											dần khẳng định được vị thế của mình trên thương trường và chiếm được tin yêu của đông đảo quý
											khách hàng.
										</p>
										<div className="row row-pb-sm">
											<div className="col-md-6">
												<img className="img-responsive" src="/images/about.jpg" alt="img" width="400" height="300" />
											</div>
											<div className="col-md-6">
												<ul>
													<li>Sản phẩm đa dạng, phong phú</li>
													<li>Giá cả cạnh tranh với chất lượng đảm bảo</li>
													<li>Phục vụ khách hàng thân thiện, nhiệt tình, cả kênh online lẫn ở cửa hàng</li>
													<li>Giao hàng và thu tiền trên toàn quốc - Cho phép đổi trả trong vòng 2 ngày.</li>
												</ul>
											</div>
										</div>
										<b>Thông tin liên hệ:</b>
										<p className="mb-0">Địa chỉ: 120 Lê Quang Định - Phường 14 - Quận Bình Thạnh – Tp.HCM.</p>
										<p>Website: www.de4thzone.com.com</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</LayoutContainer>
	);
};

export default About;
