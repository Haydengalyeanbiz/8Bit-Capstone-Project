import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGetListing } from '../../redux/listing';
import { fetchReviews } from '../../redux/reviews'; // Import the thunk to fetch reviews
import { FaRegHeart } from 'react-icons/fa6';
import './ListingPage.css';
import { ReviewWhole } from '../ReviewWhole/ReviewWhole';

export const ListingPage = () => {
	const { id } = useParams();
	const dispatch = useDispatch();
	const listing = useSelector((state) => state.listings.selectedListing);
	const reviews = useSelector((state) => state.reviews.listingReviews); // Get reviews from Redux state

	useEffect(() => {
		dispatch(fetchGetListing(id));
		dispatch(fetchReviews(id)); // Fetch reviews when the page loads
	}, [id, dispatch]);

	return (
		<div className='whole-listing-page'>
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
					<p>{listing.description}</p>
					<div>
						<button className='listing-heart-btn'>
							<FaRegHeart />
						</button>
						<button>Add to cart</button>
					</div>
				</div>
			</div>
			<ReviewWhole reviews={reviews} />{' '}
		</div>
	);
};
