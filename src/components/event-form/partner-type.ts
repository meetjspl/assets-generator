export const PartnerTypeEnum = {
	EventPartner: 'event-partner',
	Sponsor: 'sponsor',
	OnlyLogo: 'only-logo',
} as const;

export type PartnerType =
	(typeof PartnerTypeEnum)[keyof typeof PartnerTypeEnum];
