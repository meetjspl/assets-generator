export interface EventData {
	city: string;
	title: string;
	isSponsor: boolean | 'indeterminate';
	location: string;
	date: Date | undefined;
	time: string;
}
