import { Button } from '@/components/ui/button';
import { MeetjsLogo } from '@/meetjs-logo';
import html2canvas from 'html2canvas-pro';
import { useRef } from 'react';

export const Preview = () => {
	const ref = useRef<HTMLDivElement>(null);

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
					link.download = 'event-name.png';
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
						<h2 className="mt-10 text-4xl font-semibold text-white">
							meet.js Wrocław 25.09
						</h2>
						<p className="mt-20 text-xl font-bold text-green">
							25.09.2025 // 18:00 // Pawła Włodkowica 5, 50-072 Wrocław
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
						{/* <div className="relative flex h-full items-center justify-center bg-white">
							<img
								alt="Sponsor"
								src="https://media.discordapp.net/attachments/1248918286549123229/1421241233686139121/airSlate-logo-transparent-bg.png?ex=68d8518b&is=68d7000b&hm=cf778ee2ecffa673c2e62b05e1735a4a9895d24b6fc8b4c76ad14e93dcdc864a&=&format=webp&quality=lossless"
								className="object-cover"
							/>
						</div> */}
					</div>
				</div>
			</div>
		</>
	);
};
