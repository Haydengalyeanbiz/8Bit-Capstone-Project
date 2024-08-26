import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchUpdateReview } from '../../redux/reviews';
import { fetchUserReviews } from '../../redux/profileActions';
import '../ReviewFormModal/ReviewFormModal.css';
import { FaStar } from 'react-icons/fa';
import { useModal } from '../../context/Modal';

const EditReviewFormModal = ({ review }) => {
	const dispatch = useDispatch();
	const { closeModal } = useModal();
	const [rating, setRating] = useState(review.rating);
	const [hover, setHover] = useState(review.rating);
	const [comment, setComment] = useState(review.comment);
	const [formErrors, setFormErrors] = useState({});
	const [hasSubmitted, setHasSubmitted] = useState(false);

	useEffect(() => {
		const validateForm = () => {
			const newErrors = {};
			if (rating < 1) {
				newErrors.rating = 'Must choose between 1 to 5 stars!';
			}
			if (comment.length < 10 || comment.length > 200) {
				newErrors.comment = 'Must write between 10 to 200 characters!';
			}
			setFormErrors(newErrors);
		};

		validateForm();
	}, [rating, comment]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setHasSubmitted(true);

		if (Object.keys(formErrors).length === 0) {
			const formData = {
				rating,
				comment,
			};

			const result = await dispatch(fetchUpdateReview(review.id, formData)); //

			// Check for errors in the response
			if (result.errors) {
				console.log('Server Errors:', result.errors);
				setFormErrors(result.errors);
			} else {
				closeModal();
				setRating(0);
				setComment('');
				dispatch(fetchUserReviews(review.user_id));
			}
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className='review-form'
		>
			<h2>Edit Your Review</h2>
			<div className='star-rating'>
				{[...Array(5)].map((_, index) => {
					const ratingValue = index + 1;

					return (
						<label key={index}>
							<input
								type='radio'
								name='rating'
								value={ratingValue}
								onClick={() => setRating(ratingValue)}
								style={{ display: 'none' }} // Hide the radio buttons
							/>
							<FaStar
								className='star'
								color={ratingValue <= (hover || rating) ? '#207df0' : '#e4e5e9'}
								size={30}
								onMouseEnter={() => setHover(ratingValue)}
								onMouseLeave={() => setHover(0)}
							/>
						</label>
					);
				})}
			</div>
			{hasSubmitted && formErrors.rating && (
				<p className='error'>{formErrors.rating}</p>
			)}
			<div className='form-group'>
				<label htmlFor='comment'>Comment:</label>
				<textarea
					id='comment'
					value={comment}
					onChange={(e) => setComment(e.target.value)}
					required
				/>
				{hasSubmitted && formErrors.comment && (
					<p className='error'>{formErrors.comment}</p>
				)}
			</div>
			<button
				type='submit'
				className='submit-btn'
			>
				Update Review
			</button>
		</form>
	);
};

export default EditReviewFormModal;
