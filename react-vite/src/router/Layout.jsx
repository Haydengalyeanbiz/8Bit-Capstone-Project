import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ModalProvider, Modal } from '../context/Modal';
import { thunkAuthenticate } from '../redux/session';
import Navigation from '../components/Navigation/Navigation';

export default function Layout() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [isLoaded, setIsLoaded] = useState(false);
	const sessionUser = useSelector((state) => state.session.user);
	const [isScrolled, setIsScrolled] = useState(false);

	useEffect(() => {
		dispatch(thunkAuthenticate()).then(() => setIsLoaded(true));
	}, [dispatch]);

	useEffect(() => {
		if (isLoaded && !sessionUser) {
			navigate('/login');
		}
	}, [isLoaded, sessionUser, navigate]);

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 50) {
				setIsScrolled(true);
			} else {
				setIsScrolled(false);
			}
		};

		window.addEventListener('scroll', handleScroll);
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	return (
		<>
			<ModalProvider>
				<Navigation isScrolled={isScrolled} />
				<div className='main-content'>{isLoaded && <Outlet />}</div>
				<Modal />
			</ModalProvider>
		</>
	);
}
