import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllListings } from '../../redux/lisitng';
import './Listings.css';
import { FaRegHeart } from 'react-icons/fa6';

export const Listings = () => {
	const dispatch = useDispatch();
	const listings = useSelector((state) => state.listings.AllListings);

	useEffect(() => {
		dispatch(fetchAllListings());
	}, [dispatch]);

	return (
		<>
			<div className='listing-container'>
				{listings && listings.length > 0 ? (
					listings.map((listing) => (
						<div
							className='listing-structure'
							key={listing.id}
						>
							<div>
								<h2 className='listing-title'>{listing.title}</h2>
								<button className='listing-heart-btn'>
									<FaRegHeart />
								</button>
							</div>
							<p className='listing-description'>{listing.description}</p>

							<img
								className='listing-image'
								src={listing.image_url}
								alt={listing.title}
							/>
							<div className='listing-'>
								<p className='listing-price'>${listing.price} - USD</p>
								<button className='add-to-cart-listing'>Add to cart</button>
							</div>
						</div>
					))
				) : (
					<p>No listings available.</p>
				)}
			</div>
		</>
	);
};
