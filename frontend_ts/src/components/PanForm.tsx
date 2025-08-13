import React, { useState } from "react";

export default function PanForm() {
	const [pan, setPan] = useState("");
	const [organisationType, setOrganisationType] = useState("");
	const [panHolderName, setPanHolderName] = useState("");
	const [dateOfBirth, setDateOfBirth] = useState("");
	const [panConsent, setPanConsent] = useState(false);
	const [isValid, setIsValid] = useState(true);
	const [showConsentError, setShowConsentError] = useState(false);
	const [showOrganisationError, setShowOrganisationError] = useState(false);
	const [showPanError, setShowPanError] = useState(false);
	const [showNameError, setShowNameError] = useState(false);
	const [showDateError, setShowDateError] = useState(false);
	const [showDateFormatError, setShowDateFormatError] = useState(false);
	const [isPanValidated, setIsPanValidated] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const panRegex = /^[A-Za-z]{5}[0-9]{4}[A-Za-z]{1}$/;

	// Date validation function for DD/MM/YYYY format
	const validateDate = (dateString: string): boolean => {
		const dateRegex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
		const match = dateString.match(dateRegex);

		if (!match) return false;

		const day = parseInt(match[1], 10);
		const month = parseInt(match[2], 10);
		const year = parseInt(match[3], 10);

		// Check basic ranges
		if (month < 1 || month > 12) return false;
		if (day < 1 || day > 31) return false;
		if (year < 1900 || year > new Date().getFullYear()) return false;

		// Check for valid date
		const date = new Date(year, month - 1, day);
		return (
			date.getFullYear() === year &&
			date.getMonth() === month - 1 &&
			date.getDate() === day
		);
	};

	// Auto format date input with slashes
	const handleDateChange = (e: any) => {
		let value = e.target.value.replace(/\D/g, ""); // Remove all non-digits

		if (value.length >= 2) {
			value = value.substring(0, 2) + "/" + value.substring(2);
		}
		if (value.length >= 5) {
			value = value.substring(0, 5) + "/" + value.substring(5, 9);
		}

		setDateOfBirth(value);
		setShowDateError(false);
		setShowDateFormatError(false);
	};

	const handlePanChange = (e: any) => {
		const value = e.target.value.toUpperCase();
		setPan(value);
		setIsValid(panRegex.test(value));
		setShowPanError(false); // Clear error when user types
	};

	const handlePanValidate = () => {
		// Reset all errors first
		setShowOrganisationError(false);
		setShowPanError(false);
		setShowNameError(false);
		setShowDateError(false);
		setShowDateFormatError(false);
		setShowConsentError(false);

		let hasErrors = false;

		// Check each field and set errors
		if (!organisationType) {
			setShowOrganisationError(true);
			hasErrors = true;
		}
		if (!pan.trim()) {
			setShowPanError(true);
			hasErrors = true;
		}
		if (!panHolderName.trim()) {
			setShowNameError(true);
			hasErrors = true;
		}
		if (!dateOfBirth.trim()) {
			setShowDateError(true);
			hasErrors = true;
		} else if (!validateDate(dateOfBirth)) {
			setShowDateFormatError(true);
			hasErrors = true;
		}
		if (!panConsent) {
			setShowConsentError(true);
			hasErrors = true;
		}

		// If no errors, proceed with validation
		if (!hasErrors) {
			setIsLoading(true);

			// Simulate 1 second loading
			setTimeout(() => {
				console.log("PAN validation triggered");
				setIsPanValidated(true);
				setIsLoading(false);
			}, 1000);
		}
	};

	return (
		<div className="bg-white shadow-2xl max-w-6xl mx-auto mt-6">
			<div className="bg-green-600 text-white px-4 py-2 font-semibold rounded-t">
				PAN Verification
			</div>
			<div className="p-6 text-sm">
				<div className="grid md:grid-cols-2 gap-4 mb-4">
					<div>
						<label className="font-bold" htmlFor="organisationType">
							3. Type of Organisation / संगठन के प्रकार *
						</label>
						<select
							id="organisationType"
							className={`border rounded p-2 mt-1 w-full ${
								isPanValidated ? "bg-gray-100 cursor-not-allowed" : ""
							}`}
							value={organisationType}
							onChange={(e) => {
								setOrganisationType(e.target.value);
								setShowOrganisationError(false); // Clear error when user selects
							}}
							disabled={isPanValidated}
							required
						>
							<option value="">Type of Organisation / संगठन के प्रकार</option>
							<option>1. Proprietary / एकल स्वामित्व</option>
							<option>
								2. Hindu Undivided Family / हिंदू अविभाजित परिवार (एचयूएफ)
							</option>
							<option>3. Partnership / पार्टनरशिप</option>
							<option>4. Co-Operative / सहकारी</option>
							<option>
								5. Private Limited Company / प्राइवेट लिमिटेड कंपनी
							</option>
							<option>6. Public Limited Company / पब्लिक लिमिटेड कंपनी</option>
							<option>7. Self Help Group / स्वयं सहायता समूह</option>
							<option>
								8. Limited Liability Partnership / सीमित दायित्व भागीदारी
							</option>
							<option>9. Society / सोसाइटी</option>
							<option>10. Trust / ट्रस्ट</option>
							<option>11. Others / अन्य</option>
						</select>
						{showOrganisationError && (
							<p className="text-red-500 text-xs mt-1">Required</p>
						)}
					</div>
					<div>
						<label className="font-bold">4.1 PAN / पैन *</label>
						<input
							type="text"
							placeholder="ENTER PAN NUMBER"
							value={pan}
							onChange={handlePanChange}
							className={`border rounded p-2 mt-1 w-full ${
								!isValid && pan.length > 0 ? "border-red-500" : ""
							} ${isPanValidated ? "bg-gray-100 cursor-not-allowed" : ""}`}
							disabled={isPanValidated}
							required
						/>
						{!isValid && pan.length > 0 && (
							<p className="text-red-500 text-xs mt-1">
								Invalid PAN format. Example: ABCDE1234F
							</p>
						)}
						{showPanError && !pan.trim() && (
							<p className="text-red-500 text-xs mt-1">Required</p>
						)}
					</div>
				</div>

				<div className="grid md:grid-cols-2 gap-4 mb-4">
					<div>
						<label className="font-bold">
							4.1.1 Name of PAN Holder / पैन धारक का नाम *
						</label>
						<input
							type="text"
							placeholder="Name as per PAN"
							className={`border rounded p-2 mt-1 w-full ${
								isPanValidated ? "bg-gray-100 cursor-not-allowed" : ""
							}`}
							value={panHolderName}
							onChange={(e) => {
								setPanHolderName(e.target.value.toUpperCase());
								setShowNameError(false); // Clear error when user types
							}}
							disabled={isPanValidated}
							required
						/>
						{showNameError && (
							<p className="text-red-500 text-xs mt-1">Required</p>
						)}
					</div>
					<div>
						<label className="font-bold">
							4.1.2 DOB or DOI as per PAN / पैन के अनुसार जन्म तिथि या निगमण
							तिथि *
						</label>
						<input
							type="text"
							placeholder="DD/MM/YYYY"
							className={`border rounded p-2 mt-1 w-full ${
								isPanValidated ? "bg-gray-100 cursor-not-allowed" : ""
							}`}
							value={dateOfBirth}
							onChange={handleDateChange}
							disabled={isPanValidated}
							maxLength={10}
							required
						/>
						{showDateError && (
							<p className="text-red-500 text-xs mt-1">Required</p>
						)}
						{showDateFormatError && (
							<p className="text-red-500 text-xs mt-1">
								Invalid date format. Please use DD/MM/YYYY
							</p>
						)}
					</div>
				</div>

				<div className="flex items-start space-x-2 mb-4">
					<input
						type="checkbox"
						id="panConsent"
						title="Consent for using PAN data"
						checked={panConsent}
						onChange={(e) => {
							setPanConsent(e.target.checked);
							if (e.target.checked) {
								setShowConsentError(false);
							}
						}}
						disabled={isPanValidated}
						className={isPanValidated ? "cursor-not-allowed" : ""}
						required
					/>
					<div>
						<label htmlFor="panConsent" className="ml-2">
							I, the holder of the above PAN, hereby give my consent to Ministry
							of MSME, Government of India, for using my data/ information
							available in the Income Tax Returns filed by me, and also the same
							available in the GST Returns and also from other Government
							organizations, for MSME classification and other official
							purposes, in pursuance of the MSMED Act, 2006.
						</label>
						{showConsentError && !panConsent && (
							<p className="text-red-500 text-xs mt-1">
								You must Agree Declarations
							</p>
						)}
					</div>
				</div>

				<button
					className={`px-4 py-2 rounded text-white ${
						isLoading
							? "bg-gray-400 cursor-not-allowed"
							: "bg-[#007bff] hover:bg-blue-600"
					}`}
					onClick={handlePanValidate}
					disabled={isLoading}
				>
					{isLoading ? (
						<div className="flex items-center space-x-2">
							<div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
							<span>Loading...</span>
						</div>
					) : isPanValidated ? (
						"Continue"
					) : (
						"PAN Validate"
					)}
				</button>

				{isPanValidated && (
					<div className="mt-6 text-green-700 font-bold">
						Your PAN has been successfully verified. Some fields of the form
						will be disabled. Disabled fields will be automatically filled after
						verification from PAN data. GSTIN As per applicablity of CGST Act
						2017 and as notified by the ministry of MSME{" "}
						<b className="text-blue-500 ">
							vide S.O. 1055 E dated 05th March 2021{" "}
						</b>
						is required for Registration w.e.f. 01.04.2021. You are advised to
						apply for GSTIN suitably to avoid any inconvineance.
					</div>
				)}
			</div>
		</div>
	);
}
