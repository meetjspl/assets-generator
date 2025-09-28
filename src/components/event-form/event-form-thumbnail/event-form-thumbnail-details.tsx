interface EventFormThumbnailDetailsProps {
	readonly details: string;
}

export const EventFormThumbnailDetails = ({
	details,
}: EventFormThumbnailDetailsProps) => (
	<p className="relative mt-20 text-xl font-bold text-green before:absolute before:top-1/2 before:-left-25 before:block before:h-17 before:w-20 before:-translate-y-1/2 before:bg-green">
		{details}
	</p>
);
