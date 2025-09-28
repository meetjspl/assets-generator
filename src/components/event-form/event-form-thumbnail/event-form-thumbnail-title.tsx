interface EventFormThumbnailTitleProps {
	readonly title: string;
}

export const EventFormThumbnailTitle = ({
	title,
}: EventFormThumbnailTitleProps) => (
	<h2 className="mt-10 text-4xl font-semibold text-white">{title}</h2>
);
