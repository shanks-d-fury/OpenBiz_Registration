export default function Header() {
	return (
		<header className="bg-[#4537c4] text-white py-2">
			<div className="container mx-auto flex items-center gap-4 px-4">
				<img
					src="/MINISTRY_NAME.webp"
					alt="Ministry of Micro, Small & Medium Enterprises"
					className="h-14"
				/>
				<nav className="flex gap-6 text-sm font-medium ml-auto">
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
			</div>
		</header>
	);
}
