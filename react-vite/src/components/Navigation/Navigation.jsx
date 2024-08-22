import { NavLink } from 'react-router-dom';
import ProfileButton from './ProfileButton';
import { FaShoppingCart } from 'react-icons/fa';
import './Navigation.css';

function Navigation() {
	return (
		<div className='nav-bar'>
			<ul>
				<li>
					<NavLink to='/'>Home</NavLink>
				</li>
				<div>
					<li>
						<ProfileButton />
					</li>
					<li>
						<button>
							<FaShoppingCart />
						</button>
					</li>
				</div>
			</ul>
		</div>
	);
}

export default Navigation;
