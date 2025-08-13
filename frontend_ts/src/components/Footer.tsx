export default function Footer() {
	return (
		<footer className="bg-[#0a1f44] text-white mt-8">
			<div className="container mx-auto grid md:grid-cols-3 gap-6 px-6 py-8">
				<div>
					<h2 className="font-semibold">UDYAM REGISTRATION</h2>
					<p>Ministry of MSME</p>
					<p>Udyog bhawan - New Delhi</p>
					<p>
						Email:{" "}
						<a href="mailto:champions@gov.in" className="underline">
							champions@gov.in
						</a>
					</p>
					<p>Contact Us</p>
					<p>For Grievances / Problems</p>
				</div>

				<div>
					<h2 className="font-semibold">Our Services</h2>
					<ul>
						<li>CHAMPIONS</li>
						<li>MSME Samadhaan</li>
						<li>MSME Sambandh</li>
						<li>MSME Dashboard</li>
						<li>Entrepreneurship Skill Development Programme (ESDP)</li>
					</ul>
				</div>
			</div>

			<div className="bg-[#091835] text-center py-2 text-xs">
				© Copyright Udyam Registration. All Rights Reserved, Website Content
				Managed by Ministry of Micro Small and Medium Enterprises, GoI Website
				hosted & managed by National Informatics Centre, Ministry of
				Communications and IT, Government of India
			</div>
		</footer>
	);
}
