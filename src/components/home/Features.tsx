import React from 'react';
import { motion } from 'framer-motion';
import { Lock, Music, Shield, Star } from 'lucide-react';

const features = [
	{
		icon: <Lock size={32} className="text-toxic-green" />,
		title: (
			<h3 className="font-orbitron text-xl text-transparent bg-clip-text bg-gradient-to-r from-gray-600 to-white">
				Full Anonymity
			</h3>
		),
		description:
			'Our production services are 100% ghost. Your name, your credits - we remain in the shadows.',
	},
	{
		icon: <Star size={32} className="text-neon-cyan" />,
		title: (
			<h3 className="font-orbitron text-xl text-transparent bg-clip-text bg-gradient-to-r from-gray-600 to-white">
				Premium Quality
			</h3>
		),
		description:
			'Each track is meticulously crafted with professional sound design and mixing techniques.',
	},
	{
		icon: <Shield size={32} className="text-electric-purple" />,
		title: (
			<h3 className="font-orbitron text-xl text-transparent bg-clip-text bg-gradient-to-r from-gray-600 to-white">
				Exclusive Rights
			</h3>
		),
		description:
			'One sale per track. When you purchase, you get full ownership rights with no royalty splits.',
	},
	{
		icon: <Music size={32} className="text-toxic-green" />,
		title: (
			<h3 className="font-orbitron text-xl text-transparent bg-clip-text bg-gradient-to-r from-gray-600 to-white">
				Custom Production
			</h3>
		),
		description:
			'Need something specific? Contact us for tailored productions that match your artistic vision.',
	},
];

const Features: React.FC = () => {
	return (
		<section className="py-20 relative">
			{/* Background gradient */}
			<div className="absolute inset-0 bg-gradient-to-b from-black/0 via-electric-purple/5 to-black/0" />

			<div className="container mx-auto px-4 relative z-10">
				<motion.div
					className="text-center mb-16"
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5 }}
				>
					<h2 className="font-orbitron text-3xl md:text-4xl font-bold text-white mb-4">
						<span className="text-purple-galaxy">Why Choose Noir Code</span>
					</h2>
					<p className="text-gray-400 max-w-2xl mx-auto">
						We operate in the shadows so you can shine in the spotlight. Quality,
						anonymity and exclusivity are our core values.
					</p>
				</motion.div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
					{features.map((feature, index) => (
						<FeatureCard
							key={index}
							icon={feature.icon}
							title={feature.title}
							description={feature.description}
							index={index}
						/>
					))}
				</div>
			</div>
		</section>
	);
};

interface FeatureCardProps {
	icon: React.ReactNode;
	title: string;
	description: string;
	index: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
	icon,
	title,
	description,
	index,
}) => {
	return (
		<motion.div
			className="bg-gradient-to-br from-black/80 to-gray-800/80 backdrop-blur-md rounded-lg p-6 border border-gray-700 hover:border-electric-purple/50 transition-colors"
			initial={{ opacity: 0, y: 30 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			transition={{ delay: index * 0.1, duration: 0.5 }}
			whileHover={{
				y: -5,
				boxShadow: '0 10px 25px -5px rgba(176, 38, 255, 0.1)',
			}}
		>
			<div className="flex items-center mb-4">
				<div className="p-3 bg-black rounded-full mr-4">{icon}</div>
				<div>
					<h3 className="text-lg font-semibold text-gradient bg-gradient-to-r from-purple-400 via-pink-500 to-indigo-500 bg-clip-text text-transparent">
						{title}
					</h3>
				</div>
			</div>
			<p className="text-gray-300">{description}</p>
		</motion.div>
	);
};

export default Features;