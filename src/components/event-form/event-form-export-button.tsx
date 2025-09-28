import { Button } from '@heroui/react';

interface EventFormExportButtonProps {
	readonly isDisabled: boolean;
}

export const EventFormExportButton = ({
	isDisabled,
}: EventFormExportButtonProps) => (
	<Button type="submit" isDisabled={isDisabled} color="primary" fullWidth>
		Export
	</Button>
);
