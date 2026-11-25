import { Tab, Tabs } from '@heroui/react';

import { EventForm } from '@/components/event-form';
import { MainLayout } from '@/components/main-layout';
import { SpeakerForm } from '@/components/speaker-form';
import { SpeakersForm } from '@/components/speakers-form';

export const App = () => (
	<MainLayout>
		<Tabs aria-label="Asset type" color="primary" fullWidth>
			<Tab key="event" title="Event">
				<EventForm />
			</Tab>
			<Tab key="speaker" title="Speaker">
				<SpeakerForm />
			</Tab>
			<Tab key="speakers" title="All speakers">
				<SpeakersForm />
			</Tab>
		</Tabs>
	</MainLayout>
);
