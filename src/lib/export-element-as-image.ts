import html2canvas from 'html2canvas-pro';
import kebabCase from 'lodash/kebabCase';

import { downloadResource } from '@/lib/download-resource';

export const exportElementAsImage = async (
	element: HTMLElement,
	name: string,
) => {
	const canvas = await html2canvas(element, { scale: 2 });
	const dataUrl = canvas.toDataURL('image/webp');

	downloadResource(dataUrl, { name: kebabCase(name), extension: 'webp' });
};
