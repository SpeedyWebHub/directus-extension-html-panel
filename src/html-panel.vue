<script lang="ts">
import { useApi, useStores } from '@directus/extensions-sdk';
import { defineComponent, onMounted, onUpdated, onBeforeUnmount, onUnmounted, ref, computed, watch, CSSProperties } from 'vue';
// import { useAutoFontFit } from './composables/use-auto-fit-text';
// import { formatNumber } from './utils/format-number';
// import type { Style, Notation, Unit } from './utils/format-number';
// import { get, isNil } from 'lodash';
import { useI18n } from 'vue-i18n';

export default defineComponent({ 
	props: {
		html: {
			type: String,
			default: null,
		}
	},
	setup(props) {
		const { t, n, locale } = useI18n();
		const api = useApi();
		const { useFieldsStore, usePermissionsStore } = useStores();
		const { hasPermission } = usePermissionsStore();
		//const canRead = getOperands(props).every(x => hasPermission(x.collectionName, 'read'));
		const hasError = ref<boolean>(false);

		const errorResponse = ref<Record<string, string>>({
			title: '',
			message: '',
		});

		const htmlPanel = ref<HTMLDivElement | null>(null);
		//const { adjustFontSize } = useAutoFontFit(calculatedLabelPanelContainer, calculatedLabelPanelText);
		let resizeObserver: ResizeObserver | null = null;

		onMounted(() => {
			loadHTMLPanel();
			updateFit();
		});

		watch([
			() => props.html,
		], () => {
			loadHTMLPanel();
		});

		onUpdated(() => {
			updateFit();
		})

		onBeforeUnmount(() => {
			unmountResizeObserver();
		});
		onUnmounted(() => {
		});
		
		async function loadHTMLPanel() {
			console.log('IN loadHTMLPanel');
			console.log(htmlPanel);
			console.log(htmlPanel.value);
			console.log(props);
			console.log(props.html);
			if (htmlPanel?.value) {
				console.log('AAA');
				htmlPanel.value.innerHTML = props.html;
			}
		}

		function adjustPadding() {
			const container = htmlPanel.value;
			if (!container) return;

			const paddingWidth = container.offsetWidth * 0.05;
			const paddingHeight = container.offsetHeight * 0.05;

			const padding = Math.round(Math.max(8, Math.min(paddingWidth, paddingHeight)));

			container.style.padding = `${padding}px`;

			return;
		}

		function unmountResizeObserver() {
			if (resizeObserver) {
				resizeObserver.disconnect();
				resizeObserver = null;
			}
		}

		async function updateFit() {
			unmountResizeObserver();
			return;
		}

		const color = computed(() => {
			return null;
		});

		return {
			t,
			htmlPanel,
			color,

			// Errors
			hasError,
			errorResponse,

			// Permission
			//canRead,

		};
	},
});
</script>

<template>
	<div ref="htmlPanel" class="html-panel type-title selectable"></div>
</template>

<style lang="scss" scoped>
.html-panel {
	display: flex;
	align-items: center;
	width: 100%;
	height: 100%;
	font-weight: 800;
	white-space: nowrap;
	line-height: 1.2;
	padding: 12px;

	&.sans-serif {
		font-family: var(--theme--fonts--sans--font-family);
	}

	&.serif {
		font-family: var(--theme--fonts--serif--font-family);
	}

	&.monospace {
		font-family: var(--theme--fonts--monospace--font-family);
	}
}
</style>
