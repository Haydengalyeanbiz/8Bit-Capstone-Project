import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGetListing, fetchDeleteListing } from '../../redux/listing';
import { fetchReviews } from '../../redux/reviews';
import { FaRegHeart, FaHeart } from 'react-icons/fa6';
import {
	fetchAddToWishlist,
	fetchDeleteFromWishlist,
	fetchUserWishlist, // Assuming you have this action to fetch the wishlist
} from '../../redux/wishlist';
import './ListingPage.css';
import ReviewWhole from '../ReviewWhole/ReviewWhole';

export const ListingPage = () => {
	const { id } = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const listing = useSelector((state) => state.listings.selectedListing);
	const reviews = useSelector((state) => state.reviews.listingReviews);
	const sessionUser = useSelector((state) => state.session.user);
	const wishlist = useSelector((state) => state.wishlist.items);
	const [isInWishlist, setIsInWishlist] = useState(false);

	// Fetch listing and reviews once on component mount
	useEffect(() => {
		dispatch(fetchGetListing(id));
		dispatch(fetchReviews(id));
	}, [dispatch, id]);

	useEffect(() => {
		if (listing?.id) {
			const isListed = wishlist.some((item) => item.listing_id === listing.id);
			if (isListed !== isInWishlist) {
				setIsInWishlist(isListed);
			}
		}
	}, [listing?.id, wishlist, isInWishlist]);

	const handleToggleWishlist = async () => {
		if (isInWishlist) {
			const wishlistItem = wishlist.find(
				(item) => item.listing_id === listing.id
			);
			if (wishlistItem) {
				await dispatch(fetchDeleteFromWishlist(wishlistItem.id));
				await dispatch(fetchUserWishlist()); // Re-fetch the wishlist to update the state
			}
		} else {
			await dispatch(fetchAddToWishlist(listing));
			await dispatch(fetchUserWishlist()); // Re-fetch the wishlist to update the state
		}
	};

	const calculateAverageRating = (reviews) => {
		if (reviews.length === 0) return null;

		const totalRating = reviews.reduce(
			(total, review) => total + review.rating,
			0
		);
		const averageRating = (totalRating / reviews.length).toFixed(1);

		return averageRating;
	};

	const averageRating = calculateAverageRating(reviews);

	const isOwner = sessionUser && sessionUser.id === listing?.user_id;

	const handleEdit = () => {
		navigate(`/listings/${id}/edit`);
	};

	const handleDelete = () => {
		dispatch(fetchDeleteListing(id));
		navigate('/'); // Navigate to home or any other page after deletion
	};

	if (!listing) {
		return <div>Loading...</div>;
	}

	return (
		<div className='whole-listing-page'>
			<div className='listing-p-wrapper'>
				<h1 className='listing-p-title'>{listing.title}</h1>
				<div className='listing-p-image-container'>
					{listing.image_url && (
						<img
							className='listing-p-image'
							src={listing.image_url}
							alt={listing.title}
						/>
					)}
				</div>
				<div className='listing-p-text-container'>
					<div className='half-listing-text'>
						<p>{listing.description}</p>
						{averageRating && <p>Average Rating: {averageRating} / 5</p>}
					</div>
					<div>
						<button
							onClick={handleToggleWishlist}
							className='wishlist-toggle-btn'
						>
							{isInWishlist ? <FaHeart /> : <FaRegHeart />}
						</button>
						{isOwner ? (
							<>
								<button onClick={handleEdit}>Edit Listing</button>
								<button onClick={handleDelete}>Delete Listing</button>
							</>
						) : (
							<button>Add to cart</button>
						)}
					</div>
				</div>
			</div>
			<ReviewWhole
				reviews={reviews}
				listingId={id}
				isOwner={isOwner}
			/>
		</div>
	);
};

export default ListingPage;
