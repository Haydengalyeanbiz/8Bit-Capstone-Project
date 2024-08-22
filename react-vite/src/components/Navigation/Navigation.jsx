import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import { FaShoppingCart } from 'react-icons/fa';
import './Navigation.css';

function Navigation({ isScrolled }) {
	const navigate = useNavigate();
	const user = useSelector((state) => state.session.user);
	const handleClick = () => {
		if (user) {
			navigate('/');
		}
	};
	return (
		<div className={`nav-bar ${isScrolled ? 'scrolled' : ''}`}>
			<h2
				className='logo'
				onClick={() => handleClick()}
			>
				8Bit
			</h2>
			{user && (
				<div className='nav-bar-btns'>
					<ProfileButton />
					<button>
						<FaShoppingCart />
					</button>
				</div>
			)}
		</div>
	);
}

export default Navigation;
