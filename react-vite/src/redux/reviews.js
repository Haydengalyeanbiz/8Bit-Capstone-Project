// *ACTION TYPES
const GET_REVIEWS = 'reviews/GET_REVIEWS';
const CREATE_REVIEW = 'reviews/CREATE_REVIEW';
const UPDATE_REVIEW = 'reviews/UPDATE_REVIEW';
const DELETE_REVIEW = 'reviews/DELETE_REVIEW';

// *ACTION CREATORS
export const getReviews = (reviews) => {
	return {
		type: GET_REVIEWS,
		payload: reviews,
	};
};

export const createReview = (review) => {
	return {
		type: CREATE_REVIEW,
		payload: review,
	};
};

export const updateReview = (review) => {
	return {
		type: UPDATE_REVIEW,
		payload: review,
	};
};

export const deleteReview = (reviewId) => {
	return {
		type: DELETE_REVIEW,
		payload: reviewId,
	};
};

// ?---------------GET REVIEWS FOR A LISTING
export const fetchReviews = (listingId) => async (dispatch) => {
	const response = await fetch(`/api/reviews/${listingId}`);
	if (response.ok) {
		const data = await response.json();
		dispatch(getReviews(data.reviews));
		return data.reviews;
	}
};

// ?---------------CREATE REVIEW
export const fetchCreateReview = (listingId, formData) => async (dispatch) => {
	const response = await fetch(`/api/reviews/${listingId}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(formData), // Ensure this is correct
	});

	const data = await response.json();

	if (response.ok) {
		dispatch(createReview(data));
		return data;
	} else {
		console.error('Server Error:', data.errors); // Log errors
		return { errors: data.errors };
	}
};

// ?---------------UPDATE REVIEW
export const fetchUpdateReview = (reviewId, formData) => async (dispatch) => {
	const response = await fetch(`/api/reviews/${reviewId}`, {
		method: 'PUT',
		body: formData,
	});
	if (response.ok) {
		const updatedReview = await response.json();
		dispatch(updateReview(updatedReview));
		return updatedReview;
	} else {
		const errorText = await response.json();
		return { errors: errorText };
	}
};

// ?---------------DELETE REVIEW
export const fetchDeleteReview = (reviewId) => async (dispatch) => {
	const response = await fetch(`/api/reviews/${reviewId}`, {
		method: 'DELETE',
	});
	if (response.ok) {
		dispatch(deleteReview(reviewId));
		return { message: 'Review deleted' };
	} else {
		const errorText = await response.json();
		return { errors: errorText };
	}
};

const initialState = {
	listingReviews: [],
};

function reviewsReducer(state = initialState, action) {
	switch (action.type) {
		case GET_REVIEWS:
			return { ...state, listingReviews: action.payload };
		case CREATE_REVIEW:
			return {
				...state,
				listingReviews: [...state.listingReviews, action.payload],
			};
		case UPDATE_REVIEW:
			return {
				...state,
				listingReviews: state.listingReviews.map((review) =>
					review.id === action.payload.id ? action.payload : review
				),
			};
		case DELETE_REVIEW:
			return {
				...state,
				listingReviews: state.listingReviews.filter(
					(review) => review.id !== action.payload
				),
			};
		default:
			return state;
	}
}

export default reviewsReducer;
