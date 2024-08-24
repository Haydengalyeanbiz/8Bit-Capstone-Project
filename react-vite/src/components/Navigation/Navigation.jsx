import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaShoppingCart } from 'react-icons/fa';
import { FaUserCircle } from 'react-icons/fa';
import { thunkLogout } from '../../redux/session';
import './Navigation.css';
import { useModal } from '../../context/Modal'; // Adjust the path as needed
import { ShoppingCart } from '../ShoppingCart/ShoppingCart';

function Navigation({ isScrolled }) {
	const { setModalContent } = useModal();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const user = useSelector((state) => state.session.user);
	const handleClick = () => {
		if (user) {
			navigate('/');
		}
	};

	const handleProfile = (id) => {
		if (user) {
			navigate(`/profile/${id}`);
		}
	};

	const handleCartClick = () => {
		setModalContent(<ShoppingCart />);
	};
	const logout = (e) => {
		e.preventDefault();
		dispatch(thunkLogout());
		navigate('/');
	};

	return (
		<div className={`nav-bar ${isScrolled ? 'scrolled' : ''}`}>
			<div className='navbar-content'>
				{user && (
					<div>
						<input
							type='search'
							name='search'
							id='searchbar'
						/>
						<button></button>
					</div>
				)}
				<h2
					className='logo'
					onClick={() => handleClick()}
				>
					8Bit
				</h2>
				{user && (
					<div className='nav-bar-btns'>
						<button
							className='profile-btn'
							onClick={() => handleProfile(user.id)}
						>
							<FaUserCircle />
						</button>
						<button
							className='shopping-btn'
							onClick={handleCartClick}
						>
							<FaShoppingCart />
						</button>
						<button onClick={logout}>Log Out</button>
					</div>
				)}
			</div>
		</div>
	);
}

export default Navigation;
