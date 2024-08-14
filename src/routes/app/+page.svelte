<div class="page">
	<form class="container" method="post" action="?/compare">
		{#each [0, 1] as item}
			<!-- content here -->
			<div class="side">
				<input type="file" accept="image/png, image/jpeg" multiple name="image" />
				<textarea placeholder="Custom description" name="description"></textarea>
				<p>Descriptions after prompt...</p>
				<input type="submit" />
			</div>
		{/each}
	</form>
</div>

<style lang="scss">
	.container {
		margin-top: 5rem;
	}

	textarea {
		resize: none;
	}
</style>
