import { useState, useEffect } from "react";
import { DotSpinner } from "ldrs/react";
import "ldrs/react/DotSpinner.css";

export default function OtpSection({ onOtpVerified }) {
	const [enteredOtp, setEnteredOtp] = useState("");
	const [generatedOtp, setGeneratedOtp] = useState("");
	const [isVerifying, setIsVerifying] = useState(false);
	const [error, setError] = useState("");
	const [isOtpValidated, setIsOtpValidated] = useState(false);

	// Generate random 6-digit OTP when component mounts
	useEffect(() => {
		const randomOtp = Math.floor(100000 + Math.random() * 900000).toString();
		setGeneratedOtp(randomOtp);
		console.log("Generated OTP:", randomOtp); // For development - remove in production
	}, []);

	const handleValidateOtp = () => {
		if (!enteredOtp.trim()) {
			setError("Please enter OTP");
			return;
		}

		if (enteredOtp.length !== 6) {
			setError("OTP must be 6 digits");
			return;
		}

		setIsVerifying(true);
		setError("");

		// Simulate verification delay
		setTimeout(() => {
			if (enteredOtp === generatedOtp) {
				setError("");
				setIsOtpValidated(true);
				onOtpVerified(); // Call the parent function to update state
			} else {
				setError("Invalid OTP. Please try again.");
			}
			setIsVerifying(false);
		}, 1000);
	};

	return (
		<div className="bg-white max-w-6xl mx-auto p-6 pt-0">
			<input
				type="text"
				placeholder="OTP code"
				className="border rounded p-2 mt-1 w-full"
				value={enteredOtp}
				onChange={(e) => setEnteredOtp(e.target.value)}
				maxLength={6}
			/>
			<p className="text-xs mt-1 text-gray-600">
				Development Mode - Generated OTP: {generatedOtp}
			</p>

			{error && <p className="text-red-600 text-sm mt-2">{error}</p>}

			{isOtpValidated && (
				<p className="text-green-600 text-sm mt-2 font-semibold">
					Your Aadhaar has been successfully verified. You can continue Udyam
					Registration Process.
				</p>
			)}

			{!isOtpValidated && (
				<button
					className="bg-blue-600 text-white px-4 py-2 rounded mt-4 disabled:bg-gray-400 disabled:cursor-not-allowed"
					onClick={handleValidateOtp}
					disabled={isVerifying || !enteredOtp.trim()}
				>
					{isVerifying ? (
						<DotSpinner size="20" speed="0.9" color="white" />
					) : (
						"Validate"
					)}
				</button>
			)}
		</div>
	);
}
