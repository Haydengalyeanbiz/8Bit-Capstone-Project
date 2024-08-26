import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './Listings.css';
import { fetchAllListings } from '../../redux/listing';
import { fetchAllCategories } from '../../redux/category';
import { fetchAddToCart } from '../../redux/shoppingCart';

export const Listings = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const user = useSelector((state) => state.session.user);
	const listings = useSelector((state) => state.listings.AllListings);
	const categories = useSelector((state) => state.categories.categories);
	const [selectedCategory, setSelectedCategory] = useState(null);

	useEffect(() => {
		dispatch(fetchAllCategories());
		dispatch(fetchAllListings());
	}, [dispatch]);

	const handleNavigate = (id) => {
		navigate(`/listings/${id}`);
	};

	const handleEdit = (id) => {
		navigate(`/listings/${id}/edit`);
	};

	// const handleDelete = ()

	const handleAddToCart = (listingId) => {
		dispatch(fetchAddToCart(listingId));
	};

	const handleCategoryClick = (category) => {
		setSelectedCategory((prevCategory) =>
			prevCategory === category ? null : category
		);
	};

	const filterListingsByCategory = (listings, selectedCategory) => {
		if (selectedCategory) {
			return listings.filter((listing) =>
				listing.categories.includes(selectedCategory.name)
			);
		}
		return listings;
	};

	const filteredListings = filterListingsByCategory(listings, selectedCategory);
	return (
		<div className='home-listings-cat-wrapper'>
			<div className='category-container'>
				{categories &&
					categories.map((category) => (
						<button
							key={category.id}
							onClick={() => handleCategoryClick(category)}
							className={
								selectedCategory === category
									? 'category-button active'
									: 'category-button'
							}
						>
							{category.name}
						</button>
					))}
			</div>
			<div className='listing-container'>
				{filteredListings && filteredListings.length > 0 ? (
					filteredListings.map((listing) => {
						const isOwner = user && user.id === listing.user_id;
						return (
							<div
								className='listing-structure'
								key={listing.id}
								onClick={() => handleNavigate(listing.id)}
							>
								<h2 className='listing-title'>{listing.title}</h2>

								<img
									className='listing-image'
									src={listing.image_url}
									alt={listing.title}
								/>
								<div>
									<div className='listing-categories'>
										{listing.categories && listing.categories.length > 0 ? (
											listing.categories.map((category, index) => (
												<p
													key={index}
													className='listing-category'
												>
													{category}
												</p>
											))
										) : (
											<span className='listing-no-category'>No categories</span>
										)}
									</div>
									<div
										className='listing-footer-container'
										onClick={(e) => e.stopPropagation()}
									>
										<p className='listing-price'>${listing.price}</p>
										{isOwner ? (
											<>
												<button
													onClick={() =>
														handleEdit(`/listings/${listing.id}/edit`)
													}
												>
													Edit Listing
												</button>
												<button>Delete Listing</button>
											</>
										) : (
											<button onClick={() => handleAddToCart(listing.id)}>
												Add to cart
											</button>
										)}
									</div>
								</div>
							</div>
						);
					})
				) : (
					<p>No listings available.</p>
				)}
			</div>
		</div>
	);
};
