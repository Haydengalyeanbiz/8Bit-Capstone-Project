import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUpdateListing, fetchGetListing } from '../../redux/listing';
import { fetchAllCategories } from '../../redux/category';
import { useParams, useNavigate } from 'react-router-dom';
import '../ListingForm/ListingForm.css'; // Reuse styles

export const EditListingForm = () => {
	const { id } = useParams(); // Get listing ID from the URL
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const listing = useSelector((state) => state.listings.selectedListing);
	const categories = useSelector((state) => state.categories.categories);
	console.log('THIS IS THE CATEGORIES=========>', categories);

	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [price, setPrice] = useState('');
	const [quantity, setQuantity] = useState('');
	const [image_url, setImageUrl] = useState(null);
	const [imagePreview, setImagePreview] = useState(null);
	const [selectedCategories, setSelectedCategories] = useState([]);

	// Fetch the listing data when the component mounts
	useEffect(() => {
		dispatch(fetchAllCategories());
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

			// Map category names to IDs
			if (listing.categories && Array.isArray(listing.categories)) {
				const selectedCategoryIds = categories
					.filter((cat) => listing.categories.includes(cat.name))
					.map((cat) => cat.id);

				setSelectedCategories(selectedCategoryIds);
			} else {
				setSelectedCategories([]); // Set to empty array if no categories exist
			}
		}
	}, [listing, categories]);

	// Handle category change
	const handleCategoryChange = (e) => {
		const selectedValue = parseInt(e.target.value, 10);
		setSelectedCategories((prevSelectedCategories) =>
			prevSelectedCategories.includes(selectedValue)
				? prevSelectedCategories.filter((id) => id !== selectedValue)
				: [...prevSelectedCategories, selectedValue]
		);
		console.log('THIS IS SELECTED VALUE', selectedValue);
	};
	console.log('THIS IS SELECTED CATEGORIES!', selectedCategories);
	// Handle form submission
	const handleSubmit = async (e) => {
		e.preventDefault();

		const formData = new FormData();
		formData.append('title', title);
		formData.append('description', description);
		formData.append('price', price);
		formData.append('quantity', quantity);

		// Check if the user has selected a new image
		if (image_url) {
			formData.append('image_url', image_url); // Use 'image_url' here
		}

		selectedCategories.forEach((category) => {
			formData.append('categories', category);
		});

		const response = await dispatch(fetchUpdateListing(id, formData));

		if (!response.errors) {
			navigate(`/listings/${id}`);
		}
	};

	// Add a check to ensure listing data is loaded before rendering the form
	if (!listing || !categories) {
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
						<div className='left-input-div'>
							<label className='listing-label-div'>
								Listing Title
								<input
									className='listing-input-field'
									placeholder='PlayStation controller'
									type='text'
									value={title}
									onChange={(e) => setTitle(e.target.value)}
									required
								/>
							</label>
							<label className='listing-label-div-description'>
								Listing Description
								<textarea
									className='listing-input-field-text'
									placeholder='A brand new PlayStation controller'
									value={description}
									onChange={(e) => setDescription(e.target.value)}
									required
								/>
							</label>
							<label className='listing-label-div'>
								Price
								<input
									className='listing-input-field'
									placeholder='59.99'
									type='number'
									step='0.01'
									value={price}
									onChange={(e) => setPrice(e.target.value)}
									required
								/>
							</label>
							<label className='listing-label-div'>
								Stock
								<input
									className='listing-input-field'
									placeholder='In Stock amount'
									type='number'
									value={quantity}
									onChange={(e) => setQuantity(e.target.value)}
									required
								/>
							</label>
						</div>

						{/* Categories selection */}
						<div>
							<label> Categories</label>
							<label>
								<div className='listing-input-field-select'>
									{categories.map((category) => (
										<label key={category.id}>
											<input
												type='checkbox'
												value={category.id}
												checked={selectedCategories.includes(category.id)}
												onChange={handleCategoryChange}
											/>
											{category.name}
										</label>
									))}
								</div>
							</label>
						</div>
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
							onChange={(e) => setImageUrl(e.target.files[0])} // Use 'setImageUrl' here
						/>
					</label>
				</div>
			</form>
		</div>
	);
};

export default EditListingForm;
