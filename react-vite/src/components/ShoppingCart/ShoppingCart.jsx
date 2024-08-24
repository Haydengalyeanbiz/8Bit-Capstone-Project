import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCart } from '../../redux/shoppingCart';
import './ShoppingCart.css';

export const ShoppingCart = () => {
	const dispatch = useDispatch();
	const cart = useSelector((state) => state.shoppingCart.cart);
	const user = useSelector((state) => state.session.user);

	useEffect(() => {
		if (user) {
			dispatch(fetchCart(user.id));
		}
	}, [dispatch, user]);

	return (
		<div>
			<h1>Shopping Cart</h1>
			{cart && cart.cart_items.length > 0 ? (
				cart.cart_items.map((item) => (
					<div
						key={item.id}
						className='cart-item'
					>
						<h3>{item.listing.title}</h3>
						<p>Price: ${item.listing.price}</p>
						<p>Quantity: {item.quantity}</p>
						<img
							src={item.listing.image_url}
							alt={item.listing.title}
						/>
						{/* Add functionality to update quantity, remove items, etc. */}
					</div>
				))
			) : (
				<div>
					<p>Your cart is empty.</p>
					<button>Continue Shopping</button>
				</div>
			)}
		</div>
	);
};
