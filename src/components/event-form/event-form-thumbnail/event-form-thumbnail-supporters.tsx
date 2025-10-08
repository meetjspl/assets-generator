import { Supporter } from '@/components/event-form/event-form-types';

interface EventFormThumbnailSupportersProps {
	readonly supporter: Supporter | null;
	readonly supporterImages: File[];
}

export const EventFormThumbnailSupporters = ({
	supporter,
	supporterImages,
}: EventFormThumbnailSupportersProps) => (
	<div className="relative flex h-full flex-col items-center justify-center bg-white">
		{supporter !== null && (
			<h2 className="text-2xl font-extrabold uppercase">
				{supporter === Supporter.EventPartner && 'Event Partner'}
				{supporter === Supporter.Sponsor && 'Sponsor'}
				{supporterImages.length > 1 && 's'}
			</h2>
		)}
		{supporterImages.map(supporter => (
			<img
				key={supporter.name}
				alt={supporter.name}
				src={URL.createObjectURL(supporter)}
				className="px-10"
			/>
		))}
	</div>
);
