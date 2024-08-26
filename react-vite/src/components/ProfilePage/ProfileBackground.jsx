import '../Carousel/Carousel.css';

export const ProfileBackground = () => {
	return (
		<div className='carousel-container'>
			<div className='carousel-overlay'>
				<img
					className='profile-background-image'
					src='/images/gameroom.webp'
					alt='pixel art gameroom'
				/>
			</div>
		</div>
	);
};
