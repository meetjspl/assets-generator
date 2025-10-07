import { SupporterType } from '@/components/event-form/supporter-type.ts';

interface EventFormThumbnailSupportersProps {
	readonly supporters: File[];
	readonly supporterType: SupporterType;
}

export const EventFormThumbnailSupporters = ({
	supporters,
	supporterType,
}: EventFormThumbnailSupportersProps) => (
	<div className="relative flex h-full flex-col items-center justify-center bg-white">
		{supporterType !== SupporterType.OnlyLogo && (
			<h2 className="text-2xl font-extrabold uppercase">
				{supporterType === SupporterType.EventPartner && 'Event Partner'}
				{supporterType === SupporterType.Sponsor && 'Sponsor'}
				{supporters.length > 1 && 's'}
			</h2>
		)}
		{supporters.map(partner => (
			<img
				key={partner.name}
				alt={partner.name}
				src={URL.createObjectURL(partner)}
				className="px-10"
			/>
		))}
	</div>
);
