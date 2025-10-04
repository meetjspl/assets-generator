import type { PartnerType } from '@/components/event-form/partner-type.ts';

interface EventFormThumbnailSponsorsProps {
	readonly partners: File[];
	readonly partnerType: PartnerType;
}

export const EventFormThumbnailSponsors = ({
	partners,
	partnerType,
}: EventFormThumbnailSponsorsProps) => (
	<div className="relative flex h-full flex-col items-center justify-center bg-white">
		{partnerType !== 'only-logo' && (
			<h2 className="text-2xl font-extrabold uppercase">
				{partnerType === 'event-partner' && 'Event Partner'}
				{partnerType === 'sponsor' && 'Sponsor'}
				{partners.length > 1 && 's'}
			</h2>
		)}
		{partners.map(partner => (
			<img
				key={partner.name}
				alt={partner.name}
				src={URL.createObjectURL(partner)}
				className="px-10"
			/>
		))}
	</div>
);
