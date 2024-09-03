import { useState } from 'react';
import LoginFormPage from '../LoginFormPage';
import { thunkLogin } from '../../redux/session';
import SignupFormPage from '../SignupFormPage';
import { Carousel } from '../Carousel/Carousel';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './HomeNU.css';

export const HomeNU = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [selected, setSelected] = useState('login');
	const handleDemo = () => {
		dispatch(
			thunkLogin({
				email: 'demo@aa.io',
				password: 'password',
			})
		);

		navigate('/');
	};

	return (
		<div className='homenu-wrapper'>
			<Carousel />
			<div className='login-main-holder'>
				<div className='login-forms-container'>
					<div className='login-form-left'>
						<h1 className='homenu-title'>Welcome to 8bit</h1>
						<p>log-in now, or sign up!</p>
						<div className='login-btns-container'>
							<button
								className='homenu-btn'
								onClick={() => setSelected('login')}
							>
								Login
							</button>
							<button
								className='homenu-btn'
								onClick={() => setSelected('signup')}
							>
								Sign Up
							</button>
							<button
								className='homenu-btn'
								onClick={handleDemo}
							>
								Demo-login
							</button>
						</div>
					</div>
					<div>
						{selected === 'login' && <LoginFormPage />}
						{selected === 'signup' && <SignupFormPage />}
					</div>
				</div>
			</div>
		</div>
	);
};
