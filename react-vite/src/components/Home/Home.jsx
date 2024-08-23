import { Carousel } from '../Carousel/Carousel';
import { HomeMasthead } from '../HomeMasthead/HomeMasthead';
import { Listings } from '../Listings/Listings';

export const Home = () => {
	return (
		<div>
			<Carousel />
			<HomeMasthead />
			<Listings />
		</div>
	);
};
