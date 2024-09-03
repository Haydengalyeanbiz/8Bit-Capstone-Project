import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	fetchUserWishlist,
	fetchDeleteFromWishlist,
} from '../../redux/wishlist';
import { useParams } from 'react-router-dom';
import './Wishlist.css';

export const Wishlist = () => {
	const dispatch = useDispatch();
	const { id } = useParams();
	const wishlist = useSelector((state) => state.wishlist.items);

	useEffect(() => {
		dispatch(fetchUserWishlist(id));
	}, [dispatch, id]);

	const removeWishItem = (id) => {
		dispatch(fetchDeleteFromWishlist(id));
	};

	return (
		<div className='wishlist-wrapper'>
			<div className='wishlist-grid'>
				{wishlist && wishlist.length > 0 ? (
					wishlist.map((item) => (
						<div
							key={item.id}
							className='wishlist-item'
						>
							<div>
								<h3>{item.listing.title}</h3>
								<p>{item.listing.description}</p>
							</div>
							<img
								className='wishlist-image'
								src={item.listing.image_url}
								alt={item.listing.title}
							/>
							<div>
								<p>Price: ${item.listing.price}</p>
								<button onClick={() => removeWishItem(item.id)}>Remove</button>
							</div>
						</div>
					))
				) : (
					<p>Your wishlist is empty.</p>
				)}
			</div>
		</div>
	);
};
