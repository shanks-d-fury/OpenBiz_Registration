import AadhaarForm from "./AadhaarForm";
import OtpSection from "./OtpSection";
import PanForm from "./panForm";

export default function FormStep() {
	return (
		<div className="udyam-page">
			<div className="form-section pb-10">
				<AadhaarForm />
				<OtpSection />
				<PanForm />
			</div>

			{/* Floating Accessibility Menu */}
		</div>
	);
}
