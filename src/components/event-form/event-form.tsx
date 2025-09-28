import { EventFormControls } from './event-form-controls';
import { EventFormExportButton } from './event-form-export-button';
import { EventFormThumbnail } from './event-form-thumbnail';
import { useEventForm } from './use-event-form';

export const EventForm = () => {
	const { isCompleted, form, thumbnailRef, handleThumbnailExport } =
		useEventForm();

	return (
		<form
			onSubmit={handleThumbnailExport}
			className="flex flex-col gap-y-4 md:flex-row md:gap-x-6"
		>
			<div className="flex flex-1 flex-col gap-y-4">
				<EventFormControls form={form} />
				<EventFormExportButton isDisabled={!isCompleted} />
			</div>
			<EventFormThumbnail form={form} ref={thumbnailRef} />
		</form>
	);
};
