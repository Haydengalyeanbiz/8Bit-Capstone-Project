import { useEffect, useState } from 'react';
import { FaRegHeart, FaHeart } from 'react-icons/fa6';
import {
	fetchAddToWishlist,
	fetchDeleteFromWishlist,
} from '../../redux/wishlist';
import { useDispatch, useSelector } from 'react-redux';

export const AddToWishlist = ({ listing }) => {
	const dispatch = useDispatch();
	const wishlist = useSelector((state) => state.wishlist.wishlist);
	const [isInWishlist, setIsInWishlist] = useState(false);

	// Check if the listing is already in the wishlist
	useEffect(() => {
		if (wishlist) {
			const isListed = wishlist.some((item) => item.listing_id === listing.id);
			setIsInWishlist(isListed);
		}
	}, [wishlist, listing.id]);

	const handleToggleWishlist = () => {
		if (isInWishlist) {
			// Remove from wishlist
			const wishlistItem = wishlist.find(
				(item) => item.listing_id === listing.id
			);
			console.log('THIS IS WISHLIST ITEM', wishlistItem);
			if (wishlistItem) {
				dispatch(fetchDeleteFromWishlist(wishlistItem.id));
			}
		} else {
			// Add to wishlist
			dispatch(fetchAddToWishlist(listing));
		}
	};

	return (
		<button
			onClick={handleToggleWishlist}
			className='listing-heart-btn'
		>
			{isInWishlist ? <FaHeart /> : <FaRegHeart />}
		</button>
	);
};
