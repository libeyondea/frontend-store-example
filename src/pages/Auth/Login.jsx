import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import InputForm from '../../components/Form/InputForm';
import { connect } from 'react-redux';
import { loginThunk } from '../../thunks/authThunk';
import LayoutContainer from '../../containers/Layout/LayoutContainer';

const mapStateToProps = (state) => ({
	login: state.auth.login
});
const mapDispatchToProps = {
	loginThunk
};
const Login = ({ loginThunk, login }) => {
	const initialValues = {
		user_name: '',
		password: ''
	};
	const validationSchema = Yup.object({
		user_name: Yup.string().required('User name is required'),
		password: Yup.string().required('Password is required')
	});
	const onSubmit = (values) => {
		const user = {
			user_name: values.user_name,
			password: values.password
		};
		loginThunk(user);
	};
	return (
		<LayoutContainer>
			<div className="container">
				<h2 className="mt-4 mb-3">Login</h2>
				<ol className="breadcrumb mb-5">
					<li className="breadcrumb-item">
						<a href="/">Home</a>
					</li>
					<li className="breadcrumb-item active">Login</li>
				</ol>
				<div className="row">
					<div className="col-lg-8 col-md-10 mx-auto">
						<Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
							<Form>
								<div className="form-group">
									<InputForm
										label="User name"
										placeholder="Enter user name"
										id="user_name"
										name="user_name"
										type="text"
										isError={login.isError}
										errorMessage={login.errorMessage.user}
									/>
								</div>
								<div className="form-group">
									<InputForm
										label="Password"
										placeholder="Password"
										id="password"
										name="password"
										type="password"
										isError={login.isError}
										errorMessage={login.errorMessage.user}
									/>
								</div>
								<div className="d-flex justify-content-between mb-3">
									<div className="form-group form-check">
										<input type="checkbox" className="form-check-input" id="remember" />
										<label className="form-check-label" htmlFor="remember">
											Remember
										</label>
									</div>
									<span>
										<a href="#!">Forgot password?</a>
									</span>
								</div>
								<div className="text-center">
									{login.isLoading ? (
										<button type="submit" className="btn btn-success" disabled>
											<span className="spinner-grow spinner-grow-sm mr-1" role="status" aria-hidden="true" />
											Login
										</button>
									) : (
										<button type="submit" className="btn btn-success">
											Login
										</button>
									)}
									<p className="mt-3">
										Not a member? <Link to="/register">Register</Link>
									</p>
									<p>or sign in with:</p>
									<a href="#!" className="btn-floating btn-fb btn-sm mr-1">
										<i className="fa fa-facebook" />
									</a>
									<a href="#!" className="btn-floating btn-tw btn-sm mr-1">
										<i className="fa fa-twitter" />
									</a>
									<a href="#!" className="btn-floating btn-li btn-sm mr-1">
										<i className="fa fa-linkedin"></i>
									</a>
									<a href="#!" className="btn-floating btn-git btn-sm">
										<i className="fa fa-github" />
									</a>
								</div>
							</Form>
						</Formik>
					</div>
				</div>
			</div>
		</LayoutContainer>
	);
};
Login.propTypes = {
	loginThunk: PropTypes.func.isRequired,
	login: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
