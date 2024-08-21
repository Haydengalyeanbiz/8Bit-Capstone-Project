import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import { Listings } from '../components/Listings/Listings';
import Layout from './Layout';

export const router = createBrowserRouter([
	{
		element: <Layout />,
		children: [
			{
				path: '/',
				element: <h1>Welcome!</h1>,
			},
			{
				path: 'login',
				element: <LoginFormPage />,
			},
			{
				path: 'signup',
				element: <SignupFormPage />,
			},
			{
				path: 'listings',
				element: <Listings />,
			},
		],
	},
]);
