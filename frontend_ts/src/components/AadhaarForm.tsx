import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { DotSpinner } from "ldrs/react";
import "ldrs/react/DotSpinner.css";
import OtpSection from "./OtpSection";

interface AadhaarFormProps {
	onOtpVerified: () => void;
}

export default function AadhaarForm({ onOtpVerified }: AadhaarFormProps) {
	const router = useRouter();
	const [aadhaarNumber, setAadhaarNumber] = useState("");
	const [name, setName] = useState("");
	const [loading, setLoading] = useState(false);
	const [consentChecked, setConsentChecked] = useState(false);
	type AadhaarApiResponse = { message: string; [key: string]: any };
	const [response, setResponse] = useState<AadhaarApiResponse | null>(null);
	const [error, setError] = useState("");

	// Field-specific error states (similar to PanForm)
	const [showAadhaarError, setShowAadhaarError] = useState(false);
	const [showNameError, setShowNameError] = useState(false);
	const [showConsentError, setShowConsentError] = useState(false);
	const [showAadhaarFormatError, setShowAadhaarFormatError] = useState(false);

	// Disable fields after OTP is successfully verified
	const [isOtpValidated, setIsOtpValidated] = useState(false);

	// Ensure initial view on (re)navigation: hide OTP section and re-enable fields
	useEffect(() => {
		setIsOtpValidated(false);
		setResponse(null);
		setError("");
		// keep user inputs; only reset OTP view/state
	}, [router.asPath]);

	// Local handler to capture OTP verification and notify parent
	const handleOtpVerifiedLocal = () => {
		setIsOtpValidated(true);
		onOtpVerified();
	};

	const handleValidateAadhaar = async () => {
		// Reset all errors first
		setShowAadhaarError(false);
		setShowNameError(false);
		setShowConsentError(false);
		setShowAadhaarFormatError(false);

		setError("");

		let hasErrors = false;

		// Check each field and set errors
		if (!aadhaarNumber.trim()) {
			setShowAadhaarError(true);
			hasErrors = true;
		} else if (!/^\d{12}$/.test(aadhaarNumber)) {
			// Aadhaar must be exactly 12 digits
			setShowAadhaarFormatError(true);
			hasErrors = true;
		}
		if (!name.trim()) {
			setShowNameError(true);
			hasErrors = true;
		}
		if (!consentChecked) {
			setShowConsentError(true);
			hasErrors = true;
		}

		// If there are validation errors, don't proceed with API call
		if (hasErrors) {
			return;
		}

		setLoading(true);
		setResponse(null);

		try {
			// Start timer and API call simultaneously
			const [responseRaw] = await Promise.all([
				fetch("https://openbiz-registration.up.railway.app/api/aadhaarAPI", {
					method: "POST",
					body: JSON.stringify({
						aadhaar: aadhaarNumber,
						name: name,
					}),
				}),
				// Minimum 1 second delay
				new Promise((resolve) => setTimeout(resolve, 1000)),
			]);

			const data: AadhaarApiResponse = await responseRaw.json();
			setResponse(data);
		} catch (err) {
			console.error("API call error:", err);

			// More specific error handling
			if (err instanceof TypeError && err.message.includes("Failed to fetch")) {
				setError(
					"Unable to connect to server. Please check your internet connection and try again."
				);
			} else if (err instanceof Error) {
				setError(
					err.message.includes("HTTP")
						? `Server error: ${err.message}`
						: err.message
				);
			} else {
				setError("Network error. Please try again.");
			}
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
								1. Aadhaar Number/ आधार संख्या *
							</label>
							<input
								type="text"
								placeholder="Your Aadhaar No"
								inputMode="numeric"
								pattern="\\d*"
								maxLength={12}
								className={`border rounded p-2 mt-1 ${
									isOtpValidated ? "bg-gray-100 cursor-not-allowed" : ""
								} ${
									showAadhaarError || showAadhaarFormatError
										? "border-red-500"
										: ""
								}`}
								value={aadhaarNumber}
								onChange={(e) => {
									// Allow only digits and cap at 12
									const digitsOnly = e.target.value
										.replace(/\D/g, "")
										.slice(0, 12);
									setAadhaarNumber(digitsOnly);
									setShowAadhaarError(false); // Clear error when user types
									setShowAadhaarFormatError(false);
								}}
								disabled={isOtpValidated}
							/>
							{showAadhaarError && (
								<p className="text-red-500 text-xs mt-1">Required</p>
							)}
							{!showAadhaarError && showAadhaarFormatError && (
								<p className="text-red-500 text-xs mt-1">
									Enter Valid Aadhaar Format
								</p>
							)}
						</div>
						<div className="flex flex-col">
							<label className="font-bold">
								2. Name of Entrepreneur / उद्यमी का नाम *
							</label>
							<input
								type="text"
								placeholder="Name as per Aadhaar"
								className={`border rounded p-2 mt-1 ${
									isOtpValidated ? "bg-gray-100 cursor-not-allowed" : ""
								}`}
								value={name}
								onChange={(e) => {
									setName(e.target.value);
									setShowNameError(false); // Clear error when user types
								}}
								disabled={isOtpValidated}
							/>
							{showNameError && (
								<p className="text-red-500 text-xs mt-1">Required</p>
							)}
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
							onChange={(e) => {
								setConsentChecked(e.target.checked);
								setShowConsentError(false); // Clear error when user checks
							}}
							disabled={isOtpValidated}
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
					{showConsentError && (
						<p className="text-red-500 text-xs mb-4">
							Please provide consent to proceed with Aadhaar verification
						</p>
					)}
					{!response && (
						<button
							className="bg-[#007bff] text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
							onClick={handleValidateAadhaar}
							disabled={loading}
						>
							{loading ? (
								<DotSpinner size="20" speed="0.9" color="white" />
							) : (
								"Validate the OTP"
							)}
						</button>
					)}
				</div>
				{/* API Response Display */}
				{response && <OtpSection onOtpVerified={handleOtpVerifiedLocal} />}
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
