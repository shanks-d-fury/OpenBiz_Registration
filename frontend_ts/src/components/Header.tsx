import { useState } from "react";

export default function Header() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	return (
		<header className="bg-[#4537c4] text-white py-2">
			<div className="container mx-auto flex items-center gap-2 px-4">
				<img
					src="/MINISTRY_NAME.webp"
					alt="Ministry of Micro, Small & Medium Enterprises"
					className="h-14 header-image"
				/>
				{/* Desktop Navigation */}
				<nav className="hidden md:flex gap-2 text-sm font-medium ml-auto">
					<a href="#" className="hover:underline">
						Home
					</a>
					<a href="#" className="hover:underline">
						NIC Code
					</a>
					<a href="#" className="hover:underline">
						Useful Documents
					</a>
					<a href="#" className="hover:underline">
						Print / Verify
					</a>
					<a href="#" className="hover:underline">
						Update Details
					</a>
					<a href="#" className="hover:underline">
						Login
					</a>
				</nav>

				{/* Mobile Menu Button */}
				<button
					className="md:hidden ml-auto p-2 rounded-md hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/50"
					onClick={toggleMenu}
					aria-label="Toggle navigation menu"
				>
					<div className="w-6 h-6 flex flex-col justify-center space-y-1">
						<span
							className={`block h-0.5 w-6 bg-white transform transition duration-300 ease-in-out ${
								isMenuOpen ? "rotate-45 translate-y-1.5" : ""
							}`}
						></span>
						<span
							className={`block h-0.5 w-6 bg-white transition duration-300 ease-in-out ${
								isMenuOpen ? "opacity-0" : ""
							}`}
						></span>
						<span
							className={`block h-0.5 w-6 bg-white transform transition duration-300 ease-in-out ${
								isMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
							}`}
						></span>
					</div>
				</button>
			</div>

			{/* Mobile Navigation Menu */}
			<div
				className={`md:hidden transition-all duration-300 ease-in-out ${
					isMenuOpen
						? "max-h-96 opacity-100"
						: "max-h-0 opacity-0 overflow-hidden"
				}`}
			>
				<nav className="bg-[#3d30a8] px-4 py-4 space-y-3">
					<a
						href="#"
						className="block text-sm font-medium hover:underline py-2"
					>
						Home
					</a>
					<a
						href="#"
						className="block text-sm font-medium hover:underline py-2"
					>
						NIC Code
					</a>
					<a
						href="#"
						className="block text-sm font-medium hover:underline py-2"
					>
						Useful Documents
					</a>
					<a
						href="#"
						className="block text-sm font-medium hover:underline py-2"
					>
						Print / Verify
					</a>
					<a
						href="#"
						className="block text-sm font-medium hover:underline py-2"
					>
						Update Details
					</a>
					<a
						href="#"
						className="block text-sm font-medium hover:underline py-2"
					>
						Login
					</a>
				</nav>
			</div>
		</header>
	);
}
