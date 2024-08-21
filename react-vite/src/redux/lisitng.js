// * ACTION TYPES
const GET_ALL_LISTINGS = 'listings/GET_ALL_LISTINGS';

// *ACTION CREATORS
export const getAllListings = (lisitngs) => {
	return {
		type: GET_ALL_LISTINGS,
		payload: lisitngs,
	};
};

// *THUNKS

export const fetchAllListings = () => async (dispatch) => {
	const response = await fetch(`/api/listings`);
	if (response.ok) {
		const listings = await response.json();
		dispatch(getAllListings(listings));
		return listings;
	}
};

const initialState = {
	AllListings: [],
};

function listingsReducer(state = initialState, action) {
	switch (action.type) {
		case GET_ALL_LISTINGS:
			return { ...state, AllListings: action.payload };
		default:
			return state;
	}
}

export default listingsReducer;
