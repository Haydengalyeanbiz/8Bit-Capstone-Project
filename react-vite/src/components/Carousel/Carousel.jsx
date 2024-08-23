import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './Carousel.css';

const images = [
	'/images/bg1.jpg',
	'/images/bg2.jpg',
	'/images/bg3.jpg',
	'/images/bg4.jpg',
	'/images/bg5.jpg',
];

export const Carousel = () => {
	const [index, setIndex] = useState(0);
	const [isFading, setIsFading] = useState(false);

	useEffect(() => {
		const interval = setInterval(() => {
			setIsFading(true);

			setTimeout(() => {
				setIndex((prevIndex) =>
					prevIndex === images.length - 1 ? 0 : prevIndex + 1
				);
				setIsFading(false);
			}, 1000); // Delay matches the transition duration (1 second)
		}, 5000); // Change every 5 seconds

		return () => clearInterval(interval);
	}, []);

	return (
		<div className='carousel-container'>
			<div className='carousel-overlay'></div>
			{images.map((image, i) => (
				<motion.img
					key={i}
					src={image}
					alt={`Background ${i}`}
					initial={{ opacity: 0 }}
					animate={{ opacity: i === index && !isFading ? 1 : 0 }}
					transition={{ duration: 1, ease: 'easeInOut' }}
					className='carousel-image'
					style={{ position: i === index ? 'relative' : 'absolute' }}
				/>
			))}
		</div>
	);
};
