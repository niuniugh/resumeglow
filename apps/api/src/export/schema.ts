import { z } from "zod";

export const exportParamSchema = z.object({
	resumeId: z.string().uuid(),
});

export type ExportParamType = z.infer<typeof exportParamSchema>;
