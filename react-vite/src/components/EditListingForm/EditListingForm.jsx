import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUpdateListing, fetchGetListing } from '../../redux/listing';
import { fetchAllCategories } from '../../redux/category';
import { useParams, useNavigate } from 'react-router-dom';
import '../ListingForm/ListingForm.css'; // Reuse styles

export const EditListingForm = () => {
	const { id } = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const listing = useSelector((state) => state.listings.selectedListing);
	const categories = useSelector((state) => state.categories.categories);

	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [price, setPrice] = useState('');
	const [quantity, setQuantity] = useState('');
	const [image_url, setImageUrl] = useState(null);
	const [imagePreview, setImagePreview] = useState(null);
	const [selectedCategories, setSelectedCategories] = useState([]);

	useEffect(() => {
		dispatch(fetchAllCategories());
		dispatch(fetchGetListing(id));
	}, [dispatch, id]);

	useEffect(() => {
		if (listing) {
			setTitle(listing.title || '');
			setDescription(listing.description || '');
			setPrice(listing.price || '');
			setQuantity(listing.quantity || '');
			setImagePreview(listing.image_url || '');

			if (listing.categories && Array.isArray(listing.categories)) {
				const selectedCategoryIds = categories
					.filter((cat) => listing.categories.includes(cat.name))
					.map((cat) => cat.id);

				setSelectedCategories(selectedCategoryIds);
			} else {
				setSelectedCategories([]);
			}
		}
	}, [listing, categories]);

	const handleCategoryChange = (e) => {
		const selectedValue = parseInt(e.target.value, 10);
		setSelectedCategories((prevSelectedCategories) =>
			prevSelectedCategories.includes(selectedValue)
				? prevSelectedCategories.filter((id) => id !== selectedValue)
				: [...prevSelectedCategories, selectedValue]
		);
	};

	// Handle form submission
	const handleSubmit = async (e) => {
		e.preventDefault();

		const formData = new FormData();
		formData.append('title', title);
		formData.append('description', description);
		formData.append('price', price);
		formData.append('quantity', quantity);

		if (image_url) {
			formData.append('image_url', image_url);
		}

		selectedCategories.forEach((category) => {
			formData.append('categories', category);
		});

		const response = await dispatch(fetchUpdateListing(id, formData));

		if (!response.errors) {
			navigate(`/listings/${id}`);
		}
	};

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
					<h2>Edit your listing</h2>
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
							onChange={(e) => setImageUrl(e.target.files[0])}
						/>
					</label>
				</div>
			</form>
		</div>
	);
};

export default EditListingForm;
