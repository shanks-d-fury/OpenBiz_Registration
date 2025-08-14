export default function Footer() {
	return (
		<footer className="bg-[#0a1f44] text-white mt-8">
			<div className="container mx-auto grid md:grid-cols-3 gap-6 px-6 py-8">
				<div>
					<h2 className="font-semibold">UDYAM REGISTRATION</h2>
					<p>Ministry of MSME</p>
					<p>Udyog bhawan - New Delhi</p>
					<p>
						<b>Email: </b>
						<a href="mailto:champions@gov.in" className="underline">
							champions@gov.in
						</a>
					</p>
					<p>
						<b>Contact Us</b>
					</p>
					<p>
						<b>For Grievances / Problems</b>
					</p>
				</div>

				<div>
					<h2 className="font-semibold">Our Services</h2>
					<ul className="ul-list">
						<li>&gt; CHAMPIONS</li>
						<li>&gt; MSME Samadhaan</li>
						<li>&gt; MSME Sambandh</li>
						<li>&gt; MSME Dashboard</li>
						<li>&gt; Entrepreneurship Skill Development Programme (ESDP)</li>
					</ul>
				</div>
			</div>

			<div className="bg-[#091835] text-xs">
				<div className="text-start px-8 py-4 w-2/3">
					© Copyright Udyam Registration. All Rights Reserved, Website Content
					Managed by Ministry of Micro Small and Medium Enterprises, GoI Website
					hosted & managed by National Informatics Centre, Ministry of
					Communications and IT, Government of India
				</div>
			</div>
		</footer>
	);
}
