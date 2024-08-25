import { useState } from 'react';
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

	if (sessionUser)
		return (
			<Navigate
				to='/'
				replace={true}
			/>
		);

	const handleSubmit = async (e) => {
		e.preventDefault();

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
	};

	return (
		<div className='login-form-wrapper'>
			<h1 className='login-title'>Log In</h1>
			{errors.length > 0 &&
				errors.map((message) => <p key={message}>{message}</p>)}
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
						required
					/>
				</div>
				{errors.email && <p className='errors'>{errors.email}</p>}
				<div className='input-wrapper'>
					<label className={password ? 'input-label active' : 'input-label'}>
						Password
					</label>
					<input
						className='login-input'
						type='password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</div>
				{errors.password && <p className='errors'>{errors.password}</p>}
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
