import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { downloadResumePdf } from "../../lib/api";

export const Route = createFileRoute("/download/$resumeId")({
	component: DownloadPage,
});

function DownloadPage() {
	const { resumeId } = Route.useParams();
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [isSuccess, setIsSuccess] = useState(false);

	async function handleDownload() {
		try {
			setIsLoading(true);
			setError(null);
			await downloadResumePdf(resumeId);
			setIsSuccess(true);
		} catch (_err) {
			setError("Failed to download CV. Please try again.");
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50">
			<div className="bg-white rounded-2xl shadow-md p-10 text-center space-y-4 max-w-md w-full">
				<div className="text-5xl">📄</div>
				<h1 className="text-2xl font-bold text-gray-800">
					Your CV is ready to be downloaded!
				</h1>
				<p className="text-gray-500 text-sm">
					Click the button below to download your ATS-friendly CV.
				</p>

				{error && <p className="text-red-500 text-sm">{error}</p>}

				{isSuccess && (
					<p className="text-green-500 text-sm">
						✅ CV downloaded successfully!
					</p>
				)}

				<button
					type="button"
					onClick={handleDownload}
					disabled={isLoading}
					className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
				>
					{isLoading ? "Preparing your CV..." : "Download CV"}
				</button>
			</div>
		</div>
	);
}
