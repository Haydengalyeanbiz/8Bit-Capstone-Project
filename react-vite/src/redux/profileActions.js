// In your redux/profileActions.js (or wherever your Redux actions are)
export const fetchUserListings = (userId) => async (dispatch) => {
	const response = await fetch(`/api/listings/user/${userId}`);
	if (response.ok) {
		const listings = await response.json();
		dispatch({
			type: 'SET_USER_LISTINGS',
			payload: listings,
		});
	}
};

export const fetchUserReviews = (userId) => async (dispatch) => {
	const response = await fetch(`/api/reviews/user/${userId}`);
	if (response.ok) {
		const reviews = await response.json();
		dispatch({
			type: 'SET_USER_REVIEWS',
			payload: reviews,
		});
	}
};

const initialState = {
	userListings: [],
	userReviews: [],
};

export default function profileReducer(state = initialState, action) {
	switch (action.type) {
		case 'SET_USER_LISTINGS':
			return {
				...state,
				userListings: action.payload,
			};
		case 'SET_USER_REVIEWS':
			return {
				...state,
				userReviews: action.payload,
			};
		default:
			return state;
	}
}
