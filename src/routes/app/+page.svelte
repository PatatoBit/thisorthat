<script lang="ts">
	import { type CompareData } from '$lib/types';
	import dummy from '$lib/dummy.json';
	import { toBase64 } from '$lib/index';
	import Product from '../../components/Product.svelte';
	import type { ProductData } from '$lib/types';
	import axios from 'axios';
	import Meter from '../../components/Meter.svelte';

	let images1: FileList;
	let images2: FileList;

	let responseData: CompareData | undefined;

	async function handleSubmit() {
		if (images1 && images2) {
			const firstBase64 = await toBase64(images1[0]);
			const secondBase64 = await toBase64(images2[0]);
			const payload = {
				images: [firstBase64, secondBase64]
			};

			await axios.post('/api/compare', { params: payload }).then((response) => {
				try {
					responseData = JSON.parse(response.data.message.content);
				} catch (error) {
					console.log(response.data.message.content);
				}
			});
		} else {
			alert('Missing images');
		}
	}
</script>

<div class="page">
	<form class="container" on:submit|preventDefault={handleSubmit}>
		<button class="compare" type="submit">Compare</button>

		<div class="sides">
			<div class="side">
				<div class="upload">
					<input
						id="file-upload"
						type="file"
						accept="image/png, image/jpeg"
						multiple
						name="image"
						bind:files={images1}
					/>
				</div>
				<textarea placeholder="Custom description" name="description"></textarea>

				{#if responseData}
					<Product data={responseData.products[0]} />
				{/if}
			</div>

			<div class="side">
				<div class="upload">
					<input
						id="file-upload"
						type="file"
						accept="image/png, image/jpeg"
						multiple
						name="image"
						bind:files={images2}
					/>
				</div>
				<textarea placeholder="Custom description" name="description"></textarea>
				{#if responseData}
					<Product data={responseData.products[1]} />
				{/if}
			</div>
		</div>
	</form>

	{#if responseData?.recommend_meter}
		<br />
		<div class="meter">
			<Meter value={responseData.recommend_meter} />
		</div>
	{/if}

	<br />
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

	.meter {
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>
