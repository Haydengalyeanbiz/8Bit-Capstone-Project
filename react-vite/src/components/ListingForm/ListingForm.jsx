import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchAddListing } from '../../redux/listing';
import './ListingForm.css';

export const ListingForm = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [price, setPrice] = useState('');
	const [quantity, setQuantity] = useState('');
	const [image, setImage] = useState(null);
	const [imagePreview, setImagePreview] = useState('/images/image-preview.png');
	const [imageLoading, setImageLoading] = useState(false);
	const [formErrors, setFormErrors] = useState({});
	const [selectedCategories, setSelectedCategories] = useState([]);
	const [hasSubmitted, setHasSubmitted] = useState(false);

	const [touched, setTouched] = useState({
		title: false,
		description: false,
		price: false,
		quantity: false,
		image: false,
		categories: false,
	});

	// Custom validation logic
	useEffect(() => {
		const errors = {};

		// Validate title
		if (title.length < 5 || title.length > 100) {
			errors.title = 'Title must be between 5 and 20 characters.';
		}

		// Validate description
		if (description.length < 20 || description.length > 500) {
			errors.description = 'Description must be between 20 and 200 characters.';
		}

		// Validate price
		if (price <= 0) {
			errors.price = 'Price must be greater than 0.';
		}

		// Validate quantity
		if (quantity < 1) {
			errors.quantity = 'Quantity must be greater than or equal to 1.';
		}

		// Check if other fields are filled
		if (!title) errors.title = 'Title is required.';
		if (!description) errors.description = 'Description is required.';
		if (!price) errors.price = 'Price is required.';
		if (!quantity) errors.quantity = 'Stock amount is required.';

		if (selectedCategories.length === 0)
			errors.categories = 'At least one category is required.';

		setFormErrors(errors);
	}, [title, description, price, quantity, image, selectedCategories]);

	const handleBlur = (field) => {
		setTouched((prevState) => ({
			...prevState,
			[field]: true,
		}));
	};

	const handleImageChange = (e) => {
		const file = e.target.files[0];
		setImage(file);
		setImagePreview(URL.createObjectURL(file));
	};

	const handleCategoryChange = (e) => {
		const selectedValue = parseInt(e.target.value);
		setSelectedCategories((prevSelectedCategories) =>
			prevSelectedCategories.includes(selectedValue)
				? prevSelectedCategories.filter((id) => id !== selectedValue)
				: [...prevSelectedCategories, selectedValue]
		);

		setTouched((prevState) => ({
			...prevState,
			categories: true,
		}));
	};

	const handleSubmit = async (e) => {
		setHasSubmitted(true);
		e.preventDefault();

		const errors = {};

		// Validate title
		if (title.length < 5 || title.length > 100) {
			errors.title = 'Title must be between 5 and 20 characters.';
		}

		// Validate description
		if (description.length < 20 || description.length > 500) {
			errors.description = 'Description must be between 20 and 200 characters.';
		}

		// Validate price
		if (price <= 0) {
			errors.price = 'Price must be greater than 0.';
		}

		// Validate quantity
		if (quantity < 1) {
			errors.quantity = 'Quantity must be greater than or equal to 1.';
		}

		// Validate image
		if (!image) {
			errors.image = 'Image is required.';
		}

		// Validate categories
		if (selectedCategories.length === 0) {
			errors.categories = 'At least one category is required.';
		}

		// Set form errors state
		setFormErrors(errors);

		// Check if there are any errors
		if (Object.keys(errors).length > 0) {
			// Prevent submission if there are validation errors
			return;
		}

		// Proceed with submission if no errors
		const formData = new FormData();
		formData.append('title', title);
		formData.append('description', description);
		formData.append('price', price);
		formData.append('quantity', quantity);
		formData.append('image', image);
		selectedCategories.forEach((category) => {
			formData.append('categories', category);
		});

		setImageLoading(true);
		const response = await dispatch(fetchAddListing(formData));
		setImageLoading(false);

		if (response.errors) {
			setFormErrors(response.errors);
		} else {
			setTitle('');
			setDescription('');
			setPrice('');
			setQuantity('');
			setImage(null);
			setImagePreview(null);
			setSelectedCategories([]);
			setFormErrors({});
			setTouched({
				title: false,
				description: false,
				price: false,
				quantity: false,
				image: false,
				categories: false,
			});
			navigate(`/listings/${response.id}`);
		}
	};

	return (
		<div className='form-holder'>
			<form
				className='listing-form'
				onSubmit={handleSubmit}
				encType='multipart/form-data'
			>
				<div className='listing-form-input-holder'>
					<h2>Add a new Listing</h2>
					<div className='listing-inputs'>
						<div className='left-input-div'>
							<label className='listing-label-div'>
								Lisiting Title
								<input
									className='listing-input-field'
									placeholder='PlayStation controller'
									type='text'
									value={title}
									onChange={(e) => setTitle(e.target.value)}
									onBlur={() => handleBlur('title')}
									required
								/>
								{touched.title && formErrors.title && (
									<p className='error'>{formErrors.title}</p>
								)}
							</label>
							<label className='listing-label-div-description'>
								Listing Description
								<textarea
									className='listing-input-field-text'
									placeholder='A brand new PlayStation controller'
									value={description}
									onChange={(e) => setDescription(e.target.value)}
									onBlur={() => handleBlur('description')}
									required
								/>
								{touched.description && formErrors.description && (
									<p className='error'>{formErrors.description}</p>
								)}
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
									onBlur={() => handleBlur('price')}
									required
								/>
								{touched.price && formErrors.price && (
									<p className='error'>{formErrors.price}</p>
								)}
							</label>
							<label className='listing-label-div'>
								Stock
								<input
									className='listing-input-field'
									placeholder='In Stock amount'
									type='number'
									value={quantity}
									onChange={(e) => setQuantity(e.target.value)}
									onBlur={() => handleBlur('quantity')}
									required
								/>
								{touched.quantity && formErrors.quantity && (
									<p className='error'>{formErrors.quantity}</p>
								)}
							</label>
						</div>
						<div>
							<label> Categories</label>
							<label>
								<div className='listing-input-field-select'>
									<label>
										<input
											type='checkbox'
											value='1'
											checked={selectedCategories.includes(1)}
											onChange={handleCategoryChange}
										/>
										Games
									</label>
									<label>
										<input
											type='checkbox'
											value='2'
											checked={selectedCategories.includes(2)}
											onChange={handleCategoryChange}
										/>
										Xbox
									</label>
									<label>
										<input
											type='checkbox'
											value='3'
											checked={selectedCategories.includes(3)}
											onChange={handleCategoryChange}
										/>
										PlayStation
									</label>
									<label>
										<input
											type='checkbox'
											value='4'
											checked={selectedCategories.includes(4)}
											onChange={handleCategoryChange}
										/>
										Nintendo
									</label>
									<label>
										<input
											type='checkbox'
											value='5'
											checked={selectedCategories.includes(5)}
											onChange={handleCategoryChange}
										/>
										PC
									</label>
									<label>
										<input
											type='checkbox'
											value='6'
											checked={selectedCategories.includes(6)}
											onChange={handleCategoryChange}
										/>
										Accessories
									</label>
									<label>
										<input
											type='checkbox'
											value='7'
											checked={selectedCategories.includes(7)}
											onChange={handleCategoryChange}
										/>
										Console
									</label>
								</div>
								{hasSubmitted && formErrors.categories && (
									<p className='error'>{formErrors.categories}</p>
								)}
							</label>
						</div>
					</div>
					<button
						className='listing-submit-btn'
						type='submit'
					>
						Create Post
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
							onChange={handleImageChange}
							onBlur={() => handleBlur('image')}
							required
						/>
						{touched.image && formErrors.image && (
							<p className='error'>{formErrors.image}</p>
						)}
						{imageLoading && <p>Loading...</p>}
					</label>
				</div>
			</form>
		</div>
	);
};

export default ListingForm;
