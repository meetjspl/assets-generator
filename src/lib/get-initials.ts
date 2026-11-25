export const getInitials = (...names: (string | undefined)[]) =>
	names
		.map(name => name?.trim().charAt(0))
		.filter(Boolean)
		.join('')
		.toUpperCase();
