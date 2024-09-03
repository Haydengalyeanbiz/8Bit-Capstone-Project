import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCart } from '../../redux/shoppingCart';
import { useModal } from '../../context/Modal';
import {
	fetchUpdateCartItem,
	fetchRemoveFromCart,
	fetchClearCart,
} from '../../redux/shoppingCart';
import './ShoppingCart.css';
import { ThankYouModal } from '../ThankYouModal/ThankYouModal';

export const ShoppingCart = () => {
	const dispatch = useDispatch();
	const cart = useSelector((state) => state.shoppingCart.cart);
	const user = useSelector((state) => state.session.user);
	const { closeModal, setModalContent } = useModal();

	useEffect(() => {
		if (user) {
			dispatch(fetchCart(user.id));
		}
	}, [dispatch, user]);

	const handleUpdateQuantity = (itemId, quantity) => {
		if (quantity < 1) {
			dispatch(fetchRemoveFromCart(itemId));
		} else {
			dispatch(fetchUpdateCartItem(itemId, quantity));
		}
	};

	const handleRemoveItem = (itemId) => {
		dispatch(fetchRemoveFromCart(itemId));
	};

	// Calculate the total price
	const calculateTotal = () => {
		return cart.cart_items
			.reduce((total, item) => {
				return total + item.listing.price * item.quantity;
			}, 0)
			.toFixed(2); // .toFixed(2) to format the total to two decimal places
	};

	const handlePurchase = () => {
		setModalContent(<ThankYouModal onClose={closeModal} />);

		dispatch(fetchClearCart());
	};

	return (
		<div id='shopping-cart-modal'>
			<div
				id='modal-content'
				className='shopping-cart-holder'
			>
				<button
					className='close-cart-btn'
					onClick={closeModal} // Call closeModal when the button is clicked
				>
					X
				</button>
				{cart && cart.cart_items.length > 0 ? (
					<>
						{cart.cart_items.map((item) => (
							<div
								key={item.id}
								className='cart-item'
							>
								<img
									className='shop-cart-image'
									src={item.listing.image_url}
									alt={item.listing.title}
								/>
								<div className='cart-info'>
									<div className='cart-item-info'>
										<h3>{item.listing.title}</h3>
										<p>Price: ${item.listing.price}</p>
									</div>
									<div className='cart-item-quantity'>
										<button
											className='cart-quantity-btn'
											onClick={() =>
												handleUpdateQuantity(item.id, item.quantity + 1)
											}
										>
											+
										</button>
										<p>{item.quantity}</p>
										<button
											className='cart-quantity-btn'
											onClick={() =>
												handleUpdateQuantity(item.id, item.quantity - 1)
											}
										>
											-
										</button>
									</div>
									<button
										className='remove-item-btn'
										onClick={() => handleRemoveItem(item.id)}
									>
										Remove
									</button>
								</div>
							</div>
						))}
						<div className='cart-total'>
							<h3 className='total-price'>Total: ${calculateTotal()}</h3>
						</div>
						{cart.cart_items.length > 0 && (
							<button
								className='cart-purchase-button'
								onClick={handlePurchase}
							>
								Purchase
							</button>
						)}
					</>
				) : (
					<div>
						<p>Your cart is empty.</p>
						<button onClick={closeModal}>Continue Shopping</button>
					</div>
				)}
			</div>
		</div>
	);
};
