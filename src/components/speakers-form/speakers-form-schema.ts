import { z } from 'zod/v4';

export const MAX_SPEAKERS = 6;

export const EMPTY_SPEAKER = {
	firstName: '',
	lastName: '',
	talkTitle: '',
	talkSubtitle: '',
};

const speakerSchema = z.object({
	firstName: z.string().min(1),
	lastName: z.string().min(1),
	talkTitle: z.string().min(1),
	talkSubtitle: z.string().optional(),
	photo: z.file().optional(),
});

export const speakersFormSchema = z.object({
	city: z.string().min(1),
	date: z.date(),
	speakers: z.array(speakerSchema).min(1).max(MAX_SPEAKERS),
});

export type SpeakersFormValues = z.infer<typeof speakersFormSchema>;
export type SpeakerValues = z.infer<typeof speakerSchema>;
