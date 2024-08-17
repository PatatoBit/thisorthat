<script lang="ts">
	import dummy from '$lib/dummy.json';
	import type { CompareData } from '$lib/types';
	import axios from 'axios';

	let data: CompareData;
	data = dummy;

	async function handleSubmit() {
		try {
			await axios.get('/api/compare').then((response) => {
				console.log(response.data);
			});
		} catch (error) {
			console.error('Error:', error);
		}
	}
</script>

<div class="page">
	<form class="container" on:submit|preventDefault={handleSubmit}>
		<button class="compare" type="submit">Compare</button>
		<div class="sides">
			{#each data.products as product}
				<!-- content here -->
				<div class="side">
					<input type="file" accept="image/png, image/jpeg" multiple name="image" />
					<textarea placeholder="Custom description" name="description"></textarea>

					<h4>Price</h4>
					<p>
						<strike>{product.price}</strike>
						{product.discounted_price}

						<span class="discount">
							-{Math.round(((product.price - product.discounted_price) / product.price) * 100)}%
						</span>
					</p>

					<h4>Quantity</h4>
					<p>{product.quantity}</p>

					<h4>Price / Quantity</h4>
					<p>{product.price / product.quantity}</p>

					<h4>Explanation</h4>
					<p>{product.brief_explanation}</p>

					<h4>Pros</h4>
					<ul>
						{#each product.pros as pro}
							<li>
								{pro}
							</li>
						{/each}
					</ul>

					<h4>Cons</h4>
					<ul>
						{#each product.cons as con}
							<li>
								{con}
							</li>
						{/each}
					</ul>
				</div>
			{/each}
		</div>
	</form>
</div>

<style lang="scss">
	.container {
		margin-top: 5rem;
		flex-direction: column;
	}

	.compare {
		margin: 0 auto;
	}

	.discount {
		color: green;
	}

	.sides {
		display: flex;
		flex-direction: row;
	}

	textarea {
		resize: none;
	}
</style>
