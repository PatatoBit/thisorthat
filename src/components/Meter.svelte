<script lang="ts">
	export let value: number = 50; // Default value (can be between 0 and 100)
</script>

<div class="meter">
	<div class="fill" style="width: {value - 5}%;"></div>
</div>

<!-- Optional: Display the current value -->
<!-- <p>{value}%</p> -->

<style>
	.meter {
		width: 100%;
		background: #2698be;
		border-radius: 5px;
		overflow: hidden;
		position: relative;
		height: 20px;
	}
	.fill {
		height: 100%;
		background: #ca484a;
		width: 0;
		transition: width 0.3s ease;
	}
</style>
