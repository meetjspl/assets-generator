import { zodResolver } from '@hookform/resolvers/zod';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';

import { Supporter } from '@/components/event-form/event-form-types.ts';
import { exportElementAsImage } from '@/lib/export-element-as-image';

import { eventFormSchema } from './event-form-schema';

export const useEventForm = () => {
	const thumbnailRef = useRef<HTMLDivElement>(null);
	const form = useForm({
		defaultValues: { withSupporters: true, supporter: Supporter.Sponsor },
		resolver: zodResolver(eventFormSchema),
	});

	const isCompleted = form.formState.isValid;

	const handleThumbnailExport = form.handleSubmit(async ({ title }) => {
		if (!thumbnailRef.current) return;

		await exportElementAsImage(thumbnailRef.current, title);
	});

	return { isCompleted, form, thumbnailRef, handleThumbnailExport };
};
