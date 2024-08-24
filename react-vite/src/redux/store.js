import {
	legacy_createStore as createStore,
	applyMiddleware,
	compose,
	combineReducers,
} from 'redux';
import thunk from 'redux-thunk';
import sessionReducer from './session';
import listingsReducer from './listing';
import reviewsReducer from './reviews';
import profileReducer from './profileActions';
import wishlistReducer from './wishlist';

const rootReducer = combineReducers({
	session: sessionReducer,
	listings: listingsReducer,
	reviews: reviewsReducer,
	profile: profileReducer,
	wishlist: wishlistReducer,
});

let enhancer;
if (import.meta.env.MODE === 'production') {
	enhancer = applyMiddleware(thunk);
} else {
	const logger = (await import('redux-logger')).default;
	const composeEnhancers =
		window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
	enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
	return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
