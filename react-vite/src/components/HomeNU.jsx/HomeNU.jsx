import { useState } from 'react';
import LoginFormPage from '../LoginFormPage';
import SignupFormPage from '../SignupFormPage';
import './HomeNU.css';

export const HomeNU = () => {
	const [selected, setSelected] = useState('login');
	return (
		<div className='login-main-holder'>
			<img
				className='login-image right'
				src='/images/controller.png'
				alt='pair of headphones'
			/>
			<img
				className='login-image left'
				src='/images/Gaming-Headset-Transparent.png'
				alt='pair of headphones'
			/>
			<div className='login-forms-container'>
				<h1>Welcome to 8bit</h1>
				<p>log-in now, or sign up!</p>
				<div className='login-btns-container'>
					<button onClick={() => setSelected('login')}>Login</button>
					<button onClick={() => setSelected('signup')}>Sign Up</button>
				</div>

				<div>
					{selected === 'login' && <LoginFormPage />}
					{selected === 'signup' && <SignupFormPage />}
				</div>
			</div>
		</div>
	);
};
