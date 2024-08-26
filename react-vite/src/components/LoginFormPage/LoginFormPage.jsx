import { useState, useEffect } from 'react';
import { thunkLogin } from '../../redux/session';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import './LoginForm.css';

function LoginFormPage() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const sessionUser = useSelector((state) => state.session.user);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [errors, setErrors] = useState({});
	const [touched, setTouched] = useState({});

	// useEffect for validation
	useEffect(() => {
		const newErrors = {};

		if (touched.email) {
			if (!email) {
				newErrors.email = 'Email is required';
			} else if (!/\S+@\S+\.\S+/.test(email)) {
				newErrors.email = 'Email address is invalid';
			}
		}

		if (touched.password) {
			if (!password) {
				newErrors.password = 'Password is required';
			} else if (password.length < 6) {
				newErrors.password = 'Password must be at least 6 characters';
			}
		}

		setErrors(newErrors);
	}, [email, password, touched]);

	if (sessionUser)
		return (
			<Navigate
				to='/'
				replace={true}
			/>
		);

	const handleBlur = (field) => () => {
		setTouched({
			...touched,
			[field]: true,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (Object.keys(errors).length === 0) {
			const serverResponse = await dispatch(
				thunkLogin({
					email,
					password,
				})
			);

			if (serverResponse) {
				setErrors(serverResponse);
			} else {
				navigate('/');
			}
		}
	};

	return (
		<div className='login-form-wrapper'>
			<h1 className='login-title'>Log In</h1>
			<form
				className='login-form-structure'
				onSubmit={handleSubmit}
			>
				<div className='input-wrapper'>
					<label className={email ? 'input-label active' : 'input-label'}>
						Email
					</label>
					<input
						className='login-input'
						type='text'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						onBlur={handleBlur('email')}
						required
					/>
					{touched.email && errors.email && (
						<p className='errors'>{errors.email}</p>
					)}
				</div>
				<div className='input-wrapper'>
					<label className={password ? 'input-label active' : 'input-label'}>
						Password
					</label>
					<input
						className='login-input'
						type='password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						onBlur={handleBlur('password')}
						required
					/>
					{touched.password && errors.password && (
						<p className='errors'>{errors.password}</p>
					)}
				</div>
				<button
					className='login-submit-btn'
					type='submit'
				>
					Log In
				</button>
			</form>
		</div>
	);
}

export default LoginFormPage;
