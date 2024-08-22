import { createBrowserRouter } from 'react-router-dom';
// import LoginFormPage from '../components/LoginFormPage';
// import SignupFormPage from '../components/SignupFormPage';
import { Listings } from '../components/Listings/Listings';
// import { ListingForm } from '../components/ListingForm/ListingForm';
import Layout from './Layout';
import { HomeNU } from '../components/HomeNU.jsx/HomeNU';

export const router = createBrowserRouter([
	{
		element: <Layout />,
		children: [
			{
				path: '/',
				element: <Listings />,
			},
			{
				path: '*',
				element: <HomeNU />, // Redirect all other paths to login if not authenticated
			},
		],
	},
]);
