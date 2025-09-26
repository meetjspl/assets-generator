import { Button } from '@/components/ui/button';
import { MeetjsLogo } from '@/meetjs-logo';
import { format } from 'date-fns';
import html2canvas from 'html2canvas-pro';
import { useRef } from 'react';

import type { EventData } from '@/types/event-data.ts';

interface PreviewProps {
	data: EventData;
}

export const Preview = ({
	data: { title, date, time, location, sponsor },
}: PreviewProps) => {
	const ref = useRef<HTMLDivElement>(null);

	const sponsorImageUrl = sponsor && URL.createObjectURL(sponsor);

	return (
		<>
			<Button
				onClick={async () => {
					if (!ref.current) return;

					const canvas = await html2canvas(ref.current, {
						allowTaint: true,
						scale: 2,
					});
					const dataURL = canvas.toDataURL('image/png');

					const link = document.createElement('a');
					link.href = dataURL;
					link.download = `${title}.png`;
					link.click();
				}}
			>
				Export
			</Button>
			<div className="bg-zinc-400 p-10">
				<div
					ref={ref}
					className="relative grid aspect-16/9 w-240 grid-cols-4 bg-white"
				>
					<div className="relative col-span-3 bg-purple px-25 py-30">
						<MeetjsLogo />
						<h2 className="mt-10 text-4xl font-semibold text-white">{title}</h2>
						<p className="mt-20 text-xl font-bold text-green">
							{date && format(date, 'dd.MM.yyyy')} // {time} // {location}
						</p>
						{/* DECORATIONS */}
						<div className="absolute top-50 right-0 h-15 w-40 translate-x-1/2 bg-blue" />
						<div className="absolute bottom-33 left-0 h-17 w-20 bg-green" />
						<div className="absolute top-24 right-7 h-10 w-7 bg-green" />
					</div>
					<div className="relative col-span-1">
						{/* DECORATIONS */}
						<div className="absolute right-10 bottom-0 h-3 w-10 bg-blue" />
						<div className="absolute top-30 left-20 h-3 w-20 bg-blue" />
						<div className="absolute right-10 bottom-30 h-80 w-2 bg-green" />
						<div className="absolute bottom-16 left-18 h-35 w-2 bg-green" />
						{sponsorImageUrl && (
							<div className="relative flex h-full items-center justify-center bg-white">
								<img
									alt="Sponsor"
									src={sponsorImageUrl}
									className="object-cover"
								/>
							</div>
						)}
					</div>
				</div>
			</div>
		</>
	);
};
