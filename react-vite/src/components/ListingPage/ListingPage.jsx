import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGetListing } from '../../redux/listing';

export const ListingPage = () => {
	const { id } = useParams();
	const dispatch = useDispatch();
	const listing = useSelector((state) => state.listings.selectedListing);

	useEffect(() => {
		dispatch(fetchGetListing(id));
	}, [id, dispatch]);

	return (
		<div>
			<div>
				{listing.image_url && (
					<img
						src={listing.image_url}
						alt={listing.title}
					/>
				)}
			</div>
			<div>
				<h2>{listing.title}</h2>
			</div>
		</div>
	);
};
