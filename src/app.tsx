import { EventDataForm } from '@/components/event-data-form.tsx';
import { Footer } from '@/components/footer.tsx';
import { useState } from 'react';

import { Preview } from './components/preview';

import type { EventData } from '@/types/event-data.ts';

export const App = () => {
	const [data, setData] = useState<EventData>({
		city: 'wroclaw',
		title: 'meet.js Wrocław 25.09',
		isSponsor: false,
		location: '',
		date: new Date('2025-09-25'),
		time: '18:00',
	});

	return (
		<>
			<header>
				<h1 className="text-center text-2xl font-bold">
					meet.js Assets Generator 2.0
				</h1>
			</header>
			<EventDataForm data={data} onDataChange={setData} />
			<Preview />
			<Footer />
		</>
	);
};
