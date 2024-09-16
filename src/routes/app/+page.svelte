<script lang="ts">
	import { type CompareData } from '$lib/types';
	import { toBase64 } from '$lib/index';
	import Product from '../../components/Product.svelte';
	import axios from 'axios';
	import Meter from '../../components/Meter.svelte';
	import { fly } from 'svelte/transition';

	let images1: FileList;
	let custom1: string = '';
	let previews1: string[] = [];

	let images2: FileList;
	let custom2: string = '';
	let previews2: string[] = [];

	let responseData: CompareData | null;

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
				custom1,
				images2: converted2,
				custom2
			};

			responseData = null;
			await axios.post('/api/compare', { params: payload }).then((response) => {
				try {
					responseData = JSON.parse(response.data.message.content);
					loading = false;
				} catch (error) {
					console.log(response.data.message.content);
					loading = false;
				}
			});
		} else {
			alert('Missing images');
			loading = false;
		}
	}

	async function handleImageInput(event: Event, imagePreviews: string[]): Promise<string[]> {
		const files = (event.currentTarget as HTMLInputElement).files;

		if (files) {
			const fileArray = Array.from(files);
			imagePreviews = [];

			// Map each file to a promise that resolves with a base64 string
			const promises = fileArray.map((file: File) => {
				return new Promise<string>((resolve, reject) => {
					const reader = new FileReader();
					reader.readAsDataURL(file);

					reader.onload = (e) => {
						const result = e.target?.result as string;
						resolve(result);
					};

					reader.onerror = (e) => reject(e);
				});
			});

			// Wait for all file reading promises to resolve
			imagePreviews = await Promise.all(promises);
			await console.log(imagePreviews);
			return imagePreviews;
		} else {
			console.log('No files selected');
			return [];
		}
	}
</script>

<svelte:head>
	<title>This or That</title>
</svelte:head>

<div class="container">
	<form on:submit|preventDefault={handleSubmit}>
		<div class="compare">
			<button type="submit">Compare</button>
		</div>

		{#if loading}
			<div class="loading">
				<img transition:fly src="/loading.gif" alt="Loading" />
			</div>
		{/if}

		<div class="sides">
			<div class="side">
				<div class="upload">
					<div class="preview-container">
						{#each previews1 as preview, i}
							<div
								class="preview-image"
								style="transform: rotate({i * 5 - 10}deg) translateY({i * -10}px);"
								in:fly={{ y: 100, delay: i * 100 }}
								out:fly={{ y: -100, delay: i * 100 }}
							>
								<img src={preview} alt="Preview {i + 1}" />
							</div>
						{/each}
					</div>

					<input
						id="file-upload-1"
						type="file"
						accept="image/png, image/jpeg"
						multiple
						name="image"
						on:change={async (event) => {
							previews1 = await handleImageInput(event, previews1);
						}}
						bind:files={images1}
						on:change|preventDefault
					/>
				</div>

				<textarea bind:value={custom1} placeholder="Custom description" name="description" />

				{#if responseData}
					<Product data={responseData.products[0]} />
				{/if}
			</div>

			<div class="side">
				<div class="upload">
					<div class="preview-container">
						{#each previews2 as preview, i}
							<div
								class="preview-image"
								style="transform: rotate({i * 5 - 10}deg) translateY({i * -10}px);"
								in:fly={{ y: 100, delay: i * 100 }}
								out:fly={{ y: -100, delay: i * 100 }}
							>
								<img src={preview} alt="Preview {i + 1}" />
							</div>
						{/each}
					</div>

					<input
						id="file-upload-2"
						type="file"
						accept="image/png, image/jpeg"
						multiple
						name="image"
						bind:files={images2}
						on:change={async (event) => {
							previews2 = await handleImageInput(event, previews1);
						}}
						on:change|preventDefault
					/>
				</div>

				<textarea bind:value={custom2} placeholder="Custom description" name="description" />

				{#if responseData}
					<Product data={responseData.products[1]} />
				{/if}
			</div>
		</div>
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

	.preview-container {
		position: relative;
		width: 300px;
		height: 300px;
		margin-top: 20px;
	}

	.preview-image {
		position: absolute;
		top: 0;
		transform-origin: center;
		transition: transform 0.3s ease-in-out;
	}

	.preview-image img {
		max-width: 200px;
		max-height: 200px;
		border: 2px solid #fff;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
	}
</style>
