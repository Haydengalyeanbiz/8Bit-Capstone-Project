import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
	fetchUserListings,
	fetchUserReviews,
} from '../../redux/profileActions';
import { fetchDeleteListing } from '../../redux/listing';
import { fetchDeleteReview } from '../../redux/reviews';
import { useModal } from '../../context/Modal';
import EditReviewFormModal from '../EditReviewFormModal/EditReviewFormModal';
import { Wishlist } from '../Wishlist/Wishlist';
import { ProfileBackground } from './ProfileBackground';
import './ProfilePage.css';

export const ProfilePage = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { setModalContent } = useModal();
	const sessionUser = useSelector((state) => state.session.user);
	const userListings = useSelector(
		(state) => state.profile.userListings.listings
	);
	const userReviews = useSelector((state) => state.profile.userReviews.reviews);
	const [view, setView] = useState('listings'); // Change to manage multiple views

	useEffect(() => {
		if (sessionUser) {
			dispatch(fetchUserListings(sessionUser.id));
			dispatch(fetchUserReviews(sessionUser.id));
		}
	}, [dispatch, sessionUser]);

	const handleNewList = () => {
		navigate('/listings/new');
	};

	const handleEditListing = (id) => {
		navigate(`/listings/${id}/edit`);
	};

	const handleDeleteListing = (id) => {
		dispatch(fetchDeleteListing(id)).then(() => {
			dispatch(fetchUserListings(sessionUser.id));
		});
	};

	const handleEditReview = (review) => {
		setModalContent(<EditReviewFormModal review={review} />);
	};

	const handleDeleteReview = (id) => {
		dispatch(fetchDeleteReview(id)).then(() => {
			dispatch(fetchUserReviews(sessionUser.id));
		});
	};

	return (
		<div>
			<ProfileBackground />
			<div className='profile-page-masthead'>
				<h1>Welcome {sessionUser.first_name} to your GameRoom!</h1>
			</div>
			<div className='button-group'>
				<button onClick={handleNewList}>Add New Listing</button>
				<button
					className={`toggle-btn ${view === 'listings' ? 'selected' : ''}`}
					onClick={() => setView('listings')}
				>
					Your Listings
				</button>
				<button
					className={`toggle-btn ${view === 'reviews' ? 'selected' : ''}`}
					onClick={() => setView('reviews')}
				>
					Your Reviews
				</button>
				<button
					className={`toggle-btn ${view === 'wishlist' ? 'selected' : ''}`}
					onClick={() => setView('wishlist')}
				>
					Your Wishlist
				</button>
			</div>
			{view === 'listings' && (
				<section>
					<h2>Your Listings</h2>
					{userListings && userListings.length > 0 ? (
						userListings.map((listing) => (
							<div key={listing.id}>
								<h3>{listing.title}</h3>
								<p>{listing.description}</p>
								<img
									src={listing.image_url}
									alt={listing.title}
								/>
								<p>Price: ${listing.price}</p>
								<button onClick={() => handleEditListing(listing.id)}>
									Edit
								</button>
								<button onClick={() => handleDeleteListing(listing.id)}>
									Delete
								</button>
							</div>
						))
					) : (
						<p>No listings found.</p>
					)}
				</section>
			)}
			{view === 'reviews' && (
				<section>
					<h2>Your Reviews</h2>
					{userReviews && userReviews.length > 0 ? (
						userReviews.map((review) => (
							<div key={review.id}>
								<h3>Review for {review.listing_title}</h3>
								<p>Rating: {review.rating}</p>
								<p>{review.comment}</p>
								<p>{review.created_at}</p>
								<button onClick={() => handleEditReview(review)}>Edit</button>
								<button onClick={() => handleDeleteReview(review.id)}>
									Delete
								</button>
							</div>
						))
					) : (
						<p>No reviews found.</p>
					)}
				</section>
			)}
			{view === 'wishlist' && <Wishlist />}{' '}
		</div>
	);
};
