import { useSelector } from 'react-redux';
import { FaStar } from 'react-icons/fa';
import { useModal } from '../../context/Modal'; // Import useModal hook
import ReviewForm from '../ReviewFormModal/ReviewFormModal'; // Import the ReviewForm component
import './ReviewWhole.css';

export const ReviewWhole = ({ reviews, listingId, isOwner }) => {
	const sessionUser = useSelector((state) => state.session.user);
	const { setModalContent } = useModal(); // Destructure setModalContent from useModal

	const renderStars = (rating) => {
		return (
			<div className='stars-container'>
				{[...Array(5)].map((_, index) => (
					<FaStar
						className='star'
						key={index}
						color={index < rating ? '#207df0' : '#e4e5e9'} // Filled star for ratings, empty star for others
					/>
				))}
			</div>
		);
	};

	const handleOpenReviewModal = () => {
		setModalContent(<ReviewForm listingId={listingId} />);
	};

	return (
		<div>
			{reviews && reviews.length > 0 ? (
				reviews.map((review) => (
					<div
						key={review.id}
						className='review-container'
					>
						<h3>{review.username || 'Anonymous'}</h3>
						<p>{review.comment}</p>
						{renderStars(review.rating)}
					</div>
				))
			) : (
				<p>No reviews yet.</p>
			)}
			{/* Show the 'Leave a Review' button if the user is not the owner */}
			{sessionUser && !isOwner && (
				<button onClick={handleOpenReviewModal}>Leave a Review</button>
			)}
		</div>
	);
};
export default ReviewWhole;
