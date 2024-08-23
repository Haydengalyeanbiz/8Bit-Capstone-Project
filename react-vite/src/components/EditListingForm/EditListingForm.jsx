import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUpdateListing, fetchGetListing } from '../../redux/listing';
import { useParams, useNavigate } from 'react-router-dom';
import '../ListingForm/ListingForm.css'; // Reuse styles

export const EditListingForm = () => {
	const { id } = useParams(); // Get listing ID from the URL
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const listing = useSelector((state) => state.listings.selectedListing); // Assuming you have this in your store

	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [price, setPrice] = useState('');
	const [quantity, setQuantity] = useState('');
	const [image, setImage] = useState(null);
	const [imagePreview, setImagePreview] = useState(null);
	// const [selectedCategories, setSelectedCategories] = useState([]);
	// const [formErrors, setFormErrors] = useState({});
	// const [touched, setTouched] = useState({
	// 	title: false,
	// 	description: false,
	// 	price: false,
	// 	quantity: false,
	// 	image: false,
	// });

	// Fetch the listing data when the component mounts
	useEffect(() => {
		dispatch(fetchGetListing(id));
	}, [dispatch, id]);

	// Populate form fields once the listing data is fetched
	useEffect(() => {
		if (listing) {
			setTitle(listing.title || '');
			setDescription(listing.description || '');
			setPrice(listing.price || '');
			setQuantity(listing.quantity || '');
			setImagePreview(listing.image_url || '');
			setImage(listing.image_url || '');
			// setSelectedCategories(listing.categories || []);
		}
	}, [listing]);

	// Handle category change
	// const handleCategoryChange = (e) => {
	// 	const selectedValue = parseInt(e.target.value, 10);
	// 	setSelectedCategories((prevSelectedCategories) =>
	// 		prevSelectedCategories.includes(selectedValue)
	// 			? prevSelectedCategories.filter((id) => id !== selectedValue)
	// 			: [...prevSelectedCategories, selectedValue]
	// 	);
	// };

	// Handle form submission
	const handleSubmit = async (e) => {
		e.preventDefault();

		const formData = new FormData();
		formData.append('title', title);
		formData.append('description', description);
		formData.append('price', price);
		formData.append('quantity', quantity);

		// Check if the user has selected a new image
		if (image) {
			formData.append('image', image);
		} else {
			formData.append('image_url', listing.image_url); // Keep the current image if not updated
		}

		const response = await dispatch(fetchUpdateListing(id, formData));

		if (!response.errors) {
			navigate(`/listings/${id}`);
		}
	};

	// Add a check to ensure listing data is loaded before rendering the form
	if (!listing) {
		return <div>Loading...</div>;
	}

	return (
		<div className='form-holder'>
			<form
				className='listing-form'
				onSubmit={handleSubmit}
				encType='multipart/form-data'
			>
				<div className='listing-form-input-holder'>
					<div className='listing-inputs'>
						<label>
							<input
								className='listing-input-field'
								placeholder='Listing Title'
								type='text'
								value={title}
								onChange={(e) => setTitle(e.target.value)}
								required
							/>
						</label>
						<label>
							<textarea
								className='listing-input-field-text'
								placeholder='Listing Description'
								value={description}
								onChange={(e) => setDescription(e.target.value)}
								required
							/>
						</label>
						<label>
							<input
								className='listing-input-field'
								placeholder='Price'
								type='number'
								step='0.01'
								value={price}
								onChange={(e) => setPrice(e.target.value)}
								required
							/>
						</label>
						<label>
							<input
								className='listing-input-field'
								placeholder='Quantity'
								type='number'
								value={quantity}
								onChange={(e) => setQuantity(e.target.value)}
								required
							/>
						</label>

						{/* Hardcoded categories input */}
						{/* <label>
							<div className='listing-input-field-select'>
								<label>
									<input
										type='checkbox'
										value={1}
										checked={selectedCategories.includes(1)}
										onChange={handleCategoryChange}
									/>
									Games
								</label>
								<label>
									<input
										type='checkbox'
										value={2}
										checked={selectedCategories.includes(2)}
										onChange={handleCategoryChange}
									/>
									Xbox
								</label>
								<label>
									<input
										type='checkbox'
										value={3}
										checked={selectedCategories.includes(3)}
										onChange={handleCategoryChange}
									/>
									PlayStation
								</label>
								<label>
									<input
										type='checkbox'
										value={4}
										checked={selectedCategories.includes(4)}
										onChange={handleCategoryChange}
									/>
									Nintendo
								</label>
								<label>
									<input
										type='checkbox'
										value={5}
										checked={selectedCategories.includes(5)}
										onChange={handleCategoryChange}
									/>
									PC
								</label>
								<label>
									<input
										type='checkbox'
										value={6}
										checked={selectedCategories.includes(6)}
										onChange={handleCategoryChange}
									/>
									Accessories
								</label>
								<label>
									<input
										type='checkbox'
										value={7}
										checked={selectedCategories.includes(7)}
										onChange={handleCategoryChange}
									/>
									Console
								</label>
							</div>
						</label> */}
					</div>
					<button
						className='listing-submit-btn'
						type='submit'
					>
						Update Listing
					</button>
				</div>
				<div className='listing-form-image-holder'>
					<div className='image-preview'>
						<img
							className='listing-image'
							placeholder='Upload now!'
							src={imagePreview}
							alt='Preview'
						/>
					</div>
					<label>
						<input
							className='listing-input-field-photo'
							type='file'
							accept='image/*'
							// onChange={handleImageChange}
						/>
					</label>
				</div>
			</form>
		</div>
	);
};

export default EditListingForm;
