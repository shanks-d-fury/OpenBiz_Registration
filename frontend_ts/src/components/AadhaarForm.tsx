export default function AadhaarForm() {
	return (
		<div className="container mx-auto px-4 my-8">
			<h1 className="text-center text-xl font-bold mb-6">
				UDYAM REGISTRATION FORM - For New Enterprise who are not Registered yet
				as MSME
			</h1>
			<div className="bg-white border rounded shadow max-w-5xl mx-auto">
				<div className="bg-[#007bff] text-white px-4 py-2 font-semibold rounded-t">
					Aadhaar Verification With OTP
				</div>
				<div className="p-6">
					<div className="grid md:grid-cols-2 gap-4 mb-4 text-sm">
						<div className="flex flex-col">
							<label className="font-bold ">
								1. Aadhaar Number/ आधार संख्या
							</label>
							<input
								type="text"
								placeholder="Your Aadhaar No"
								className="border rounded p-2 mt-1"
							/>
						</div>
						<div className="flex flex-col">
							<label className="font-bold">
								2. Name of Entrepreneur / उद्यमी का नाम
							</label>
							<input
								type="text"
								placeholder="Name as per Aadhaar"
								className="border rounded p-2 mt-1"
							/>
						</div>
					</div>

					<ul className="list-disc pl-5 text-sm mb-4">
						<li>Aadhaar number shall be required for Udyam Registration.</li>
						<li>
							The Aadhaar number shall be of the proprietor in the case of a
							proprietorship firm, of the managing partner in the case of a
							partnership firm and of a karta in the case of a Hindu Undivided
							Family (HUF).
						</li>
						<li>
							In case of a Company or a Limited Liability Partnership or a
							Cooperative Society or a Society or a Trust, the organisation or
							its authorised signatory shall provide its GSTIN(As per
							applicability of CGST Act 2017 and as notified by the ministry of
							MSME vide{" "}
							<a href="#" className="text-blue-600 underline">
								S.O. 1055(E) dated 05th March 2021
							</a>
							) and PAN along with its Aadhaar number.
						</li>
					</ul>

					<div className="flex items-start space-x-2 mb-4">
						<input
							type="checkbox"
							defaultChecked
							aria-label="Consent for Aadhaar usage"
						/>
						<p className="text-sm">
							I, the holder of the above Aadhaar, hereby give my consent to
							Ministry of MSME, Government of India, for using my Aadhaar number
							as alloted by UIDAI for Udyam Registration. NIC / Ministry of
							MSME, Government of India, have informed me that my aadhaar data
							will not be stored/shared. / मैं, आधार धारक, इस प्रकार उद्यम
							पंजीकरण के लिए यूआईडीएआई के साथ अपने आधार संख्या का उपयोग करने के
							लिए सू0ल0म0उ0 मंत्रालय, भारत सरकार को अपनी सहमति देता हूं। एनआईसी
							/ सू0ल0म0उ0 मंत्रालय, भारत सरकार ने मुझे सूचित किया है कि मेरा
							आधार डेटा संग्रहीत / साझा नहीं किया जाएगा।
						</p>
					</div>

					<button className="bg-[#007bff] text-white px-4 py-2 rounded hover:bg-blue-600">
						Validate & Generate OTP
					</button>
				</div>
			</div>

			{/* NIC codes section */}
			<p className="text-center text-[#007bff] mt-4 text-sm font-medium">
				Activities (NIC codes) not covered under MSMED Act, 2006 for Udyam
				Registration
			</p>
		</div>
	);
}
