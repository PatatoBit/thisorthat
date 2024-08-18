<script lang="ts">
	import { type CompareData } from '$lib/types';
	import dummy from '$lib/dummy.json';
	import { toBase64 } from '$lib/index';
	import Product from '../../components/Product.svelte';
	import type { ProductData } from '$lib/types';
	import axios from 'axios';
	import Meter from '../../components/Meter.svelte';
	import { fly } from 'svelte/transition';

	let images1: FileList;
	let images2: FileList;

	let responseData: CompareData | undefined;

	let loading: boolean = false;

	async function handleSubmit() {
		loading = true;
		const converted1 = [];
		const converted2 = [];

		if (images1 && images2) {
			for (const image of images1) {
				const base64 = await toBase64(image);
				converted1.push(base64);
			}

			for (const image of images2) {
				const base64 = await toBase64(image);
				converted2.push(base64);
			}

			const payload = {
				images1: converted1,
				images2: converted2
			};

			await axios.post('/api/compare', { params: payload }).then((response) => {
				try {
					responseData = JSON.parse(response.data.message.content);
				} catch (error) {
					console.log(response.data.message.content);
				}
			});

			loading = false;
		} else {
			alert('Missing images');

			loading = false;
		}
	}
</script>

<div class="container">
	<form on:submit|preventDefault={handleSubmit}>
		<div class="compare">
			<button type="submit">Compare</button>
		</div>

		<div class="sides">
			<div class="side">
				<div class="upload">
					<input
						id="file-upload-1"
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
						id="file-upload-2"
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

		{#if loading}
			<div class="loading">
				<img
					transition:fly
					src="https://media1.tenor.com/m/FawYo00tBekAAAAC/loading-thinking.gif"
					alt="Loading"
				/>
			</div>
		{/if}
	</form>

	{#if responseData}
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
		justify-content: center;
	}

	.compare {
		margin-block: 0 auto;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.loading {
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;

		img {
			max-width: 20rem;
			border-radius: 2rem;
		}
	}

	.sides {
		display: flex;
		flex-direction: row;
	}

	.meter {
		margin-block: 0 auto;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.upload {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>
