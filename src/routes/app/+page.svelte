<div class="page">
	<div class="container">
		{#each [0, 1] as item}
			<!-- content here -->
			<div class="side">
				<input type="file" accept="image/png, image/jpeg" multiple />
				<textarea placeholder="Custom description"></textarea>
				<p>Descriptions after prompt...</p>
			</div>
		{/each}
	</div>
</div>

<style lang="scss">
	.container {
		margin-top: 5rem;
	}

	textarea {
		resize: none;
	}
</style>
