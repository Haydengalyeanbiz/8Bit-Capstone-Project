import { useSelector, useDispatch } from 'react-redux';
import { FaStar } from 'react-icons/fa';
import { useModal } from '../../context/Modal';
import ReviewForm from '../ReviewFormModal/ReviewFormModal';
import { fetchDeleteReview } from '../../redux/reviews';
import './ReviewWhole.css';

export const ReviewWhole = ({ reviews, listingId, isOwner }) => {
	const dispatch = useDispatch();
	const sessionUser = useSelector((state) => state.session.user);
	const { setModalContent } = useModal(); // Destructure setModalContent from useModal

	const renderStars = (rating) => {
		return (
			<div className='stars-container'>
				{[...Array(5)].map((_, index) => (
					<FaStar
						className='star'
						key={index}
						color={index < rating ? '#207df0' : '#e4e5e9'}
					/>
				))}
			</div>
		);
	};

	const handleOpenReviewModal = () => {
		setModalContent(<ReviewForm listingId={listingId} />);
	};

	const handleDeleteReview = (reviewId) => {
		if (window.confirm('Are you sure you want to delete this review?')) {
			dispatch(fetchDeleteReview(reviewId));
		}
	};

	return (
		<div className='reviews-wrapper'>
			{sessionUser && !isOwner && (
				<button
					className='leave-review-btn'
					onClick={handleOpenReviewModal}
				>
					Leave a Review
				</button>
			)}
			<div className='review-whole-structure'>
				{reviews && reviews.length > 0 ? (
					reviews.map((review) => (
						<div
							key={review.id}
							className='review-container'
						>
							<h3>{review.username || 'Anonymous'}</h3>
							<p>{review.comment}</p>
							{renderStars(review.rating)}
							{sessionUser && sessionUser.id === review.user_id && (
								<div className='review-actions'>
									<button
										className='list-btn edit'
										onClick={() => handleOpenReviewModal(review)}
									>
										Edit
									</button>
									<button
										className='list-btn delete'
										onClick={() => handleDeleteReview(review.id)}
									>
										Delete
									</button>
								</div>
							)}
						</div>
					))
				) : (
					<p>No reviews yet.</p>
				)}
			</div>
		</div>
	);
};
export default ReviewWhole;
