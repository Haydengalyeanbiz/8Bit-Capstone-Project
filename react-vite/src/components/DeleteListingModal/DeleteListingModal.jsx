import './DeleteListingModal.css';

const DeleteListingModal = ({ show, onConfirm, onCancel }) => {
	if (!show) return null;

	return (
		<div className='modal-overlay'>
			<div className='modal-container'>
				<h2>Are you sure you want to delete your listing?</h2>
				<div className='modal-buttons'>
					<button
						className='modal-button cancel'
						onClick={onCancel}
					>
						Cancel
					</button>
					<button
						className='modal-button confirm'
						onClick={onConfirm}
					>
						Delete
					</button>
				</div>
			</div>
		</div>
	);
};

export default DeleteListingModal;
