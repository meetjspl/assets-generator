import { DateFormatter } from '@internationalized/date';

const LOCALE = 'pl-PL';

export const formatDate = (date: Date) =>
	new DateFormatter(LOCALE, {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric',
	}).format(date);

export const formatTime = (date: Date) =>
	new DateFormatter(LOCALE, {
		hour: '2-digit',
		minute: '2-digit',
	}).format(date);
