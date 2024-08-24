import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserWishlist } from '../../redux/wishlistActions'; // Assume you have this action
import './Wishlist.css';

export const Wishlist = () => {
	const dispatch = useDispatch();
	const wishlist = useSelector((state) => state.wishlist.listings);

	useEffect(() => {
		dispatch(fetchUserWishlist());
	}, [dispatch]);

	return (
		<div>
			<h2>Your Wishlist</h2>
			{wishlist && wishlist.length > 0 ? (
				wishlist.map((listing) => (
					<div
						key={listing.id}
						className='wishlist-item'
					>
						<h3>{listing.title}</h3>
						<p>{listing.description}</p>
						<img
							src={listing.image_url}
							alt={listing.title}
						/>
						<p>Price: ${listing.price}</p>
						{/* Add any additional actions for wishlist items here */}
					</div>
				))
			) : (
				<p>Your wishlist is empty.</p>
			)}
		</div>
	);
};
