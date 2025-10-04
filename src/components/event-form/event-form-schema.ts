import { z } from 'zod/v4';

import { PartnerTypeEnum } from '@/components/event-form/partner-type.ts';

const eventFormBaseSchema = z.object({
	city: z.string().min(1),
	title: z.string().min(1),
	location: z.string().min(1),
	date: z.date(),
});

const eventFormPartnersSchema = z.object({
	withPartners: z.literal(true),
	partners: z.array(z.file()).min(1),
	partnerType: z.enum(PartnerTypeEnum),
});

const eventFormNoPartnersSchema = z.object({
	withPartners: z.literal(false),
});

export const eventFormSchema = z.intersection(
	eventFormBaseSchema,
	z.discriminatedUnion('withPartners', [
		eventFormPartnersSchema,
		eventFormNoPartnersSchema,
	]),
);

export type EventFormValues = z.infer<typeof eventFormSchema>;
