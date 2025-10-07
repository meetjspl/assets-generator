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

import { SupporterTypeEnum } from '@/components/event-form/supporter-type.ts';
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
						Partner
					</Checkbox>
				)}
			/>
			{withSupporters && (
				<>
					<Controller
						control={control}
						name="supporters"
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
						name="supporterType"
						render={({
							field: { onChange, value = SupporterTypeEnum.EventPartner },
						}) => (
							<RadioGroup
								isRequired
								label="Select partner type"
								orientation="horizontal"
								value={value}
								onChange={onChange}
							>
								<Radio value={SupporterTypeEnum.EventPartner}>
									Event partner
								</Radio>
								<Radio value={SupporterTypeEnum.Sponsor}>Sponsor</Radio>
								<Radio value={SupporterTypeEnum.OnlyLogo}>Only logo</Radio>
							</RadioGroup>
						)}
					/>
				</>
			)}
		</>
	);
};
