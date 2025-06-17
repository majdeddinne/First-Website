import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const testimonials = [
	{
		quote: 'The track I purchased has become the highlight of my sets. The sound design is on another level.',
		author: 'Anonymous DJ, Berlin',
		position: 'Berghain Resident',
	},
	{
		quote: 'Working with Noir Code gave me exactly what I needed - a unique sound that stands out in a saturated scene.',
		author: 'Anonymous Producer',
		position: 'Techno Label Owner',
	},
	{
		quote: 'The quality and attention to detail is unmatched. Worth every penny for exclusive rights.',
		author: 'Anonymous Artist',
		position: 'Festival Headliner',
	},
];

const Testimonials: React.FC = () => {
	return (
		<section className="py-20">
			<div className="container mx-auto px-4">
				<motion.div
					className="text-center mb-16 bg-gradient-to-br from-black/80 to-gray-800/80 backdrop-blur-md rounded-lg p-6 border border-gray-700"
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5 }}
				>
					<h2 className="font-orbitron text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-600 to-white mb-4">
						Trusted by Underground Elite
					</h2>
					<p className="text-gray-300 max-w-2xl mx-auto">
						Our clients remain anonymous, but their success speaks volumes. Here's what they have to say about our
						productions.
					</p>
				</motion.div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					{testimonials.map((testimonial, index) => (
						<TestimonialCard
							key={index}
							quote={testimonial.quote}
							author={testimonial.author}
							position={testimonial.position}
							index={index}
						/>
					))}
				</div>
			</div>
		</section>
	);
};

interface TestimonialCardProps {
	quote: string;
	author: string;
	position: string;
	index: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ quote, author, position, index }) => {
	return (
		<motion.div
			className="bg-gradient-to-br from-black/80 to-gray-800/80 backdrop-blur-md rounded-lg p-6 border border-gray-700"
			initial={{ opacity: 0, y: 30 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			transition={{ delay: index * 0.1, duration: 0.5 }}
		>
			<Quote size={32} className="text-electric-purple opacity-40 mb-4" />
			<p className="text-gray-300 mb-6 italic">"{quote}"</p>
			<div className="mt-auto">
				<p className="font-orbitron text-2xl text-transparent bg-clip-text bg-gradient-to-r from-gray-600 to-white mb-2">
					{author}
				</p>
				<p className="text-gray-400 text-sm">{position}</p>
			</div>
		</motion.div>
	);
};

export default Testimonials;