<script lang="ts">
	import { type CompareData } from '$lib/types';
	import dummy from '$lib/dummy.json';
	import Product from '../../components/Product.svelte';
	import type { ProductData } from '$lib/types';
	import axios from 'axios';

	const data1: ProductData | null = dummy.products[0];
	const data2: ProductData | null = dummy.products[1];

	let images1: FileList;
	let images2: FileList;

	let responseData: CompareData;

	async function handleSubmit() {
		await axios.get('/api/compare').then((response) => {
			try {
				responseData = JSON.parse(response.data.message.content);
			} catch (error) {
				console.log(response.data.message.content);
			}
		});
	}
</script>

<div class="page">
	<form class="container" on:submit|preventDefault={handleSubmit}>
		<button class="compare" type="submit">Compare</button>

		<div class="sides">
			<div class="side">
				<input type="file" accept="image/png, image/jpeg" multiple name="image" />
				<textarea placeholder="Custom description" name="description"></textarea>

				{#if responseData}
					<Product data={responseData.products[0]} />
				{/if}
			</div>

			<div class="side">
				<input type="file" accept="image/png, image/jpeg" multiple name="image" />
				<textarea placeholder="Custom description" name="description"></textarea>

				{#if responseData}
					<Product data={responseData.products[1]} />
				{/if}
			</div>
		</div>
	</form>
</div>

<style lang="scss">
	textarea {
		resize: none;
	}

	.container {
		margin-top: 5rem;
		flex-direction: column;
	}

	.compare {
		margin: 0 auto;
	}

	.sides {
		display: flex;
		flex-direction: row;
	}
</style>
