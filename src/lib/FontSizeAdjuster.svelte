<script>
	import { onMount, onDestroy } from 'svelte';
	import { initFontScale, increaseFontScale, decreaseFontScale, resetFontScale, fontScale } from '$lib/fontScale';

	let current = 1;
	const unsubscribe = fontScale.subscribe(v => {
		current = v;
	});

	function handleKey(e) {
		if (e.ctrlKey || e.metaKey) {
			if (e.key === '=' || e.key === '+') {
				e.preventDefault();
				increaseFontScale();
			}
			if (e.key === '-') {
				e.preventDefault();
				decreaseFontScale();
			}
			if (e.key === '0') {
				e.preventDefault();
				resetFontScale();
			}
		}
	}

	let mounted = false;

	onMount(() => {
		mounted = true;
		initFontScale();
		window.addEventListener('keydown', handleKey);
	});

	onDestroy(() => {
		if (mounted) window.removeEventListener('keydown', handleKey);
	});
</script>

<div class="font-size-adjuster" aria-label="Font size controls">
	<span class="indicator">{current.toFixed(2)}x</span>
	<button type="button" on:click={decreaseFontScale} aria-label="Decrease font size">A-</button>
	<button type="button" on:click={resetFontScale} aria-label="Reset font size">Reset</button>
	<button type="button" on:click={increaseFontScale} aria-label="Increase font size">A+</button>
</div>


<style>
	.font-size-adjuster {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.4rem 0.5rem;
		margin-top: 5rem;

		border: 1px solid rgba(255, 255, 255, 0.18);
		border-radius: 0.6rem;
		background: rgba(255, 255, 255, 0.04);
	}

	.indicator {
		min-width: 4rem;
		text-align: center;
		font-weight: 600;
	}

	button {
		padding: 0.3rem 0.55rem;
		border: 1px solid rgba(255, 255, 255, 0.18);
		border-radius: 0.45rem;
		background: rgba(255, 255, 255, 0.06);
		cursor: pointer;
	}

	button:hover {
		background: rgba(255, 255, 255, 0.12);
	}

	button:active {
		transform: translateY(1px);
	}
</style>


