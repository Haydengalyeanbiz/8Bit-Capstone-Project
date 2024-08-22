// * ACTION TYPES
const GET_ALL_LISTINGS = 'listings/GET_ALL_LISTINGS';
const GET_A_LISTING = 'listings/GET_A_LISTING';
const CREATE_NEW_LISTING = 'listings/CREATE_NEW_LISTING';

// *ACTION CREATORS
export const getAllListings = (lisitngs) => {
	return {
		type: GET_ALL_LISTINGS,
		payload: lisitngs,
	};
};

export const getAListing = (listing) => {
	return {
		type: GET_A_LISTING,
		payload: listing,
	};
};

export const createNewListing = (listing) => {
	return {
		type: CREATE_NEW_LISTING,
		payload: listing,
	};
};

// *THUNKS
// ?---------------GET ALL LISTINGS
export const fetchAllListings = () => async (dispatch) => {
	const response = await fetch(`/api/listings`);
	if (response.ok) {
		const listings = await response.json();
		dispatch(getAllListings(listings));
		return listings;
	}
};
// ?---------------GET A LISTING
export const fetchGetListing = (id) => async (dispatch) => {
	const response = await fetch(`/api/listings/${id}`);
	if (response.ok) {
		const listing = await response.json();
		dispatch(getAListing(listing));
		return listing;
	}
};

// ?--------------CREATE A LISTING
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
	selectedListing: {},
};

function listingsReducer(state = initialState, action) {
	switch (action.type) {
		case GET_ALL_LISTINGS:
			return { ...state, AllListings: action.payload };
		case GET_A_LISTING:
			return { ...state, selectedListing: action.payload };
		case CREATE_NEW_LISTING:
			return { ...state, AllListings: [...state.AllListings, action.payload] };
		default:
			return state;
	}
}

export default listingsReducer;
