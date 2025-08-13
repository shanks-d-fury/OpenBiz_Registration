import { useState } from "react";
import { DotSpinner } from "ldrs/react";
import "ldrs/react/DotSpinner.css";
import OtpSection from "./OtpSection";

interface AadhaarFormProps {
	onOtpVerified: () => void;
}

export default function AadhaarForm({ onOtpVerified }: AadhaarFormProps) {
	const [aadhaarNumber, setAadhaarNumber] = useState("");
	const [name, setName] = useState("");
	const [loading, setLoading] = useState(false);
	const [consentChecked, setConsentChecked] = useState(false);
	type AadhaarApiResponse = { message: string; [key: string]: any };
	const [response, setResponse] = useState<AadhaarApiResponse | null>(null);
	const [error, setError] = useState("");

	const handleValidateAadhaar = async () => {
		if (!aadhaarNumber.trim()) {
			setError("Please enter Aadhaar number");
			return;
		}

		if (!name.trim()) {
			setError("Please enter your name");
			return;
		}

		setLoading(true);
		setError("");
		setResponse(null);

		try {
			// Start timer and API call simultaneously
			const [apiResponse] = await Promise.all([
				fetch("http://localhost:3001/api/aadhaarAPI", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						aadhaar: aadhaarNumber,
						name: name,
					}),
				}),
				// Minimum 1 second delay
				new Promise((resolve) => setTimeout(resolve, 1000)),
			]);

			const data = await apiResponse.json();

			if (apiResponse.ok) {
				setResponse(data);
			} else {
				setError(data.error || "Failed to validate Aadhaar");
			}
		} catch (err) {
			setError("Network error. Please try again.");
			console.error("API call error:", err);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="container mx-auto px-4 my-8 ">
			<h1 className="text-center text-xl font-bold mb-6">
				UDYAM REGISTRATION FORM - For New Enterprise who are not Registered yet
				as MSME
			</h1>
			<div className="bg-white rounded shadow-2xl max-w-6xl mx-auto">
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
								value={aadhaarNumber}
								onChange={(e) => setAadhaarNumber(e.target.value)}
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
								value={name}
								onChange={(e) => setName(e.target.value)}
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
							its authorised signatory shall provide its GSTIN As per
							applicability of CGST Act 2017 and as notified by the ministry of
							MSME vide <b>S.O. 1055(E) dated 05th March 2021 </b> and PAN along
							with its Aadhaar number.
						</li>
					</ul>
					<div className="flex items-start space-x-2 mb-4">
						<input
							type="checkbox"
							aria-label="Consent for Aadhaar usage"
							checked={consentChecked}
							onChange={(e) => setConsentChecked(e.target.checked)}
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
					{!response && (
						<button
							className="bg-[#007bff] text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
							onClick={handleValidateAadhaar}
							disabled={
								loading ||
								!aadhaarNumber.trim() ||
								!name.trim() ||
								!consentChecked
							}
						>
							{loading ? (
								<DotSpinner size="20" speed="0.9" color="white" />
							) : (
								// Default values shown
								"Validate the OTP"
							)}
						</button>
					)}
				</div>
				{/* API Response Display */}
				{response && <OtpSection onOtpVerified={onOtpVerified} />}
				{/* Error Display */}
				{error && (
					<div className="mb-4 p-4 bg-red-700 border border-red-200 rounded">
						<p className="text-red-100 font-semibold">Error: {error}</p>
					</div>
				)}
			</div>
		</div>
	);
}
