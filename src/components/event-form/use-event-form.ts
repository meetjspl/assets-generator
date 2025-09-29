import { zodResolver } from '@hookform/resolvers/zod';
import html2canvas from 'html2canvas-pro';
import kebabCase from 'lodash/kebabCase';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';

import { downloadResource } from '@/lib/download-resource';

import { eventFormSchema } from './event-form-schema';

export const useEventForm = () => {
	const thumbnailRef = useRef<HTMLDivElement>(null);
	const form = useForm({
		defaultValues: { withPartners: false },
		resolver: zodResolver(eventFormSchema),
	});

	const isCompleted = form.formState.isValid;

	const handleThumbnailExport = form.handleSubmit(async ({ title }) => {
		if (!thumbnailRef.current) return;

		const canvas = await html2canvas(thumbnailRef.current, { scale: 2 });
		const dataUrl = canvas.toDataURL('image/webp');

		downloadResource(dataUrl, { name: kebabCase(title), extension: 'webp' });
	});

	return { isCompleted, form, thumbnailRef, handleThumbnailExport };
};
