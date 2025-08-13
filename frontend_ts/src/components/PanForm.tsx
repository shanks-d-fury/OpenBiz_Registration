import React, { useState } from "react";

export default function PanForm() {
	const [pan, setPan] = useState("");
	const [isValid, setIsValid] = useState(true);

	const panRegex = /^[A-Za-z]{5}[0-9]{4}[A-Za-z]{1}$/;

	const handlePanChange = (e: any) => {
		const value = e.target.value.toUpperCase();
		setPan(value);
		setIsValid(panRegex.test(value));
	};

	return (
		<div className="bg-white border rounded shadow max-w-5xl mx-auto mt-6">
			<div className="bg-green-600 text-white px-4 py-2 font-semibold rounded-t">
				PAN Verification
			</div>
			<div className="p-6 text-sm">
				<div className="grid md:grid-cols-2 gap-4 mb-4">
					<div>
						<label className="font-bold" htmlFor="organisationType">
							3. Type of Organisation / संगठन के प्रकार
						</label>
						<select
							id="organisationType"
							className="border rounded p-2 mt-1 w-full"
						>
							<option>Type of Organisation / संगठन के प्रकार</option>
							<option>Proprietorship</option>
							<option>Partnership</option>
							<option>Private Limited Company</option>
							<option>LLP</option>
						</select>
					</div>
					<div>
						<label className="font-bold">4.1 PAN / पैन</label>
						<input
							type="text"
							placeholder="ENTER PAN NUMBER"
							value={pan}
							onChange={handlePanChange}
							className={`border rounded p-2 mt-1 w-full ${
								!isValid && pan.length > 0 ? "border-red-500" : ""
							}`}
						/>
						{!isValid && pan.length > 0 && (
							<p className="text-red-500 text-xs mt-1">
								Invalid PAN format. Example: ABCDE1234F
							</p>
						)}
					</div>
				</div>

				<div className="grid md:grid-cols-2 gap-4 mb-4">
					<div>
						<label className="font-bold">
							4.1.1 Name of PAN Holder / पैन धारक का नाम
						</label>
						<input
							type="text"
							placeholder="Name as per PAN"
							className="border rounded p-2 mt-1 w-full"
						/>
					</div>
					<div>
						<label className="font-bold">
							4.1.2 DOB or DOI as per PAN / पैन के अनुसार जन्म तिथि या निगमण
							तिथि
						</label>
						<input
							type="text"
							placeholder="DD/MM/YYYY"
							className="border rounded p-2 mt-1 w-full"
						/>
					</div>
				</div>

				<div className="flex items-start space-x-2 mb-4">
					<input
						type="checkbox"
						id="panConsent"
						title="Consent for using PAN data"
					/>
					<label htmlFor="panConsent" className="ml-2">
						I, the holder of the above PAN, hereby give my consent to Ministry
						of MSME, Government of India, for using my data/information...
					</label>
				</div>

				<button className="bg-[#007bff] text-white px-4 py-2 rounded hover:bg-blue-600">
					PAN Validate
				</button>
			</div>
		</div>
	);
}
