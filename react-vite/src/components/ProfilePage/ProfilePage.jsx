// import { useEffect, useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import {
// 	fetchUserListings,
// 	fetchUserReviews,
// } from '../../redux/profileActions';
// import { fetchUpdateListing, fetchDeleteListing } from '../../redux/listing';

// export const ProfilePage = () => {
// 	const dispatch = useDispatch();
// 	const navigate = useNavigate();
// 	const sessionUser = useSelector((state) => state.session.user);
// 	const userListings = useSelector(
// 		(state) => state.profile.userListings.listings
// 	);
// 	const userReviews = useSelector((state) => state.profile.userReviews.reviews);
// 	const [showListings, setShowListings] = useState(true);

// 	useEffect(() => {
// 		if (sessionUser) {
// 			dispatch(fetchUserListings(sessionUser.id));
// 			dispatch(fetchUserReviews(sessionUser.id));
// 		}
// 	}, [dispatch, sessionUser]);

// 	const handleShowListings = () => setShowListings(true);
// 	const handleShowReviews = () => setShowListings(false);

// 	const handleNewList = () => {
// 		navigate;
// 	};

// 	const handleEditListing = (id) => {};

// 	const handleDeleteListing = (id) => {
// 		if (window.confirm('Are you sure you want to delete this listing?')) {
// 			dispatch(fetchDeleteListing(id));
// 		}
// 	};

// 	// const handleEditReview = (id) => {
// 	// 	// Logic to handle review edit, possibly opening a modal or navigating to an edit page
// 	// 	console.log('Edit review with id:', id);
// 	// 	// dispatch(editReview(id)); // Uncomment when the editReview action is available
// 	// };

// 	// const handleDeleteReview = (id) => {
// 	// 	if (window.confirm('Are you sure you want to delete this review?')) {
// 	// 		dispatch(deleteReview(id));
// 	// 	}
// 	// };

// 	return (
// 		<div>
// 			<h1>Welcome {sessionUser.first_name} to your dashboard</h1>

// 			<div>
// 				<button onClick={handleShowListings}>Your Listings</button>
// 				<button onClick={handleNewList}>Add new listing!</button>
// 				<button onClick={handleShowReviews}>Your Reviews</button>
// 			</div>

// 			{showListings ? (
// 				<section>
// 					<h2>Your Listings</h2>
// 					{userListings && userListings.length > 0 ? (
// 						userListings.map((listing) => (
// 							<div key={listing.id}>
// 								<h3>{listing.title}</h3>
// 								<p>{listing.description}</p>
// 								<img
// 									src={listing.image_url}
// 									alt={listing.title}
// 								/>
// 								<p>Price: ${listing.price}</p>
// 								<button onClick={() => handleEditListing(listing.id)}>
// 									Edit
// 								</button>
// 								<button onClick={() => handleDeleteListing(listing.id)}>
// 									Delete
// 								</button>
// 							</div>
// 						))
// 					) : (
// 						<p>No listings found.</p>
// 					)}
// 				</section>
// 			) : (
// 				<section>
// 					<h2>Your Reviews</h2>
// 					{userReviews && userReviews.length > 0 ? (
// 						userReviews.map((review) => (
// 							<div key={review.id}>
// 								<h3>Review for {review.listingTitle}</h3>
// 								<p>Rating: {review.rating}</p>
// 								<p>{review.comment}</p>
// 								<button onClick={() => handleEditReview(review.id)}>
// 									Edit
// 								</button>
// 								<button onClick={() => handleDeleteReview(review.id)}>
// 									Delete
// 								</button>
// 							</div>
// 						))
// 					) : (
// 						<p>No reviews found.</p>
// 					)}
// 				</section>
// 			)}
// 		</div>
// 	);
// };
