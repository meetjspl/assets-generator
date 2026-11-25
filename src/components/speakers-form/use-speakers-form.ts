import { zodResolver } from '@hookform/resolvers/zod';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';

import { exportElementAsImage } from '@/lib/export-element-as-image';

import { EMPTY_SPEAKER, speakersFormSchema } from './speakers-form-schema';

export const useSpeakersForm = () => {
	const thumbnailRef = useRef<HTMLDivElement>(null);
	const form = useForm({
		defaultValues: { speakers: [EMPTY_SPEAKER] },
		resolver: zodResolver(speakersFormSchema),
		mode: 'onChange',
	});

	const isCompleted = form.formState.isValid;

	const handleThumbnailExport = form.handleSubmit(async ({ city }) => {
		if (!thumbnailRef.current) return;

		await exportElementAsImage(
			thumbnailRef.current,
			`meet.js ${city} speakers`,
		);
	});

	return { isCompleted, form, thumbnailRef, handleThumbnailExport };
};
