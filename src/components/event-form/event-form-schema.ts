import { z } from 'zod/v4';

import { SupporterType } from '@/components/event-form/supporter-type.ts';

const eventFormBaseSchema = z.object({
	city: z.string().min(1),
	title: z.string().min(1),
	location: z.string().min(1),
	date: z.date(),
});

const eventFormSupportersSchema = z.object({
	withSupporters: z.literal(true),
	supporters: z.array(z.file()).min(1),
	supporterType: z.enum(SupporterType),
});

const eventFormNoSupportersSchema = z.object({
	withSupporters: z.literal(false),
});

export const eventFormSchema = z.intersection(
	eventFormBaseSchema,
	z.discriminatedUnion('withSupporters', [
		eventFormSupportersSchema,
		eventFormNoSupportersSchema,
	]),
);

export type EventFormValues = z.infer<typeof eventFormSchema>;
