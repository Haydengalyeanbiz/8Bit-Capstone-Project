import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGetListing, fetchDeleteListing } from '../../redux/listing';
import { fetchReviews } from '../../redux/reviews';
import { AddToWishlist } from '../AddToWishlist/AddToWishlist';
import './ListingPage.css';
import ReviewWhole from '../ReviewWhole/ReviewWhole';

export const ListingPage = () => {
	const { id } = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate(); // Use navigate for redirection
	const listing = useSelector((state) => state.listings.selectedListing);
	const reviews = useSelector((state) => state.reviews.listingReviews);
	const sessionUser = useSelector((state) => state.session.user);

	useEffect(() => {
		dispatch(fetchGetListing(id));
		dispatch(fetchReviews(id));
	}, [id, dispatch]);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

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

	const isOwner = sessionUser && sessionUser.id === listing.user_id;

	const handleEdit = () => {
		navigate(`/listings/${id}/edit`);
	};

	const handleDelete = () => {
		dispatch(fetchDeleteListing(id));
		navigate('/'); // Navigate to home or any other page after deletion
	};

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
						<AddToWishlist listing={listing} />
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
