<script lang="ts">
	import type { ProductData } from '$lib/types';
	export let data: ProductData;
</script>

<div class="container">
	<div class="row">
		<div class="data">
			<h4>Price</h4>

			<p>
				<strike>{data.price}</strike>
				{data.discounted_price}

				<span class="discount">
					-{Math.round(((data.price - data.discounted_price) / data.price) * 100)}%
				</span>
			</p>
		</div>

		<div class="data">
			<h4>Quantity</h4>
			<p>{data.quantity}</p>
		</div>
	</div>

	<div class="data">
		<h4>Price / Quantity</h4>
		<p>{data.price / data.quantity}</p>
	</div>

	<div class="data">
		<h4>Explanation</h4>
		<p>{data.brief_explanation}</p>
	</div>

	<div class="data">
		<h4>Pros</h4>
		<ul>
			{#each data.pros as pro}
				<li class="radio pro">
					{pro}
				</li>
			{/each}
		</ul>
	</div>

	<div class="data">
		<h4>Cons</h4>
		<ul>
			{#each data.cons as con}
				<li class="radio con">
					{con}
				</li>
			{/each}
		</ul>
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
		color: green;
	}

	.data {
		display: flex;
		flex-direction: column;
	}

	.radio {
		padding: 0.5rem 1rem;
		margin-block: 0.5rem;
		border-radius: 3rem;
	}

	.pro {
		background: #59cf63;
		color: #fefefe;
	}

	.con {
		background: #ea5252;
		color: #fefefe;
	}
</style>
