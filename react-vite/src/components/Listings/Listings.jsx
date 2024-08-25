import { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllListings } from '../../redux/listing';
import './Listings.css';
import { AddToWishlist } from '../AddToWishlist/AddToWishlist';
import { fetchAddToCart } from '../../redux/shoppingCart';

export const Listings = () => {
	// const navigate = useNavigate();
	const dispatch = useDispatch();
	const listings = useSelector((state) => state.listings.AllListings);

	useEffect(() => {
		dispatch(fetchAllListings());
	}, [dispatch]);

	// const handleNavigate = (id) => {
	// 	navigate(`/listings/${id}`);
	// };

	const handleAddToCart = (listingId) => {
		dispatch(fetchAddToCart(listingId));
	};

	return (
		<div className='listing-container'>
			{listings && listings.length > 0 ? (
				listings.map((listing) => (
					<div
						// onClick={() => handleNavigate(listing.id)}
						className='listing-structure border-gradient'
						key={listing.id}
					>
						<div>
							<h2 className='listing-title'>{listing.title}</h2>
							<AddToWishlist listing={listing} />
						</div>
						<p className='listing-description'>{listing.description}</p>

						<img
							className='listing-image'
							src={listing.image_url}
							alt={listing.title}
						/>
						<div className='listing-categories'>
							{listing.categories && listing.categories.length > 0 ? (
								listing.categories.map((category, index) => (
									<span
										key={index}
										className='listing-category'
									>
										{category}
									</span>
								))
							) : (
								<span className='listing-no-category'>No categories</span>
							)}
						</div>
						<div className='listing-'>
							<p className='listing-price'>${listing.price} - USD</p>
							<button
								onClick={() => handleAddToCart(listing.id)}
								className='add-to-cart-listing'
							>
								Add to cart
							</button>
						</div>
					</div>
				))
			) : (
				<p>No listings available.</p>
			)}
		</div>
	);
};
