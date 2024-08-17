<script lang="ts">
	import type { ProductData } from './../lib/types.ts';
	export let data: ProductData;
</script>

<div>
	<h4>Price</h4>
	<p>
		<strike>{data.price}</strike>
		{data.discounted_price}

		<span class="discount">
			-{Math.round(((data.price - data.discounted_price) / data.price) * 100)}%
		</span>
	</p>

	<h4>Quantity</h4>
	<p>{data.quantity}</p>

	<h4>Price / Quantity</h4>
	<p>{data.price / data.quantity}</p>

	<h4>Explanation</h4>
	<p>{data.brief_explanation}</p>

	<h4>Pros</h4>
	<ul>
		{#each data.pros as pro}
			<li>
				{pro}
			</li>
		{/each}
	</ul>

	<h4>Cons</h4>
	<ul>
		{#each data.cons as con}
			<li>
				{con}
			</li>
		{/each}
	</ul>
</div>

<style lang="scss">
	.discount {
		color: green;
	}
</style>
