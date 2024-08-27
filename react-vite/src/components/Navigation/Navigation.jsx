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
	const cart = useSelector((state) => state.shoppingCart.cart.cart_items);

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
				<h2
					className='logo'
					onClick={() => handleClick()}
				>
					8Bit
				</h2>
				{user && (
					<div className='nav-bar-btns'>
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
				)}
			</div>
		</div>
	);
}

export default Navigation;
