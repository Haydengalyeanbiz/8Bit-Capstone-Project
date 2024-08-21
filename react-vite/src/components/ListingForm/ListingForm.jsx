import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchAddListing } from '../../redux/listing';
import './ListingForm.css';

export const ListingForm = () => {
	const dispatch = useDispatch();
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [price, setPrice] = useState('');
	const [quantity, setQuantity] = useState('');
	const [image, setImage] = useState(null);
	const [imageLoading, setImageLoading] = useState(false);
	const [formErrors, setFormErrors] = useState({});

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (Object.keys(formErrors).length > 0) return;

		const formData = new FormData();
		formData.append('title', title);
		formData.append('description', description);
		formData.append('price', price);
		formData.append('quantity', quantity);
		formData.append('image', image);

		setImageLoading(true);
		const response = await dispatch(fetchAddListing(formData)); // Pass FormData to the thunk
		setImageLoading(false);

		if (response.errors) {
			setFormErrors(response.errors); // Set the form errors from the server
		} else {
			// Optionally, reset the form after successful submission
			setTitle('');
			setDescription('');
			setPrice('');
			setQuantity('');
			setImage(null);
			setFormErrors({}); // Clear any previous errors
		}
	};

	return (
		<div className='form-holder'>
			<h1>Create a new listing!</h1>
			<form
				className='listing-form'
				onSubmit={handleSubmit}
				encType='multipart/form-data'
			>
				<label>
					Listing Title
					<input
						type='text'
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						required
					/>
					{formErrors.title && <p className='error'>{formErrors.title}</p>}
				</label>
				<label>
					Listing Description
					<textarea
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						required
					/>
					{formErrors.description && (
						<p className='error'>{formErrors.description}</p>
					)}
				</label>
				<label>
					Price
					<input
						type='number'
						step='0.01'
						value={price}
						onChange={(e) => setPrice(e.target.value)}
						required
					/>
					{formErrors.price && <p className='error'>{formErrors.price}</p>}
				</label>
				<label>
					Quantity
					<input
						type='number'
						value={quantity}
						onChange={(e) => setQuantity(e.target.value)}
						required
					/>
					{formErrors.quantity && (
						<p className='error'>{formErrors.quantity}</p>
					)}
				</label>
				<label>
					Image
					<input
						type='file'
						accept='image/*'
						onChange={(e) => setImage(e.target.files[0])}
						required
					/>
					{formErrors.image && <p className='error'>{formErrors.image}</p>}
				</label>
				<button type='submit'>Create Post</button>
				{imageLoading && <p>Loading...</p>}
			</form>
		</div>
	);
};

export default ListingForm;
