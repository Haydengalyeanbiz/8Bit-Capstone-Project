import './ThankYouModal.css';

export const ThankYouModal = ({ onClose }) => {
	return (
		<div className='thank-you-modal'>
			<div className='thank-you-modal-content'>
				<h2 className='thanks-text'>Thank You!</h2>
				<p className='thanks-text'>Your purchase was successful.</p>
				<button
					className='thank-you-close-btn'
					onClick={onClose}
				>
					Close
				</button>
			</div>
		</div>
	);
};
