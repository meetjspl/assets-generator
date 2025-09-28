interface EventFormThumbnailSponsorsProps {
	readonly partners: File[];
}

export const EventFormThumbnailSponsors = ({
	partners,
}: EventFormThumbnailSponsorsProps) => (
	<div className="relative flex h-full flex-col items-center justify-center bg-white">
		<h2 className="text-2xl font-extrabold uppercase">Event Partner</h2>
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
