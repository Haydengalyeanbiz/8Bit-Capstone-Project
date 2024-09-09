import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './Listings.css';
import { motion } from 'framer-motion';
import {
	fetchAllListings,
	fetchDeleteListing,
	fetchGetListing,
} from '../../redux/listing';
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
	const [isClicked, setIsClicked] = useState(false);
	const [clickedButtonId, setClickedButtonId] = useState(null);

	useEffect(() => {
		dispatch(fetchAllCategories());
		dispatch(fetchAllListings());
	}, [dispatch]);

	const handleNavigate = (id) => {
		dispatch(fetchGetListing(id));
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
		setIsClicked(!isClicked);
		setClickedButtonId(category.id);
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

	const listingVariants = {
		hidden: { opacity: 0 },
		visible: { opacity: 1 },
		hoverOn: { y: -20, transition: { duration: 0.1 } },
		hoverOff: { y: 0, transition: { duration: 0.1 } },
	};

	const categoryVariants = {
		hidden: { y: 80, opacity: 0 },
		visible: { y: 0, opacity: 1 },
	};

	const boxVariants = {
		initial: { rotate: 0 },
		clicked: { rotate: 360 },
	};

	return (
		<div className='home-listings-cat-wrapper'>
			<motion.div
				className='category-container'
				initial='hidden'
				whileInView='visible'
				viewport={{ once: true }}
				transition={{ duration: 0.2, delay: 0.2 }}
				variants={categoryVariants}
			>
				{categories &&
					categories.map((category) => (
						<motion.button
							key={category.id}
							onClick={() => handleCategoryClick(category)}
							animate={clickedButtonId === category.id ? 'clicked' : 'initial'}
							transition={{ duration: 0.5 }}
							variants={boxVariants}
							initial='initial'
							className={
								selectedCategory === category
									? 'category-button active'
									: 'category-button'
							}
						>
							{category.name}
						</motion.button>
					))}
			</motion.div>
			<div className='listing-container'>
				{filteredListings && filteredListings.length > 0 ? (
					filteredListings.map((listing) => {
						const isOwner = user && user.id === listing.user_id;

						return (
							<motion.div
								className='listing-structure'
								key={listing.id}
								onClick={() => handleNavigate(listing.id)}
								whileHover='hoverOn'
								initial='hidden'
								animate='visible'
								viewport={{ once: true, amount: 0.15 }}
								transition={{ duration: 0.1, delay: 0.1 }}
								variants={listingVariants}
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
							</motion.div>
						);
					})
				) : (
					<p>No listings available.</p>
				)}
			</div>
		</div>
	);
};
