import { FaGithub } from 'react-icons/fa';
import { FaLinkedin } from 'react-icons/fa';
import { FaDesktop } from 'react-icons/fa';
import './Footer.css';

export const Footer = () => {
	return (
		<div className='footer-wrapper'>
			<p>8BitGaming © 2024</p>
			<div className='social-structure'>
				<a
					className='social-link'
					href='https://github.com/Haydengalyeanbiz'
				>
					<FaGithub />
				</a>
				<a
					className='social-link'
					href='https://www.linkedin.com/in/hayden-galyean-42a518189'
				>
					<FaLinkedin />
				</a>
				<a
					className='social-link'
					href='https://haydengalyeanportfolio.onrender.com/'
				>
					<FaDesktop />
				</a>
			</div>
		</div>
	);
};
