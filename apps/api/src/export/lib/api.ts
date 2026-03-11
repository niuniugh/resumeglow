export async function downloadResumePdf(resumeId: string) {
	const response = await fetch(`http://localhost:8000/export/${resumeId}`, {
		method: "GET",
	});

	if (!response.ok) {
		throw new Error("Failed to download PDF");
	}

	const blob = await response.blob();

	const url = window.URL.createObjectURL(blob);
	const a = document.createElement("a");

	a.href = url;
	a.download = "resume.pdf";

	document.body.appendChild(a);

	a.click();
	a.remove();
}
