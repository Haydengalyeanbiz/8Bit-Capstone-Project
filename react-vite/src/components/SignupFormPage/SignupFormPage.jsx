import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { thunkSignup } from '../../redux/session';
import './SignupForm.css';

function SignupFormPage() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [email, setEmail] = useState('');
	const [username, setUsername] = useState('');
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [address, setAddress] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [errors, setErrors] = useState({});
	const [touched, setTouched] = useState({});
	const sessionUser = useSelector((state) => state.session.user);

	useEffect(() => {
		const newErrors = {};

		// Email validation
		if (touched.email && email && !/\S+@\S+\.\S+/.test(email)) {
			newErrors.email = 'Please enter a valid email address';
		}

		// Username validation
		if (touched.username && username && username.length < 4) {
			newErrors.username = 'Username must be at least 4 characters long';
		}

		// First name validation
		if (touched.firstName && firstName && firstName.length < 2) {
			newErrors.firstName = 'First name must be at least 2 characters long';
		}

		// Last name validation
		if (touched.lastName && lastName && lastName.length < 2) {
			newErrors.lastName = 'Last name must be at least 2 characters long';
		}

		// Address validation
		if (touched.address && address && address.length < 5) {
			newErrors.address = 'Address must be at least 5 characters long';
		}

		// Password validation
		if (touched.password && password && password.length < 6) {
			newErrors.password = 'Password must be at least 6 characters long';
		}

		// Confirm Password validation
		if (
			touched.confirmPassword &&
			confirmPassword &&
			password !== confirmPassword
		) {
			newErrors.confirmPassword = 'Passwords must match';
		}

		setErrors(newErrors);
	}, [
		email,
		username,
		firstName,
		lastName,
		address,
		password,
		confirmPassword,
		touched,
	]);

	if (sessionUser) {
		return (
			<Navigate
				to='/'
				replace={true}
			/>
		);
	}

	const handleBlur = (field) => () => {
		setTouched({
			...touched,
			[field]: true,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		// Prevent submission if there are validation errors
		if (Object.keys(errors).length > 0) {
			return;
		}

		const serverResponse = await dispatch(
			thunkSignup({
				first_name: firstName,
				last_name: lastName,
				address,
				email,
				username,
				password,
			})
		);

		if (serverResponse) {
			setErrors(serverResponse);
		} else {
			navigate('/');
		}
	};

	return (
		<div className='signup-form-wrapper'>
			<h1 className='signup-title'>Sign Up</h1>
			{errors.server && <p className='errors-su'>{errors.server}</p>}
			<form
				className='signup-form-structure'
				onSubmit={handleSubmit}
			>
				<div className='su-form-left'>
					<div className='input-wrapper'>
						<label className={email ? 'input-label active' : 'input-label'}>
							Email
						</label>
						<input
							className='signup-input'
							type='text'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							onBlur={handleBlur('email')}
							required
						/>
						{errors.email && <p className='errors-su'>{errors.email}</p>}
					</div>

					<div className='input-wrapper'>
						<label className={firstName ? 'input-label active' : 'input-label'}>
							First Name
						</label>
						<input
							className='signup-input'
							type='text'
							value={firstName}
							onChange={(e) => setFirstName(e.target.value)}
							onBlur={handleBlur('firstName')}
							required
						/>
						{errors.firstName && (
							<p className='errors-su'>{errors.firstName}</p>
						)}
					</div>

					<div className='input-wrapper'>
						<label className={lastName ? 'input-label active' : 'input-label'}>
							Last Name
						</label>
						<input
							className='signup-input'
							type='text'
							value={lastName}
							onChange={(e) => setLastName(e.target.value)}
							onBlur={handleBlur('lastName')}
							required
						/>
						{errors.lastName && <p className='errors-su'>{errors.lastName}</p>}
					</div>

					<div className='input-wrapper'>
						<label className={address ? 'input-label active' : 'input-label'}>
							Address
						</label>
						<input
							className='signup-input'
							type='text'
							value={address}
							onChange={(e) => setAddress(e.target.value)}
							onBlur={handleBlur('address')}
							required
						/>
						{errors.address && <p className='errors-su'>{errors.address}</p>}
					</div>
				</div>
				<div className='su-form-right'>
					<div className='input-wrapper'>
						<label className={username ? 'input-label active' : 'input-label'}>
							Username
						</label>
						<input
							className='signup-input'
							type='text'
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							onBlur={handleBlur('username')}
							required
						/>
						{errors.username && <p className='errors-su'>{errors.username}</p>}
					</div>

					<div className='input-wrapper'>
						<label className={password ? 'input-label active' : 'input-label'}>
							Password
						</label>
						<input
							className='signup-input'
							type='password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							onBlur={handleBlur('password')}
							required
						/>
						{errors.password && <p className='errors-su'>{errors.password}</p>}
					</div>
					<div className='input-wrapper'>
						<label
							className={confirmPassword ? 'input-label active' : 'input-label'}
						>
							Confirm Password
						</label>
						<input
							className='signup-input'
							type='password'
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							onBlur={handleBlur('confirmPassword')}
							required
						/>

						{errors.confirmPassword && (
							<p className='errors-su'>{errors.confirmPassword}</p>
						)}
					</div>
				</div>
			</form>
			<button
				onClick={handleSubmit}
				type='submit'
			>
				Sign Up
			</button>
		</div>
	);
}

export default SignupFormPage;
