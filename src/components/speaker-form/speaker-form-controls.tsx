import { DatePicker, Input, Select, SelectItem } from '@heroui/react';
import { fromDate, getLocalTimeZone } from '@internationalized/date';
import { Controller } from 'react-hook-form';

import { cities } from '@/data/cities';

import type { UseFormReturn } from 'react-hook-form';

import type { SpeakerFormValues } from './speaker-form-schema';

interface SpeakerFormControlsProps {
	readonly form: UseFormReturn<SpeakerFormValues>;
}

export const SpeakerFormControls = ({
	form: { control },
}: SpeakerFormControlsProps) => (
	<>
		<div className="flex gap-x-4">
			<Controller
				control={control}
				name="firstName"
				render={({ field: { onChange, ...field } }) => (
					<Input
						label="First name"
						placeholder="Enter a first name"
						isRequired
						onValueChange={onChange}
						{...field}
					/>
				)}
			/>
			<Controller
				control={control}
				name="lastName"
				render={({ field: { onChange, ...field } }) => (
					<Input
						label="Last name"
						placeholder="Enter a last name"
						isRequired
						onValueChange={onChange}
						{...field}
					/>
				)}
			/>
		</div>
		<Controller
			control={control}
			name="talkTitle"
			render={({ field: { onChange, ...field } }) => (
				<Input
					label="Talk title"
					placeholder="Enter a talk title"
					isRequired
					onValueChange={onChange}
					{...field}
				/>
			)}
		/>
		<Controller
			control={control}
			name="talkSubtitle"
			render={({ field: { onChange, ...field } }) => (
				<Input
					label="Talk subtitle (optional)"
					placeholder="Enter a talk subtitle"
					onValueChange={onChange}
					{...field}
				/>
			)}
		/>
		<Controller
			control={control}
			name="city"
			render={({ field: { value, onChange, ...field } }) => (
				<Select
					label="City"
					placeholder="Select a city"
					isRequired
					selectedKeys={value ? [value] : []}
					onChange={({ target: { value } }) => onChange(value)}
					{...field}
				>
					{cities.map(city => (
						<SelectItem key={city}>{city}</SelectItem>
					))}
				</Select>
			)}
		/>
		<Controller
			control={control}
			name="date"
			render={({ field: { value, onChange, ...field } }) => (
				<DatePicker
					label="Date"
					isRequired
					granularity="day"
					value={value ? fromDate(value, getLocalTimeZone()) : null}
					onChange={dateTime => onChange(dateTime?.toDate() ?? null)}
					{...field}
				/>
			)}
		/>
		<Controller
			control={control}
			name="photo"
			render={({ field: { onChange } }) => (
				<Input
					type="file"
					accept="image/*"
					label="Photo (optional)"
					onChange={({ target: { files } }) =>
						onChange(files?.[0] ?? undefined)
					}
				/>
			)}
		/>
	</>
);
