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
import { Controller } from 'react-hook-form';

import { cities } from '@/data/cities';

import type { UseFormReturn } from 'react-hook-form';

import type { EventFormValues } from './event-form-schema';

interface EventFormControlsProps {
	readonly form: UseFormReturn<EventFormValues>;
}

export const EventFormControls = ({
	form: { control, setValue, watch },
}: EventFormControlsProps) => {
	const withPartners = watch('withPartners');

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
				name="withPartners"
				render={({ field: { value, onChange, ...field } }) => (
					<Checkbox isSelected={value} onValueChange={onChange} {...field}>
						Partner
					</Checkbox>
				)}
			/>
			{withPartners && (
				<>
					<Controller
						control={control}
						name="partners"
						render={({ field: { onChange } }) => (
							<Input
								type="file"
								accept="image/*"
								multiple
								label="Partners' logos"
								isRequired
								onChange={({ target: { files } }) =>
									files && onChange([...files])
								}
							/>
						)}
					/>
					<Controller
						control={control}
						name="partnerType"
						render={({ field: { onChange } }) => (
							<RadioGroup
								label="Select partner type"
								orientation="horizontal"
								defaultValue="event-partner"
								onChange={onChange}
							>
								<Radio value="event-partner">Event partner</Radio>
								<Radio value="sponsor">Sponsor</Radio>
								<Radio value="only-logo">Only logo</Radio>
							</RadioGroup>
						)}
					/>
				</>
			)}
		</>
	);
};
