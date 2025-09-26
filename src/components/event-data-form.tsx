import { cities } from '@/cities.ts';
import { Button } from '@/components/ui/button.tsx';
import { Calendar } from '@/components/ui/calendar.tsx';
import { Checkbox } from '@/components/ui/checkbox.tsx';
import { Input } from '@/components/ui/input.tsx';
import { Label } from '@/components/ui/label.tsx';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover.tsx';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { ChevronDownIcon } from 'lucide-react';
import { useState } from 'react';

import type { EventData } from '@/types/event-data.ts';

interface ContentFormProps {
	data: EventData;
	onDataChange: (data: EventData) => void;
}

export const EventDataForm = ({ data, onDataChange }: ContentFormProps) => {
	const [open, setOpen] = useState(false);

	const getCityName = (city: string) =>
		cities.find(c => c.value === city)?.label;

	return (
		<section className="grid gap-2 p-4">
			<div className="grid w-full max-w-sm items-center gap-2">
				<Label htmlFor="city">City *</Label>
				<Select
					onValueChange={city => onDataChange({ ...data, city })}
					value={data.city}
				>
					<SelectTrigger className="w-[180px]" id="city">
						<SelectValue placeholder="City" />
					</SelectTrigger>
					<SelectContent>
						{cities.map(city => (
							<SelectItem key={city.value} value={city.value}>
								{city.label}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>

			<div className="flex items-center gap-2">
				<Checkbox
					id="sponsor"
					onCheckedChange={isSponsor => onDataChange({ ...data, isSponsor })}
					checked={data.isSponsor}
				/>
				<Label htmlFor="sponsor">Sponsor / Event partner</Label>
			</div>

			{data.isSponsor && (
				<div className="grid w-full max-w-sm items-center gap-2">
					<Label htmlFor="picture">Sponsor / Event partner logo *</Label>
					<Input id="picture" type="file" accept="image/*" />
				</div>
			)}

			<div className="grid w-full max-w-sm items-center gap-2">
				<Label htmlFor="title">Title *</Label>
				<Input
					type="text"
					id="title"
					placeholder="meet.js Wrocław 25.09"
					value={data.title}
					onChange={e => onDataChange({ ...data, title: e.target.value })}
				/>
			</div>

			<div className="grid w-full max-w-sm items-center gap-2">
				<Label htmlFor="location">Location</Label>
				<Input
					type="text"
					id="location"
					placeholder="ul. Pawła Włodkowica 5, 50-072 Wrocław"
					value={data.location}
					onChange={e => onDataChange({ ...data, location: e.target.value })}
				/>
			</div>

			<div className="flex gap-4">
				<div className="flex flex-col gap-2">
					<Label htmlFor="date-picker" className="px-1">
						Date *
					</Label>
					<Popover open={open} onOpenChange={setOpen}>
						<PopoverTrigger asChild>
							<Button
								variant="outline"
								id="date-picker"
								className="w-32 justify-between font-normal"
							>
								{data.date ? data.date.toLocaleDateString() : 'Select date'}
								<ChevronDownIcon />
							</Button>
						</PopoverTrigger>
						<PopoverContent
							className="w-auto overflow-hidden p-0"
							align="start"
						>
							<Calendar
								mode="single"
								selected={data.date}
								captionLayout="dropdown"
								onSelect={date => {
									onDataChange({ ...data, date });
									setOpen(false);
								}}
							/>
						</PopoverContent>
					</Popover>
				</div>
				<div className="flex flex-col gap-2">
					<Label htmlFor="time-picker" className="px-1">
						Time *
					</Label>
					<Input
						type="time"
						id="time-picker"
						value={data.time}
						onChange={e => onDataChange({ ...data, time: e.target.value })}
						className="appearance-none bg-background [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
					/>
				</div>
			</div>

			<p>
				City: {getCityName(data.city)}, Title: {data.title} , Is sponsor:{' '}
				{data.isSponsor ? 'Yes' : 'No'}, Date: {data.date?.toLocaleDateString()}
				, Time: {data.time}, Location: {data.location}
			</p>
		</section>
	);
};
