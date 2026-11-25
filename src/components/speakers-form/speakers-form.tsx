import { EventFormExportButton } from '@/components/event-form/event-form-export-button';

import { SpeakersFormControls } from './speakers-form-controls';
import { SpeakersFormThumbnail } from './speakers-form-thumbnail';
import { useSpeakersForm } from './use-speakers-form';

export const SpeakersForm = () => {
	const { isCompleted, form, thumbnailRef, handleThumbnailExport } =
		useSpeakersForm();

	return (
		<form
			onSubmit={handleThumbnailExport}
			className="flex flex-col gap-y-4 md:flex-row md:gap-x-6"
		>
			<div className="flex flex-1 flex-col gap-y-4">
				<SpeakersFormControls form={form} />
				<EventFormExportButton isDisabled={!isCompleted} />
			</div>
			<div>
				<SpeakersFormThumbnail form={form} ref={thumbnailRef} />
			</div>
		</form>
	);
};
