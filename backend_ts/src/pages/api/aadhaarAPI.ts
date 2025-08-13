import type { NextApiRequest, NextApiResponse } from "next";

// CORS middleware function
function runCors(req: NextApiRequest, res: NextApiResponse) {
	// Set CORS headers
	res.setHeader("Access-Control-Allow-Origin", "*"); // In production, specify your domain
	res.setHeader(
		"Access-Control-Allow-Methods",
		"GET, POST, PUT, DELETE, OPTIONS"
	);
	res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

	// Handle preflight request
	if (req.method === "OPTIONS") {
		res.status(200).end();
		return true; // Indicates that the request was handled
	}
	return false; // Continue with normal request handling
}

// Temporary OTP store (in-memory)
const otpStore: Record<string, string> = {};

// Aadhaar Validation (Verhoeff Algorithm)
function validateAadhaar(aadhaar: string): boolean {
	if (!/^\d{12}$/.test(aadhaar)) return false;

	const d = [
		[0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
		[1, 2, 3, 4, 0, 6, 7, 8, 9, 5],
		[2, 3, 4, 0, 1, 7, 8, 9, 5, 6],
		[3, 4, 0, 1, 2, 8, 9, 5, 6, 7],
		[4, 0, 1, 2, 3, 9, 5, 6, 7, 8],
		[5, 9, 8, 7, 6, 0, 4, 3, 2, 1],
		[6, 5, 9, 8, 7, 1, 0, 4, 3, 2],
		[7, 6, 5, 9, 8, 2, 1, 0, 4, 3],
		[8, 7, 6, 5, 9, 3, 2, 1, 0, 4],
		[9, 8, 7, 6, 5, 4, 3, 2, 1, 0],
	];
	const p = [
		[0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
		[1, 5, 7, 6, 2, 8, 3, 0, 9, 4],
		[5, 8, 0, 3, 7, 9, 6, 1, 4, 2],
		[8, 9, 1, 6, 0, 4, 3, 5, 2, 7],
		[9, 4, 5, 3, 1, 2, 6, 8, 7, 0],
		[4, 2, 8, 6, 5, 7, 3, 9, 0, 1],
		[2, 7, 9, 3, 8, 0, 6, 4, 1, 5],
		[7, 0, 4, 6, 9, 1, 3, 2, 5, 8],
	];

	let c = 0;
	aadhaar
		.split("")
		.reverse()
		.forEach((char, i) => {
			c = d[c][p[i % 8][parseInt(char, 10)]];
		});
	return c === 0;
}

// API handler
export default function handler(req: NextApiRequest, res: NextApiResponse) {
	// Handle CORS
	if (runCors(req, res)) {
		return; // If it was a preflight request, we're done
	}

	if (req.method === "POST") {
		const { aadhaar } = req.body as { aadhaar: string };

		if (!validateAadhaar(aadhaar)) {
			return res.status(400).json({ message: "Invalid Aadhaar number" });
		}

		const otp = Math.floor(100000 + Math.random() * 900000).toString();
		otpStore[aadhaar] = otp;

		// console.log(Mock OTP for ${aadhaar}: ${otp}); // For demo

		return res.status(200).json({ message: "OTP sent successfully" });
	}

	return res.status(405).json({ message: "REQUEST Method IS INVALID" });
}

// Make otpStore accessible from verify-otp route
export { otpStore };
