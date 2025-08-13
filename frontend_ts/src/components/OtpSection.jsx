export default function OtpSection() {
	return (
		<div className="bg-white border rounded shadow max-w-5xl mx-auto p-6 mt-6">
			<label className="font-bold text-red-600 block mb-2">
				*Enter One Time Password (OTP) Code
			</label>
			<input
				type="text"
				placeholder="OTP code"
				className="border rounded p-2 mt-1 w-full"
			/>
			<p className="text-sm mt-2">OTP has been sent to *******4010</p>
			<button
				className="bg-blue-600 text-white px-4 py-2 rounded mt-4"
				onClick={() => setStep(3)}
			>
				Validate
			</button>
		</div>
	);
}
