// Test script to check if the API is accessible
// Run this with: node test-api.js

const testApiEndpoint = async () => {
	const apiUrl = "https://open-biz-registration.vercel.app/api/aadhaarAPI";

	console.log("Testing API endpoint:", apiUrl);

	try {
		const response = await fetch(apiUrl, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
			body: JSON.stringify({
				aadhaar: "123456789012",
				name: "Test User",
			}),
		});

		console.log("Response status:", response.status);
		console.log("Response headers:", Object.fromEntries(response.headers));

		if (response.ok) {
			const data = await response.json();
			console.log("Success! Response data:", data);
		} else {
			const errorData = await response.text();
			console.log("Error response:", errorData);
		}
	} catch (error) {
		console.error("Network error:", error.message);

		// Check if it's a CORS issue
		if (error.message.includes("Failed to fetch")) {
			console.log(
				"\n🚨 This might be a CORS issue or the server is not responding."
			);
			console.log("Possible solutions:");
			console.log("1. Check if your backend is properly deployed");
			console.log("2. Verify CORS headers are set correctly");
			console.log("3. Ensure the API endpoint exists");
		}
	}
};

// Test if running in Node.js environment
if (typeof fetch === "undefined") {
	console.log("Installing node-fetch for testing...");
	// Note: In Node.js 18+, fetch is available globally
	import("node-fetch")
		.then(({ default: fetch }) => {
			global.fetch = fetch;
			testApiEndpoint();
		})
		.catch(() => {
			console.log("Please install node-fetch: npm install node-fetch");
			console.log("Or use Node.js 18+ which has fetch built-in");
		});
} else {
	testApiEndpoint();
}
