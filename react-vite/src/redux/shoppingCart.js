// * ACTION TYPES
const GET_CART = 'cart/GET_CART';
const ADD_TO_CART = 'cart/ADD_TO_CART';
const UPDATE_CART_ITEM = 'cart/UPDATE_CART_ITEM';
const REMOVE_FROM_CART = 'cart/REMOVE_FROM_CART';

// * ACTION CREATORS
const getCart = (cart) => {
	return {
		type: GET_CART,
		payload: cart,
	};
};

const addToCart = (item) => {
	return {
		type: ADD_TO_CART,
		payload: item,
	};
};

const updateCartItem = (item) => {
	return {
		type: UPDATE_CART_ITEM,
		payload: item,
	};
};

const removeFromCart = (itemId) => {
	return {
		type: REMOVE_FROM_CART,
		payload: itemId,
	};
};

// ? --------------GET CART-----------------
export const fetchCart = (id) => async (dispatch) => {
	const response = await fetch(`/api/shopping-cart/${id}`);

	if (response.ok) {
		const cart = await response.json();
		dispatch(getCart(cart));
	} else {
		console.error('Failed to fetch cart:', response.statusText);
	}
};

// ? --------------ADD CART ITEM-----------------
export const fetchAddToCart =
	(listingId, quantity = 1) =>
	async (dispatch, getState) => {
		const state = getState();
		const currentCartItem = state.shoppingCart.cart.cart_items.find(
			(item) => item.listing_id === listingId
		);

		const listing = state.listings.AllListings.find(
			(listing) => listing.id === listingId
		);

		if (!listing) {
			console.error('Listing not found');
			return;
		}

		const availableQuantity = listing.quantity;

		if (
			currentCartItem &&
			currentCartItem.quantity + quantity > availableQuantity
		) {
			console.error('Not enough quantity available');
			return;
		}

		const response = await fetch(`/api/shopping-cart/add`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ listing_id: listingId, quantity }),
		});

		if (response.ok) {
			const updatedCart = await response.json();
			dispatch(addToCart(updatedCart));
		} else {
			console.error('Failed to add to cart:', response.statusText);
		}
	};

// ? --------------UPDATE CART ITEM-----------------
export const fetchUpdateCartItem = (itemId, quantity) => async (dispatch) => {
	const response = await fetch(`/api/shopping-cart/${itemId}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ quantity }),
	});

	if (response.ok) {
		const updatedItem = await response.json();
		dispatch(updateCartItem(updatedItem));
	}
};

// ? --------------REMOVE FROM CART-----------------
export const fetchRemoveFromCart = (itemId) => async (dispatch) => {
	const response = await fetch(`/api/shopping-cart/${itemId}`, {
		method: 'DELETE',
	});

	if (response.ok) {
		dispatch(removeFromCart(itemId));
	}
};

// * CART REDUCER

const initialState = { cart: { cart_items: [] } };

export default function cartReducer(state = initialState, action) {
	switch (action.type) {
		case GET_CART:
			return { ...state, cart: action.payload || { cart_items: [] } };
		case ADD_TO_CART: {
			const updatedCartItems = action.payload.cart_items;

			return {
				...state,
				cart: {
					...state.cart,
					cart_items: updatedCartItems,
				},
			};
		}
		case UPDATE_CART_ITEM:
			return {
				...state,
				cart: {
					...state.cart,
					cart_items: state.cart.cart_items.map((item) =>
						item.id === action.payload.id ? action.payload : item
					),
				},
			};
		case REMOVE_FROM_CART:
			return {
				...state,
				cart: {
					...state.cart,
					cart_items: state.cart.cart_items.filter(
						(item) => item.id !== action.payload
					),
				},
			};
		default:
			return state;
	}
}
