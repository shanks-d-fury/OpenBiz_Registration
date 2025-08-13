import { useState } from "react";
import AadhaarForm from "./AadhaarForm";
import OtpSection from "./OtpSection";
import PanForm from "./PanForm";

export default function FormStep() {
	const [isOtpVerified, setIsOtpVerified] = useState(false);

	const handleOtpVerified = () => {
		setIsOtpVerified(true);
	};

	return (
		<div className="udyam-page">
			<div className="form-section pb-10">
				<AadhaarForm onOtpVerified={handleOtpVerified} />

				{isOtpVerified && <PanForm />}
			</div>

			{/* Floating Accessibility Menu */}
			{/* NIC codes section */}
			<div className="overflow-hidden mt-4">
				<p className="text-[#007bff] text-bold animate-slide-in-right">
					Activities (NIC codes) not covered under MSMED Act, 2006 for Udyam
					Registration
				</p>
			</div>
		</div>
	);
}
