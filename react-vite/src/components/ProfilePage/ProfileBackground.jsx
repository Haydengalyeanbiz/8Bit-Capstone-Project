import '../Carousel/Carousel.css';

export const ProfileBackground = () => {
	return (
		<div className='carousel-container'>
			<div className='carousel-overlay'>
				<img
					className='profile-background-image'
					src='/images/main-background.gif'
					alt='pixel art gameroom'
				/>
			</div>
		</div>
	);
};
