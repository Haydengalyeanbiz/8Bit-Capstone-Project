import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './Listings.css';
import { fetchAllListings, fetchDeleteListing } from '../../redux/listing';
import { fetchAllCategories } from '../../redux/category';
import { fetchAddToCart } from '../../redux/shoppingCart';
import DeleteListingModal from '../DeleteListingModal/DeleteListingModal';
import { useModal } from '../../context/Modal';

export const Listings = () => {
	const { setModalContent, closeModal } = useModal();
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

	const handleDelete = (id) => {
		setModalContent(
			<DeleteListingModal
				show={true}
				onConfirm={() => {
					dispatch(fetchDeleteListing(id));
					closeModal();
					navigate('/');
				}}
				onCancel={closeModal}
			/>
		);
	};

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
								<div className='listing-footer-info'>
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
										{!isOwner && <p>${listing.price}</p>}
										{isOwner ? (
											<>
												<button
													className='list-btn edit'
													onClick={() => handleEdit(listing.id)}
												>
													Edit Listing
												</button>
												<button
													className='list-btn delete'
													onClick={(e) => {
														e.stopPropagation();
														handleDelete(listing.id);
													}}
												>
													Delete Listing
												</button>
											</>
										) : (
											<button
												className='add-to-cart-listing '
												onClick={() => handleAddToCart(listing.id)}
											>
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
