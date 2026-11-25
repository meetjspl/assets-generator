import { EventFormExportButton } from '@/components/event-form/event-form-export-button';

import { SpeakerFormControls } from './speaker-form-controls';
import { SpeakerFormThumbnail } from './speaker-form-thumbnail';
import { useSpeakerForm } from './use-speaker-form';

export const SpeakerForm = () => {
	const { isCompleted, form, thumbnailRef, handleThumbnailExport } =
		useSpeakerForm();

	return (
		<form
			onSubmit={handleThumbnailExport}
			className="flex flex-col gap-y-4 md:flex-row md:gap-x-6"
		>
			<div className="flex flex-1 flex-col gap-y-4">
				<SpeakerFormControls form={form} />
				<EventFormExportButton isDisabled={!isCompleted} />
			</div>
			<SpeakerFormThumbnail form={form} ref={thumbnailRef} />
		</form>
	);
};
