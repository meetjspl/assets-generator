import { HeroUIProvider } from '@heroui/react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { App } from './app';

import '@/assets/styles/global.css';

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
	<StrictMode>
		<HeroUIProvider>
			<App />
		</HeroUIProvider>
	</StrictMode>,
);
