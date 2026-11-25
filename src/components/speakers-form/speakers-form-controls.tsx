import {
	Button,
	Card,
	CardBody,
	CardHeader,
	DatePicker,
	Input,
	Select,
	SelectItem,
} from '@heroui/react';
import { fromDate, getLocalTimeZone } from '@internationalized/date';
import { Controller, useFieldArray } from 'react-hook-form';

import { cities } from '@/data/cities';

import { EMPTY_SPEAKER, MAX_SPEAKERS } from './speakers-form-schema';

import type { UseFormReturn } from 'react-hook-form';

import type { SpeakersFormValues } from './speakers-form-schema';

interface SpeakersFormControlsProps {
	readonly form: UseFormReturn<SpeakersFormValues>;
}

export const SpeakersFormControls = ({
	form: { control },
}: SpeakersFormControlsProps) => {
	const { fields, append, remove } = useFieldArray({
		control,
		name: 'speakers',
	});

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
			{fields.map((item, index) => (
				<Card key={item.id} shadow="sm">
					<CardHeader className="justify-between">
						<span className="font-semibold">Speaker {index + 1}</span>
						<Button
							size="sm"
							variant="light"
							color="danger"
							isDisabled={fields.length === 1}
							onPress={() => remove(index)}
						>
							Remove
						</Button>
					</CardHeader>
					<CardBody className="gap-y-4">
						<div className="flex gap-x-4">
							<Controller
								control={control}
								name={`speakers.${index}.firstName`}
								render={({ field: { onChange, ...field } }) => (
									<Input
										label="First name"
										isRequired
										onValueChange={onChange}
										{...field}
									/>
								)}
							/>
							<Controller
								control={control}
								name={`speakers.${index}.lastName`}
								render={({ field: { onChange, ...field } }) => (
									<Input
										label="Last name"
										isRequired
										onValueChange={onChange}
										{...field}
									/>
								)}
							/>
						</div>
						<Controller
							control={control}
							name={`speakers.${index}.talkTitle`}
							render={({ field: { onChange, ...field } }) => (
								<Input
									label="Talk title"
									isRequired
									onValueChange={onChange}
									{...field}
								/>
							)}
						/>
						<Controller
							control={control}
							name={`speakers.${index}.talkSubtitle`}
							render={({ field: { onChange, ...field } }) => (
								<Input
									label="Talk subtitle (optional)"
									onValueChange={onChange}
									{...field}
								/>
							)}
						/>
						<Controller
							control={control}
							name={`speakers.${index}.photo`}
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
					</CardBody>
				</Card>
			))}
			<Button
				variant="bordered"
				isDisabled={fields.length >= MAX_SPEAKERS}
				onPress={() => append(EMPTY_SPEAKER)}
			>
				Add speaker ({fields.length}/{MAX_SPEAKERS})
			</Button>
		</>
	);
};
