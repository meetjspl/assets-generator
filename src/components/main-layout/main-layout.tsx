import { MainLayoutFooter } from './main-layout-footer';
import { MainLayoutHeader } from './main-layout-header';

import type { ReactNode } from 'react';

interface MainLayoutProps {
	readonly children: ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => (
	<div className="mx-auto max-w-350 space-y-6 p-2 md:pt-10">
		<MainLayoutHeader />
		<main>{children}</main>
		<MainLayoutFooter />
	</div>
);
