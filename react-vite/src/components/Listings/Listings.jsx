import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllListings } from '../../redux/lisitng';
import './Listings.css';

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
							<h2 className='listing-title'>{listing.title}</h2>
							<p className='listing-description'>{listing.description}</p>
							<p className='listing-price'>Price: ${listing.price}</p>
							<img
								className='listing-image'
								src={listing.image_url}
								alt={listing.title}
							/>
						</div>
					))
				) : (
					<p>No listings available.</p>
				)}
			</div>
		</>
	);
};
