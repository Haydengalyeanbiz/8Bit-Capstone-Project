import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	fetchUserWishlist,
	fetchDeleteFromWishlist,
} from '../../redux/wishlist';
import { useParams } from 'react-router-dom';
// import './Wishlist.css';

export const Wishlist = () => {
	const dispatch = useDispatch();
	const { id } = useParams();
	const wishlist = useSelector((state) => state.wishlist.wishlist);

	useEffect(() => {
		dispatch(fetchUserWishlist(id));
	}, [dispatch, id]);

	const removeWishItem = (id) => {
		dispatch(fetchDeleteFromWishlist(id));
	};

	return (
		<div>
			<h2>Your Wishlist</h2>
			{wishlist && wishlist.length > 0 ? (
				wishlist.map((item) => (
					<div
						key={item.id}
						className='wishlist-item'
					>
						<h3>{item.listing.title}</h3>
						<p>{item.listing.description}</p>
						<img
							src={item.listing.image_url}
							alt={item.listing.title}
						/>
						<p>Price: ${item.listing.price}</p>
						{/* Add any additional actions for wishlist items here */}
						<button onClick={() => removeWishItem(item.id)}>remove</button>
					</div>
				))
			) : (
				<p>Your wishlist is empty.</p>
			)}
		</div>
	);
};
