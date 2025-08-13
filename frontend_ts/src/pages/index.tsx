import React from "react";
import Head from "next/head";
import Header from "../components/Header";
import FormStep from "../components/FormStep";
import Footer from "../components/Footer";

export default function Home() {
	return (
		<>
			<Head>
				<title>UDYAM REGISTERATION FORM</title>
			</Head>
			<div className="bg-gray-100 min-h-screen flex flex-col">
				<Header />
				<main className="container mx-auto flex-grow p-4">
					<FormStep />
				</main>
				<Footer />
			</div>
		</>
	);
}
