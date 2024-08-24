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

// ? --------------ADD TO CART-----------------
export const fetchAddToCart =
	(listingId, quantity = 1) =>
	async (dispatch) => {
		const response = await fetch(`/api/carts/add`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ listing_id: listingId, quantity }),
		});

		if (response.ok) {
			const newItem = await response.json();
			dispatch(addToCart(newItem));
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

const initialState = { cart: null };

export default function cartReducer(state = initialState, action) {
	switch (action.type) {
		case GET_CART:
			return { ...state, cart: action.payload };
		case ADD_TO_CART:
			return {
				...state,
				cart: {
					...state.cart,
					cart_items: [...state.cart.cart_items, action.payload],
				},
			};
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
