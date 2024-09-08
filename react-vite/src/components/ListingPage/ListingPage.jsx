import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { fetchGetListing, fetchDeleteListing } from '../../redux/listing';
import { fetchReviews } from '../../redux/reviews';
import { FaRegHeart, FaHeart } from 'react-icons/fa6';
import { FaStar } from 'react-icons/fa';
import {
	fetchAddToWishlist,
	fetchDeleteFromWishlist,
	fetchUserWishlist,
} from '../../redux/wishlist';
import { fetchAddToCart } from '../../redux/shoppingCart';
import { useModal } from '../../context/Modal';
import DeleteListingModal from '../DeleteListingModal/DeleteListingModal';
import './ListingPage.css';
import ReviewWhole from '../ReviewWhole/ReviewWhole';

export const ListingPage = () => {
	const { id } = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const listing = useSelector((state) => state.listings.selectedListing);
	const reviews = useSelector((state) => state.reviews.listingReviews);
	const sessionUser = useSelector((state) => state.session.user);
	const wishlist = useSelector((state) => state.wishlist.items || []);
	const [isInWishlist, setIsInWishlist] = useState(false);

	const { setModalContent, closeModal } = useModal();

	useEffect(() => {
		window.scrollTo(0, 0);
		dispatch(fetchGetListing(id));
		dispatch(fetchReviews(id));
		dispatch(fetchUserWishlist(sessionUser.id));
	}, [dispatch, id, sessionUser.id]);

	useEffect(() => {
		if (listing?.id && wishlist.length > 0) {
			const isListed = wishlist.some((item) => item.listing_id === listing.id);
			setIsInWishlist(isListed);
		}
	}, [listing?.id, wishlist]);

	const handleToggleWishlist = async () => {
		if (isInWishlist) {
			const wishlistItem = wishlist.find(
				(item) => item.listing_id === listing.id
			);
			if (wishlistItem) {
				await dispatch(fetchDeleteFromWishlist(wishlistItem.id));
				setIsInWishlist(false); // Update the state immediately
			}
		} else {
			const result = await dispatch(fetchAddToWishlist(listing));
			if (result) {
				setIsInWishlist(true); // Update the state immediately
			}
		}
	};

	const calculateAverageRating = (reviews) => {
		if (reviews.length === 0) return null;
		const totalRating = reviews.reduce(
			(total, review) => total + review.rating,
			0
		);
		return (totalRating / reviews.length).toFixed(1);
	};

	const averageRating = calculateAverageRating(reviews);

	const isOwner = sessionUser && sessionUser.id === listing?.user_id;

	const handleEdit = () => {
		navigate(`/listings/${id}/edit`);
	};

	const handleDelete = () => {
		setModalContent(
			<DeleteListingModal
				show={true}
				onConfirm={() => {
					dispatch(fetchDeleteListing(id));
					closeModal();
					navigate('/');
				}}
				onCancel={closeModal}
			/>
		);
	};

	const handleAddToCart = () => {
		dispatch(fetchAddToCart(listing.id));
	};

	if (!listing) {
		return <div>Loading...</div>;
	}

	const pageVariants = {
		initial: {
			opacity: 0,
		},
		in: {
			opacity: 1,
		},
		out: {
			opacity: 0,
		},
	};

	return (
		<motion.div
			className='whole-listing-page'
			initial='initial'
			animate='in'
			exit='out'
			variants={pageVariants}
			transition={{ duration: 0.5 }}
		>
			<div className='listing-p-wrapper'>
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
					<h1 className='listing-p-title'>{listing.title}</h1>
					<div className='half-listing-text'>
						<p className='list-p-description'>{listing.description}</p>
						{reviews.length > 0 ? (
							<div className='list-info-review-box'>
								<p className='average-star-list'>
									<FaStar /> {averageRating}
								</p>
								<p className='reviews-length'>{reviews.length} reviews</p>
							</div>
						) : (
							<p className='no-reviews'>No reviews</p>
						)}
						<p className='listing-seller'>Sold by {listing.username}</p>
					</div>
					<div className='other-half-listing-text'>
						<p className='listing-price-detail'>${listing.price}</p>

						{isOwner ? (
							<div className='edit-btns-container'>
								<button
									className='list-btn edit'
									onClick={handleEdit}
								>
									Edit Listing
								</button>
								<button
									className='list-btn delete'
									onClick={handleDelete}
								>
									Delete Listing
								</button>
							</div>
						) : (
							<div className='wish-add-btns'>
								<button
									onClick={handleToggleWishlist}
									className='wishlist-toggle-btn'
								>
									{isInWishlist ? <FaHeart /> : <FaRegHeart />}
								</button>
								<button
									className='edit list-btn'
									onClick={handleAddToCart}
								>
									Add to cart
								</button>
							</div>
						)}
					</div>
				</div>
			</div>
			<ReviewWhole
				reviews={reviews}
				listingId={id}
				isOwner={isOwner}
			/>
		</motion.div>
	);
};

export default ListingPage;
