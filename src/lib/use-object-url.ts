import { useEffect, useState } from 'react';

/** Creates an object URL for a file and revokes it when the file changes or the component unmounts. */
export const useObjectUrl = (file?: File | null) => {
	const [url, setUrl] = useState<string>();

	useEffect(() => {
		if (!file) {
			setUrl(undefined);
			return;
		}

		const objectUrl = URL.createObjectURL(file);
		setUrl(objectUrl);

		return () => URL.revokeObjectURL(objectUrl);
	}, [file]);

	return url;
};
