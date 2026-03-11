import { PDFDocument, StandardFonts } from "pdf-lib";

type ResumeProp = {
	title: string;
	summary: string | null;
	user: { full_name: string; email: string };
	experiences: { job_title: string; company_name: string }[];
	educations: { degree: string; school_name: string }[];
	skills: { name: string }[];
};

const MARGIN_X = 50;
const LINE_HEIGHT = 18;
const SECTION_GAP = 30;

export async function generatePdf(resume: ResumeProp) {
	const pdf = await PDFDocument.create();
	const page = pdf.addPage();
	const font = await pdf.embedFont(StandardFonts.Helvetica);
	const boldFont = await pdf.embedFont(StandardFonts.HelveticaBold);

	let y = 780;

	// Header
	page.drawText(resume.user.full_name, {
		x: MARGIN_X,
		y,
		size: 20,
		font: boldFont,
	});

	y -= LINE_HEIGHT + 5;

	page.drawText(resume.user.email, {
		x: MARGIN_X,
		y,
		size: 11,
		font,
	});

	y -= SECTION_GAP;

	// Summary
	if (resume.summary) {
		page.drawText("Summary", { x: MARGIN_X, y, size: 13, font: boldFont });
		y -= LINE_HEIGHT;
		page.drawText(resume.summary, { x: MARGIN_X, y, size: 11, font });
		y -= SECTION_GAP;
	}

	// Experience
	if (resume.experiences.length > 0) {
		page.drawText("Experience", { x: MARGIN_X, y, size: 13, font: boldFont });
		y -= LINE_HEIGHT;
		for (const exp of resume.experiences) {
			page.drawText(`${exp.job_title} - ${exp.company_name}`, {
				x: MARGIN_X,
				y,
				size: 11,
				font,
			});
			y -= LINE_HEIGHT;
		}
		y -= SECTION_GAP - LINE_HEIGHT;
	}

	// Education
	if (resume.educations.length > 0) {
		page.drawText("Education", { x: MARGIN_X, y, size: 13, font: boldFont });
		y -= LINE_HEIGHT;
		for (const edu of resume.educations) {
			page.drawText(`${edu.degree} - ${edu.school_name}`, {
				x: MARGIN_X,
				y,
				size: 11,
				font,
			});
			y -= LINE_HEIGHT;
		}
		y -= SECTION_GAP - LINE_HEIGHT;
	}

	// Skills
	if (resume.skills.length > 0) {
		page.drawText("Skills", { x: MARGIN_X, y, size: 13, font: boldFont });
		y -= LINE_HEIGHT;
		const skillText = resume.skills.map((s) => s.name).join(", ");
		page.drawText(skillText, { x: MARGIN_X, y, size: 11, font });
	}

	return pdf.save();
}
