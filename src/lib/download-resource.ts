export const downloadResource = (
	url: string,
	{ name, extension }: { name: string; extension: string },
) => {
	const link = document.createElement('a');

	link.href = url;
	link.download = `${name}.${extension}`;

	link.click();
};
