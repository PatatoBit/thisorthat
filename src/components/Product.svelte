<script lang="ts">
	import type { ProductData } from '$lib/types';
	import { fly } from 'svelte/transition';
	export let data: ProductData;
</script>

<div class="container" transition:fly>
	<div class="data">
		<h4>Name</h4>
		<p>{data.name}</p>
	</div>

	<div class="row">
		<div class="data">
			<h4>Price</h4>

			<p>
				{#if data.price && data.discounted_price}
					<strike>{data.price}</strike>
				{:else if data.price}
					{data.price}
				{/if}

				{#if data.discounted_price}
					{data.discounted_price}
				{/if}

				{#if data.price && data.discounted_price}
					<span class="discount">
						-{Math.round(((data.price - data.discounted_price) / data.price) * 100)}%
					</span>
				{/if}
			</p>
		</div>

		<div class="data">
			<h4>Quantity</h4>
			<p>{data.quantity}</p>
		</div>
	</div>

	<div class="data">
		<h4>Price / Quantity</h4>

		{#if data.price}
			<p>{data.price / data.quantity}</p>
		{/if}
	</div>

	<div class="data">
		<h4>Explanation</h4>
		<p>{data.brief_explanation}</p>
	</div>

	<div class="data">
		<h4>Pros</h4>
		<div class="tags">
			{#each data.pros as pro}
				<div class="radio pro">
					{pro}
				</div>
			{/each}
		</div>
	</div>

	<div class="data">
		<h4>Cons</h4>
		<div class="tags">
			{#each data.cons as con}
				<div class="radio con">
					{con}
				</div>
			{/each}
		</div>
	</div>
</div>

<style lang="scss">
	.container {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.row {
		display: flex;
		flex-direction: row;
		width: 100%;
		gap: 3.5rem;
	}

	.discount {
		background-color: rgb(18, 192, 102);
		color: #fefefe;
		padding: 0.2rem;
		border-radius: 0.2rem;
	}

	.data {
		display: flex;
		flex-direction: column;
	}

	.tags {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		column-gap: 1rem;
		gap: 0.5rem;
	}

	.radio {
		padding: 0.5rem 1rem;
		border-radius: 3rem;
		color: #fefefe;
	}

	.pro {
		background: rgb(18, 192, 102);
	}

	.con {
		background: #ea5252;
	}
</style>
