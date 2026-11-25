interface SpeakerPhotoProps {
	readonly url: string;
}

/**
 * Fills its (relatively positioned) parent with the photo, cropped from the top so heads are never cut.
 * Rendered as a background image because html2canvas ignores `object-position` on <img>.
 */
export const SpeakerPhoto = ({ url }: SpeakerPhotoProps) => (
	<div
		role="img"
		aria-hidden
		className="absolute inset-0 bg-cover bg-top bg-no-repeat"
		style={{ backgroundImage: `url("${url}")` }}
	/>
);
