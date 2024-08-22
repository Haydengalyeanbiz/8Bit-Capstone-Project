import { createBrowserRouter } from 'react-router-dom';
import { Home } from '../components/Home/Home';
import Layout from './Layout';
import { HomeNU } from '../components/HomeNU.jsx/HomeNU';
import { ListingPage } from '../components/ListingPage/ListingPage';
import { ListingForm } from '../components/ListingForm/ListingForm';

export const router = createBrowserRouter([
	{
		element: <Layout />,
		children: [
			{
				path: '/',
				element: <Home />,
			},
			{
				path: '/listings/:id',
				element: <ListingPage />, // Redirect all other paths to login if not authenticated
			},
			{
				path: '/listings/new',
				element: <ListingForm />, // Redirect all other paths to login if not authenticated
			},
			{
				path: '*',
				element: <HomeNU />, // Redirect all other paths to login if not authenticated
			},
		],
	},
]);
