import Navbar from './scenes/Navbar';
import Landing from './scenes/Landing';
import DotGroup from './scenes/DotGroup';
import MySkills from './scenes/MySkills';
import LineGradient from './components/LineGradient';
import Projects from './scenes/Projects';
import Contact from './scenes/Contact';
import Footer from './scenes/Footer';
import useMediaQuery from './hooks/useMediaQuery';
import { useEffect, useState, Fragment } from 'react';
import Testimonials from './scenes/Testimonials';
import { motion } from 'framer-motion';

function App() {
	const [selectedPage, setSelectedPage] = useState('home');
	const [isTopOfPage, setIsTopOfPage] = useState(true);
	const isDesktop = useMediaQuery('(min-width: 1060px)');

	const navs = [
		{
			currentPage: 'home',
			component: <Landing setSelectedPage={setSelectedPage} />
		},
		{
			currentPage: 'skills',
			component: <MySkills />
		},
		{
			currentPage: 'projects',
			component: <Projects />
		},
		{
			currentPage: 'testimonials',
			component: <Testimonials />
		},
		{
			currentPage: 'contact',
			component: <Contact />
		}
	];

	// * NavBar will turn red if it's no longer at the top of page
	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY === 0) {
				setIsTopOfPage(true);
				setSelectedPage('home');
			}
			if (window.scrollY !== 0) setIsTopOfPage(false);
		};
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	return (
		<div className="app bg-deep-blue">
			<Navbar
				isTopOfPage={isTopOfPage}
				selectedPage={selectedPage}
				setSelectedPage={setSelectedPage}
			/>
			{isDesktop && (
				<DotGroup
					selectedPage={selectedPage}
					setSelectedPage={setSelectedPage}
				/>
			)}
			{navs.map(({ currentPage, component }, idx) => (
				<Fragment key={idx}>
					<div
						className={`w-5/6 mx-auto ${
							currentPage !== 'projects' && 'md:h-full'
						}`}
					>
						<motion.div
							margin="0 0 -200px 0"
							amount="all"
							onViewportEnter={() => setSelectedPage(currentPage)}
						>
							{component}
						</motion.div>
					</div>
					<LineGradient />
				</Fragment>
			))}
			<Footer />
		</div>
	);
}

export default App;
