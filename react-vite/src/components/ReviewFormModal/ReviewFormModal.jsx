import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchCreateReview } from '../../redux/reviews';
// import './ReviewForm.css';
import { FaStar } from 'react-icons/fa';

const ReviewForm = ({ listingId }) => {
	const dispatch = useDispatch();
	const [rating, setRating] = useState(0);
	const [hover, setHover] = useState(0);
	const [comment, setComment] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();

		const formData = {
			rating,
			comment,
		};

		await dispatch(fetchCreateReview(listingId, formData));

		// Reset form fields
		setRating(0);
		setComment('');
	};

	return (
		<form onSubmit={handleSubmit}>
			<div className='star-rating'>
				{[...Array(5)].map((star, index) => {
					const ratingValue = index + 1;

					return (
						<label key={index}>
							<input
								type='radio'
								name='rating'
								value={ratingValue}
								onClick={() => setRating(ratingValue)}
							/>
							<FaStar
								className='star'
								color={ratingValue <= (hover || rating) ? '#ffc107' : '#e4e5e9'}
								size={30}
								onMouseEnter={() => setHover(ratingValue)}
								onMouseLeave={() => setHover(0)}
							/>
						</label>
					);
				})}
			</div>
			<div>
				<label htmlFor='comment'>Comment:</label>
				<textarea
					id='comment'
					value={comment}
					onChange={(e) => setComment(e.target.value)}
					required
				/>
			</div>
			<button type='submit'>Submit Review</button>
		</form>
	);
};

export default ReviewForm;
