interface EventFormThumbnailDetailsProps {
	readonly details: string;
	readonly className?: string;
}

export const EventFormThumbnailDetails = ({
	details,
	className = 'mt-20',
}: EventFormThumbnailDetailsProps) => (
	<p
		className={`relative text-xl font-bold text-green before:absolute before:top-1/2 before:-left-25 before:block before:h-17 before:w-20 before:-translate-y-1/2 before:bg-green ${className}`}
	>
		{details}
	</p>
);
