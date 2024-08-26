import { useSelector, useDispatch } from 'react-redux';
import { FaStar } from 'react-icons/fa';
import { useModal } from '../../context/Modal';
import ReviewForm from '../ReviewFormModal/ReviewFormModal';
import EditReviewFormModal from '../EditReviewFormModal/EditReviewFormModal';
import DeleteReviewModal from '../DeleteReviewModal.css/DeleteReviewModal';
import { fetchDeleteReview } from '../../redux/reviews';
import './ReviewWhole.css';

export const ReviewWhole = ({ reviews, listingId, isOwner }) => {
	const dispatch = useDispatch();
	const sessionUser = useSelector((state) => state.session.user);
	const { setModalContent, closeModal } = useModal();
	const hasReviewed = reviews.some(
		(review) => review.user_id === sessionUser?.id
	);

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
		setModalContent(
			<DeleteReviewModal
				onConfirm={() => {
					dispatch(fetchDeleteReview(reviewId));
					closeModal(); // Close the modal after deletion
				}}
				onCancel={closeModal}
			/>
		);
	};

	return (
		<div className='reviews-wrapper'>
			{sessionUser && !isOwner && !hasReviewed && (
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
										onClick={() =>
											setModalContent(<EditReviewFormModal review={review} />)
										}
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
