import { z } from 'zod/v4';

export const speakerFormSchema = z.object({
	firstName: z.string().min(1),
	lastName: z.string().min(1),
	talkTitle: z.string().min(1),
	talkSubtitle: z.string().optional(),
	city: z.string().min(1),
	date: z.date(),
	photo: z.file().optional(),
});

export type SpeakerFormValues = z.infer<typeof speakerFormSchema>;
