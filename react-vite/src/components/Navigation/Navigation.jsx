import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaShoppingCart, FaUserCircle, FaBars } from 'react-icons/fa';
import { thunkLogout } from '../../redux/session';
import './Navigation.css';
import { useModal } from '../../context/Modal'; // Adjust the path as needed
import { ShoppingCart } from '../ShoppingCart/ShoppingCart';
import { clearSelected } from '../../redux/listing';

function Navigation({ isScrolled }) {
	const { setModalContent } = useModal();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const user = useSelector((state) => state.session.user);
	const cart = useSelector((state) => state.shoppingCart.cart.cart_items);
	const [menuOpen, setMenuOpen] = useState(false);

	const handleClick = () => {
		if (user) {
			dispatch(clearSelected());
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
		setMenuOpen(false);
	};
	const logout = (e) => {
		e.preventDefault();
		dispatch(thunkLogout());
		navigate('/');
	};

	const toggleMenu = () => {
		setMenuOpen((prev) => !prev);
	};

	return (
		<div className={`nav-bar ${isScrolled ? 'scrolled' : ''}`}>
			<div className='navbar-content'>
				<h2
					className='logo'
					onClick={handleClick}
				>
					8Bit
				</h2>
				{user && (
					<>
						<button
							className='hamburger-btn'
							onClick={toggleMenu}
						>
							<FaBars />
						</button>
						<div className={`nav-bar-btns ${menuOpen ? 'open' : ''}`}>
							<button onClick={logout}>Log Out</button>
							<button
								className='profile-btn'
								onClick={() => handleProfile(user.id)}
							>
								<FaUserCircle />
							</button>
							<div className='nav-cart-holder'>
								<button
									className='shopping-btn'
									onClick={handleCartClick}
								>
									<FaShoppingCart />
								</button>
								{cart.length > 0 && <p>{cart.length}</p>}
							</div>
						</div>
					</>
				)}
			</div>
		</div>
	);
}

export default Navigation;
