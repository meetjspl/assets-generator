export const SupporterTypeEnum = {
	EventPartner: 'event-partner',
	Sponsor: 'sponsor',
	OnlyLogo: 'only-logo',
} as const;

export type SupporterType =
	(typeof SupporterTypeEnum)[keyof typeof SupporterTypeEnum];
