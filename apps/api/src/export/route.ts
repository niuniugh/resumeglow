import { Hono } from "hono";
import { prisma } from "../utils/prisma";
import { exportParamSchema } from "./schema";
import { generatePdf } from "./service";

export const exportRoute = new Hono().get("/:resumeId", async (c) => {
	try {
		const params = { resumeId: c.req.param("resumeId") };

		const validated = exportParamSchema.parse(params);

		const resume = await prisma.resume.findUnique({
			where: { id: validated.resumeId },
			include: {
				user: true,
				educations: true,
				experiences: true,
				skills: true,
			},
		});

		if (!resume) {
			return c.json({ message: "Resume not found" }, 404);
		}

		const pdf = await generatePdf(resume);

		return new Response(pdf.buffer as BodyInit, {
			headers: {
				"Content-Type": "application/pdf",
				"Content-Disposition": `attachment; filename="${resume.title}.pdf"`,
			},
		});
	} catch (error) {
		console.error(error);
		return c.json({ message: "Internal Server Error" }, 500);
	}
});
