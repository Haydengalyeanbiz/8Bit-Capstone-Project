import { useSelector } from 'react-redux';
import { FaStar } from 'react-icons/fa';
import './ReviewWhole.css';

export const ReviewWhole = ({ reviews }) => {
	if (!reviews || reviews.length === 0) {
		return <p>No reviews available.</p>;
	}

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
		</div>
	);
};
