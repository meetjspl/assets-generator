import { EventFormThumbnailDetails } from '@/components/event-form/event-form-thumbnail/event-form-thumbnail-details';
import { EventFormThumbnailMeetjsLogo } from '@/components/event-form/event-form-thumbnail/event-form-thumbnail-meetjs-logo';
import { SpeakerPhoto } from '@/components/speaker-photo';
import { formatDate } from '@/lib/date-formatter';
import { getInitials } from '@/lib/get-initials';
import { useObjectUrl } from '@/lib/use-object-url';

import type { Ref } from 'react';
import type { UseFormReturn } from 'react-hook-form';

import type { SpeakerFormValues } from './speaker-form-schema';

const formatSpeakerDetails = ({ date, city }: { date?: Date; city?: string }) =>
	[date && formatDate(date), city && `meet.js ${city}`]
		.filter(Boolean)
		.join(' // ');

interface SpeakerFormThumbnailProps {
	readonly form: UseFormReturn<SpeakerFormValues>;
	readonly ref: Ref<HTMLDivElement>;
}

export const SpeakerFormThumbnail = ({
	form,
	ref,
}: SpeakerFormThumbnailProps) => {
	const values = form.watch();
	const photoUrl = useObjectUrl(values.photo);
	const details = formatSpeakerDetails(values);

	return (
		<div className="border-primary overflow-auto rounded-lg border-4">
			<article
				ref={ref}
				className="grid aspect-video w-240 grid-cols-3 bg-purple"
			>
				<div className="relative col-span-2 flex flex-col overflow-hidden pt-16 pr-10 pl-25">
					<EventFormThumbnailMeetjsLogo />
					<p className="mt-8 text-lg font-bold tracking-widest text-blue uppercase">
						Speaker
					</p>
					<h2 className="mt-2 text-5xl leading-tight font-bold text-white">
						{values.firstName}
						<br />
						{values.lastName}
					</h2>
					<p className="mt-6 text-2xl font-bold text-blue">
						{values.talkTitle}
					</p>
					{values.talkSubtitle && (
						<p className="mt-1 text-lg font-medium text-white/75">
							{values.talkSubtitle}
						</p>
					)}
					<EventFormThumbnailDetails
						details={details}
						className="mt-auto mb-14"
					/>
				</div>
				<div className="relative col-span-1">
					{photoUrl ? (
						<SpeakerPhoto url={photoUrl} />
					) : (
						<div className="flex h-full items-center justify-center bg-white text-8xl font-bold text-purple">
							{getInitials(values.firstName, values.lastName)}
						</div>
					)}
					<div className="absolute top-24 -left-3 h-24 w-3 bg-green" />
					<div className="absolute bottom-20 -left-8 h-10 w-16 bg-blue" />
					<div className="absolute right-10 bottom-0 h-3 w-10 bg-green" />
				</div>
			</article>
		</div>
	);
};
