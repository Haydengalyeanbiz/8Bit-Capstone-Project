// * ACTION TYPES
const GET_ALL_LISTINGS = 'listings/GET_ALL_LISTINGS';
const CREATE_NEW_LISTING = 'listings/CREATE_NEW_LISTING';

// *ACTION CREATORS
export const getAllListings = (lisitngs) => {
	return {
		type: GET_ALL_LISTINGS,
		payload: lisitngs,
	};
};

export const createNewListing = (listing) => {
	return {
		type: CREATE_NEW_LISTING,
		payload: listing,
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

export const fetchAddListing = (formData) => async (dispatch) => {
	try {
		const response = await fetch('/api/listings/new', {
			method: 'POST',
			body: formData,
		});

		if (response.ok) {
			const newListing = await response.json();
			dispatch(createNewListing(newListing));
			return newListing;
		} else {
			const errorText = await response.json();
			return { errors: errorText };
		}
	} catch (error) {
		console.error('Error submitting the listing:', error);
		return { errors: 'An unexpected error occurred' };
	}
};

const initialState = {
	AllListings: [],
};

function listingsReducer(state = initialState, action) {
	switch (action.type) {
		case GET_ALL_LISTINGS:
			return { ...state, AllListings: action.payload };
		case CREATE_NEW_LISTING:
			return { ...state, AllListings: [...state.AllListings, action.payload] };
		default:
			return state;
	}
}

export default listingsReducer;
