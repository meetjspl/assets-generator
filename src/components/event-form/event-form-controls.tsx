import {
	Checkbox,
	DatePicker,
	Input,
	Radio,
	RadioGroup,
	Select,
	SelectItem,
} from '@heroui/react';
import { fromDate, getLocalTimeZone } from '@internationalized/date';
import { Activity } from 'react';
import { Controller } from 'react-hook-form';

import { Supporter } from '@/components/event-form/event-form-types';
import { cities } from '@/data/cities';

import type { UseFormReturn } from 'react-hook-form';

import type { EventFormValues } from './event-form-schema';

interface EventFormControlsProps {
	readonly form: UseFormReturn<EventFormValues>;
}

export const EventFormControls = ({
	form: { control, setValue, watch },
}: EventFormControlsProps) => {
	const withSupporters = watch('withSupporters');

	return (
		<>
			<Controller
				control={control}
				name="city"
				render={({ field: { value, onChange, ...field } }) => (
					<Select
						label="City"
						placeholder="Select a city"
						isRequired
						selectedKeys={[value]}
						onChange={({ target: { value } }) => {
							setValue('title', `meet.js ${value}`);
							onChange(value);
						}}
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
				name="title"
				render={({ field: { onChange, ...field } }) => (
					<Input
						label="Title"
						placeholder="Enter a title"
						isRequired
						onValueChange={onChange}
						{...field}
					/>
				)}
			/>
			<Controller
				control={control}
				name="location"
				render={({ field: { onChange, ...field } }) => (
					<Input
						label="Location"
						placeholder="Enter a location"
						isRequired
						onValueChange={onChange}
						{...field}
					/>
				)}
			/>
			<Controller
				control={control}
				name="date"
				render={({ field: { value, onChange, ...field } }) => (
					<DatePicker
						label="Date"
						isRequired
						granularity="minute"
						hideTimeZone
						hourCycle={24}
						value={value ? fromDate(value, getLocalTimeZone()) : null}
						onChange={dateTime => onChange(dateTime?.toDate() ?? null)}
						{...field}
					/>
				)}
			/>
			<Controller
				control={control}
				name="withSupporters"
				render={({ field: { value, onChange, ...field } }) => (
					<Checkbox isSelected={value} onValueChange={onChange} {...field}>
						Supporter
					</Checkbox>
				)}
			/>
			<Activity mode={withSupporters ? 'visible' : 'hidden'}>
				<Controller
					control={control}
					name="supporterImages"
					render={({ field: { onChange } }) => (
						<Input
							type="file"
							accept="image/*"
							multiple
							label="Supporters' logos"
							isRequired
							onChange={({ target: { files } }) =>
								files && onChange([...files])
							}
						/>
					)}
				/>
				<Controller
					control={control}
					name="supporter"
					render={({ field: { value, onChange, ...field } }) => (
						<RadioGroup
							isRequired
							label="Select supporter type"
							orientation="horizontal"
							value={value === null ? '' : value}
							onValueChange={value => onChange(value === '' ? null : value)}
							{...field}
						>
							<Radio value={Supporter.EventPartner}>Event partner</Radio>
							<Radio value={Supporter.Sponsor}>Sponsor</Radio>
							<Radio value="">Logo only</Radio>
						</RadioGroup>
					)}
				/>
			</Activity>
		</>
	);
};
