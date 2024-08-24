// * ACTION TYPES
const GET_USER_WISHLIST = 'wishlist/GET_USER_WISHLIST';
const ADD_USER_WISHLIST = 'wishlist/ADD_USER_WISHLIST';
const DELETE_USER_WISHLIST = 'wish/DELETE_USER_WISHLIST';

// * ACTION CREATORS

const getWishlist = (wishlist) => {
	return {
		type: GET_USER_WISHLIST,
		payload: wishlist,
	};
};

const addToWishlist = (item) => {
	return {
		type: ADD_USER_WISHLIST,
		payload: item,
	};
};

const deleteFromWishlist = (item) => {
	return {
		type: DELETE_USER_WISHLIST,
		payload: item,
	};
};

// ?-------------------THUNKS------------------

// ? --------------GET WISHLIST-----------------
export const fetchUserWishlist = (id) => async (dispatch) => {
	const response = await fetch(`/api/wishlists/${id}`);
	if (response.ok) {
		const wishlist = await response.json();
		dispatch(getWishlist(wishlist));
	}
};

// ? --------------ADD TO WISHLIST-----------------
export const fetchAddToWishlist = (item) => async (dispatch) => {
	const response = await fetch(`/api/wishlists`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(item),
	});

	if (response.ok) {
		const newItem = await response.json();
		dispatch(addToWishlist(newItem));
	}
};

// ? --------------DELETE FROM WISHLIST-----------------
export const fetchDeleteFromWishlist = (itemId) => async (dispatch) => {
	const response = await fetch(`/api/wishlists/${itemId}`, {
		method: 'DELETE',
	});

	if (response.ok) {
		const deletedItem = await response.json();
		dispatch(deleteFromWishlist(deletedItem));
	}
};

// * WISHLIST REDUCER

const initialState = { wishlist: [] };

export default function wishlistReducer(state = initialState, action) {
	switch (action.type) {
		case GET_USER_WISHLIST:
			return { ...state, wishlist: action.payload };
		case ADD_USER_WISHLIST:
			return { ...state, wishlist: [...state.wishlist, action.payload] };
		case DELETE_USER_WISHLIST:
			return {
				...state,
				wishlist: state.wishlist.filter(
					(item) => item.id !== action.payload.id
				),
			};
		default:
			return state;
	}
}
