import { downloadResumePdf } from "../../../../apps/api/src/export/lib/api";

type Props = {
	resumeId: string;
};

export default function DownloadButton({ resumeId }: Props) {
	const handleDownload = async () => {
		try {
			await downloadResumePdf(resumeId);
		} catch (error) {
			console.error(error);
			alert("Failed to download PDF");
		}
	};

	return (
		<button
			type="button"
			onClick={handleDownload}
			className="bg-black text-white px-4 py-2 rounded-lg hover:opacity-80"
		>
			Download PDF
		</button>
	);
}
