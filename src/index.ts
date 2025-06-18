// import { useCollectionsStore } from '@/stores/collections';
// import { getGroups } from '@/utils/get-groups';
import { definePanel } from '@directus/extensions';
// import { Filter } from '@directus/types';
import HTMLPanelComponent from './html-panel.vue';
//import PreviewSVG from './preview.svg?raw';

export default definePanel({
	id: 'html-panel',
	name: 'HTML Panel',
	description: 'HTML Panel - arbitrary HTML content inside your Directus Insights dashboards',
	icon: 'box',
	component: HTMLPanelComponent,
	options: [
		{
			field: 'html',
			type: 'string',
			name: 'html',
			meta: {
				interface: 'input',
				width: 'full'
			},
		}
	],
	minWidth: 12,
	minHeight: 6,
});