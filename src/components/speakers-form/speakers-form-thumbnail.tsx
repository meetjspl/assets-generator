import { EventFormThumbnailMeetjsLogo } from '@/components/event-form/event-form-thumbnail/event-form-thumbnail-meetjs-logo';
import { SpeakerPhoto } from '@/components/speaker-photo';
import { formatDate } from '@/lib/date-formatter';
import { getInitials } from '@/lib/get-initials';
import { useObjectUrl } from '@/lib/use-object-url';

import type { Ref } from 'react';
import type { UseFormReturn } from 'react-hook-form';

import type { SpeakerValues, SpeakersFormValues } from './speakers-form-schema';

// 1–3 speakers sit in one row of large cards, 4 in a 2×2 grid, 5–6 in a denser 2×3 grid.
const CARD_SIZES = {
	large: {
		card: 'flex-col',
		photo: 'h-44 w-44 text-5xl',
		name: 'text-2xl',
		title: 'text-base',
		subtitle: 'text-sm',
	},
	compact: {
		card: 'flex-row items-center',
		photo: 'h-24 w-24 text-3xl',
		name: 'text-lg',
		title: 'text-sm',
		subtitle: 'text-xs',
	},
	dense: {
		card: 'flex-row items-center',
		photo: 'h-20 w-20 text-2xl',
		name: 'text-base',
		title: 'text-sm',
		subtitle: 'text-xs',
	},
} as const;

type CardSize = keyof typeof CARD_SIZES;

const getLayout = (count: number): { columns: number; size: CardSize } => {
	if (count <= 3) return { columns: Math.max(count, 1), size: 'large' };
	if (count === 4) return { columns: 2, size: 'compact' };
	return { columns: 2, size: 'dense' };
};

interface SpeakerCardProps {
	readonly speaker: Partial<SpeakerValues>;
	readonly size: CardSize;
}

const SpeakerCard = ({ speaker, size }: SpeakerCardProps) => {
	const photoUrl = useObjectUrl(speaker.photo);
	const classes = CARD_SIZES[size];

	return (
		<li className={`flex gap-4 ${classes.card}`}>
			<div className={`relative shrink-0 ${classes.photo}`}>
				{photoUrl ? (
					<SpeakerPhoto url={photoUrl} />
				) : (
					<div className="flex h-full w-full items-center justify-center bg-white font-bold text-purple">
						{getInitials(speaker.firstName, speaker.lastName)}
					</div>
				)}
				<div className="absolute -bottom-2 -left-2 h-2 w-1/2 bg-green" />
			</div>
			<div className="min-w-0">
				<p className={`font-bold text-white ${classes.name}`}>
					{speaker.firstName} {speaker.lastName}
				</p>
				<p className={`mt-1 font-bold text-blue ${classes.title}`}>
					{speaker.talkTitle}
				</p>
				{speaker.talkSubtitle && (
					<p className={`font-medium text-white/75 ${classes.subtitle}`}>
						{speaker.talkSubtitle}
					</p>
				)}
			</div>
		</li>
	);
};

interface SpeakersFormThumbnailProps {
	readonly form: UseFormReturn<SpeakersFormValues>;
	readonly ref: Ref<HTMLDivElement>;
}

export const SpeakersFormThumbnail = ({
	form,
	ref,
}: SpeakersFormThumbnailProps) => {
	const values = form.watch();
	const speakers = values.speakers ?? [];
	const { columns, size } = getLayout(speakers.length);
	const details = [
		values.date && formatDate(values.date),
		values.city && `meet.js ${values.city}`,
	]
		.filter(Boolean)
		.join(' // ');

	return (
		<div className="border-primary overflow-auto rounded-lg border-4">
			<article
				ref={ref}
				className="relative flex aspect-video w-240 flex-col overflow-hidden bg-purple px-25 pt-12 pb-10"
			>
				<header className="flex items-end justify-between">
					<EventFormThumbnailMeetjsLogo />
					<div className="text-right">
						<p className="text-lg font-bold tracking-widest text-blue uppercase">
							Speakers
						</p>
						<p className="mt-1 text-xl font-bold text-green">{details}</p>
					</div>
				</header>
				<ul
					className={`my-auto grid gap-x-8 ${size === 'dense' ? 'gap-y-5' : 'gap-y-8'}`}
					style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
				>
					{speakers.map((speaker, index) => (
						<SpeakerCard key={index} speaker={speaker} size={size} />
					))}
				</ul>
				<div className="absolute top-0 right-25 h-3 w-20 bg-blue" />
				<div className="absolute right-10 bottom-16 h-35 w-2 bg-green" />
				<div className="absolute bottom-0 left-25 h-3 w-10 bg-blue" />
			</article>
		</div>
	);
};
