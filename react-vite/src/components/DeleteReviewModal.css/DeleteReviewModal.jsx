import './DeleteReviewModal.css';

const DeleteReviewModal = ({ onConfirm, onCancel }) => {
	return (
		<div className='delete-review-modal'>
			<h2>Are you sure you want to delete your review?</h2>
			<div className='modal-actions'>
				<button
					className='confirm-btn'
					onClick={onConfirm}
				>
					Yes, Delete
				</button>
				<button
					className='cancel-btn'
					onClick={onCancel}
				>
					Cancel
				</button>
			</div>
		</div>
	);
};

export default DeleteReviewModal;
