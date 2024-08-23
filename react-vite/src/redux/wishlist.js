// // * ACTION TYPES
// const GET_USER_WISHLIST = 'wishlist/GET_USER_WISHLIST';
// const ADD_USER_WISHLIST = 'wishlist/ADD_USER_WISHLIST';
// const DELETE_USER_WISHLIST = 'wish/DELETE_USER_WISHLIST';

// // * ACTION CREATORS

// const getWishlist = (wishlist) => {
// 	return {
// 		type: GET_USER_WISHLIST,
// 		payload: wishlist,
// 	};
// };

// const addToWishlist = (item) => {
// 	return {
// 		type: ADD_USER_WISHLIST,
// 		payload: item,
// 	};
// };

// const deleteFromWishlist = (item) => {
// 	return {
// 		type: DELETE_USER_WISHLIST,
// 		payload: item,
// 	};
// };

// // ?-------------------THUNKS------------------

// // ? --------------GET WISHLIST-----------------
// export const fetchUserWishlist = (id) => async (dispatch) => {
// 	const response = await fetch(`/api/wishlists/${id}`);
// };
