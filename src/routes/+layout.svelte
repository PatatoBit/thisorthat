<script lang="ts">
	import '../styles/globals.scss';
	import { dev } from '$app/environment';
	import { inject } from '@vercel/analytics';
	import NavBar from '../components/NavBar.svelte';

	inject({ mode: dev ? 'development' : 'production' });
</script>

<NavBar />
<slot />

<style>
	@import '../styles/variables.scss';
</style>
