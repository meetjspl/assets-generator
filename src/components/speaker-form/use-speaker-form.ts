import { zodResolver } from '@hookform/resolvers/zod';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';

import { exportElementAsImage } from '@/lib/export-element-as-image';

import { speakerFormSchema } from './speaker-form-schema';

export const useSpeakerForm = () => {
	const thumbnailRef = useRef<HTMLDivElement>(null);
	const form = useForm({
		defaultValues: {
			firstName: '',
			lastName: '',
			talkTitle: '',
			talkSubtitle: '',
		},
		resolver: zodResolver(speakerFormSchema),
		mode: 'onChange',
	});

	const isCompleted = form.formState.isValid;

	const handleThumbnailExport = form.handleSubmit(
		async ({ firstName, lastName, city }) => {
			if (!thumbnailRef.current) return;

			await exportElementAsImage(
				thumbnailRef.current,
				`meet.js ${city} speaker ${firstName} ${lastName}`,
			);
		},
	);

	return { isCompleted, form, thumbnailRef, handleThumbnailExport };
};
