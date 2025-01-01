<script lang="ts">
	import { toBase64 } from '$lib';
	import { type CompareData } from '$lib/types';
	import axios from 'axios';
	import { fly } from 'svelte/transition';
	// your script goes here

	import dummy from '../../lib/dummy.json';

	let images1: FileList;
	let custom1: string = '';
	let previews1: string[] = [];

	let images2: FileList;
	let custom2: string = '';
	let previews2: string[] = [];

	let responseData: CompareData | null = dummy;

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

<main class="page">
	<div class="grid">
		<p></p>
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

		{#if responseData}
			<p class="label">NAME</p>
			<h2>{responseData.products[0].name}</h2>
			<h2>{responseData.products[1].name}</h2>

			<p class="label">DESCRIPTION</p>
			<p>{responseData.products[0].brief_explanation}</p>
			<p>{responseData.products[1].brief_explanation}</p>

			<p class="label">PROS</p>
			<ul>
				{#each responseData.products[0].pros as pro}
					<li>{pro}</li>
				{/each}
			</ul>
			<ul>
				{#each responseData.products[1].pros as pro}
					<li>{pro}</li>
				{/each}
			</ul>

			<p class="label">CONS</p>
			<ul>
				{#each responseData.products[0].cons as con}
					<li>{con}</li>
				{/each}
			</ul>
			<ul>
				{#each responseData.products[1].cons as con}
					<li>{con}</li>
				{/each}
			</ul>

			<p class="label">PRICE</p>
			<h2>{responseData.products[0].price}</h2>
			<h2>{responseData.products[1].price}</h2>

			<p class="label">QUANTITY</p>
			<h2>{responseData.products[0].quantity}</h2>
			<h2>{responseData.products[1].quantity}</h2>

			<p class="label">VALUE</p>
			<h2>{responseData.products[0].price}</h2>
			<h2>{responseData.products[1].price}</h2>
		{/if}
	</div>

	{#if loading}
		<div>Loading...</div>
	{/if}

	{#if !loading && !responseData}
		<div>No data</div>
	{/if}
</main>

<div class="bar">
	<button on:click={handleSubmit}>Compare</button>

	<div class="button-group">
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
		<label for="file-upload-1"><img src="/upload.svg" alt="Upload" /></label>
	</div>

	<div class="button-group">
		<input
			id="file-upload-2"
			type="file"
			accept="image/png, image/jpeg"
			multiple
			name="image"
			bind:files={images2}
			on:change={async (event) => {
				previews2 = await handleImageInput(event, previews2);
			}}
			on:change|preventDefault
		/>
		<label for="file-upload-2"><img src="/upload.svg" alt="Upload" /></label>
	</div>
</div>

<style lang="scss">
	.page {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.preview-container {
		width: 100%; /* Span the full width of the column */
		max-width: 300px; /* Optional: set a max width */
		padding: 10px; /* Add padding around the container */
		box-sizing: border-box; /* Include padding in size calculations */
		display: flex;
		flex-wrap: wrap; /* Allow images to wrap to the next line if necessary */
		gap: 10px; /* Space between images */
		margin-top: 20px;
		overflow: visible; /* Prevent overflow */
		position: relative; /* Keep relative positioning if needed for transitions */
	}

	.preview-image {
		flex: 1 1 100%; /* Make each image take full width, adjust as needed */
		/* Remove absolute positioning to allow normal flow */
		/* Optional: Add transition for hover effects */
		transition: transform 0.3s ease-in-out;
	}

	.preview-image img {
		width: 100%; /* Span the full width of the container */
		height: auto; /* Maintain aspect ratio */
		object-fit: contain; /* Ensure the image fits inside the container */
		border: 2px solid #fff;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
		display: block; /* Remove inline spacing */
		box-sizing: border-box; /* Include padding and border in size calculations */
	}

	.grid {
		display: grid;
		grid-template-rows: auto 1fr auto auto auto 1fr 1fr;
		grid-template-columns: 1.4fr 1fr 1fr;
		column-gap: 1rem;
		row-gap: 5rem;
		max-width: 60rem;
		width: 100%;
		margin-inline: auto;
		padding: 1rem;
	}

	.bar {
		position: sticky;
		bottom: 0;
		display: grid;
		grid-template-columns: 1.4fr 1fr 1fr;
		background-color: var(--offwhite);
		max-width: 60rem;
		width: 100%;
		margin-inline: auto;
		padding: 1rem;

		border-radius: 2rem;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
	}

	.button-group {
		display: grid;
	}

	input[type='file'] {
		display: none;
	}

	label {
		border: 1px solid var(--black);
		border-radius: 1rem;
		display: grid;
		justify-content: center;
		align-items: center;
		img {
			width: 2rem;
			height: 2rem;
			cursor: pointer;
		}
	}
</style>
