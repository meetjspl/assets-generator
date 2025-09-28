import { EventFormThumbnailDetails } from '@/components/event-form/event-form-thumbnail/event-form-thumbnail-details.tsx';
import { EventFormThumbnailLeftSectionDecorations } from '@/components/event-form/event-form-thumbnail/event-form-thumbnail-left-section-decorations.tsx';
import { EventFormThumbnailMeetjsLogo } from '@/components/event-form/event-form-thumbnail/event-form-thumbnail-meetjs-logo.tsx';
import { EventFormThumbnailRightSectionDecorations } from '@/components/event-form/event-form-thumbnail/event-form-thumbnail-right-section-decorations.tsx';
import { EventFormThumbnailSponsors } from '@/components/event-form/event-form-thumbnail/event-form-thumbnail-sponsors.tsx';
import { EventFormThumbnailTitle } from '@/components/event-form/event-form-thumbnail/event-form-thumbnail-title.tsx';
import { formatDate, formatTime } from '@/lib/date-formatter';

import type { Ref } from 'react';
import type { UseFormReturn } from 'react-hook-form';

import type { EventFormValues } from '../event-form-schema';

const formatEventDetails = ({
	date,
	location,
}: {
	date?: Date;
	location?: string;
}) =>
	[...(date ? [formatDate(date), formatTime(date)] : []), location]
		.filter(Boolean)
		.join(' // ');

interface EventFormThumbnailProps {
	readonly form: UseFormReturn<EventFormValues>;
	readonly ref: Ref<HTMLDivElement>;
}

export const EventFormThumbnail = ({ form, ref }: EventFormThumbnailProps) => {
	const values = form.watch();
	const details = formatEventDetails({
		date: values.date,
		location: values.location,
	});

	return (
		<div className="border-primary overflow-auto rounded-lg border-4">
			<article
				ref={ref}
				className="grid aspect-video w-240 grid-cols-4 bg-white"
			>
				<div className="relative col-span-3 bg-purple pt-30 pr-5 pl-25">
					<EventFormThumbnailMeetjsLogo />
					<EventFormThumbnailTitle title={values.title} />
					<EventFormThumbnailDetails details={details} />
					<EventFormThumbnailLeftSectionDecorations />
				</div>
				<div className="relative col-span-1">
					<EventFormThumbnailRightSectionDecorations />
					{values.withPartners && values.partners?.length > 0 && (
						<EventFormThumbnailSponsors partners={values.partners} />
					)}
				</div>
			</article>
		</div>
	);
};
