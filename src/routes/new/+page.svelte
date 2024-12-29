<main class="page">
	<div class="grid">
		<p></p>
		<h2>Image</h2>
		<h2>Image</h2>

		<p></p>
		<p>ITEM #1</p>
		<p>ITEM #2</p>

		<p>NAME</p>
		<h2>Name 1</h2>
		<h2>Name 2</h2>

		<p>DESCRIPTION</p>
		<p>
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero facilis reprehenderit
			assumenda maiores reiciendis, sed rerum harum aliquid expedita ab, possimus et. Sit tempora
			amet error soluta beatae eius repudiandae.
		</p>
		<p>Description 2</p>

		<p>PROS</p>
		<h2>Pros 1</h2>
		<h2>Pros 2</h2>

		<p>CONS</p>
		<h2>Cons 1</h2>
		<h2>Cons 2</h2>

		<p>PRICE</p>
		<p>Price 1</p>
		<p>Price 2</p>

		<p>QUANTITY</p>
		<p>Quantity 1</p>
		<p>Quantity 2</p>

		<p>VALUE</p>
		<p>Value 1</p>
		<p>Value 2</p>
	</div>
</main>

<div class="bar">
	<button>Submit</button>

	<div class="button-group">
		<button id="upload1">Upload</button>
		<label for="upload1">ITEM #1</label>
	</div>

	<div class="button-group">
		<button id="upload2">Upload</button>
		<label for="upload2">ITEM #2</label>
	</div>
</div>

<style lang="scss">
	.page {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.grid {
		display: grid;
		grid-template-rows: auto 1fr auto auto 1fr 1fr 1fr 1fr;
		grid-template-columns: auto 1fr 1fr;

		column-gap: 1rem;
		row-gap: 5rem;

		max-width: 60rem;
		margin-inline: auto;
		padding: 1rem;
	}

	.bar {
		position: sticky;
		bottom: 0;

		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;

		background-color: red;

		max-width: 60rem;
		margin-inline: auto;
		padding: 1rem;
	}

	.button-group {
		display: grid;
	}
</style>
