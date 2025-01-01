<nav>
	<h3>This or That</h3>

	<ul>
		<li><a href="/" class="label">HOME</a></li>
		<li><a href="/about" class="label">ABOUT</a></li>
		<li><a href="/contacts" class="label">CONTACTS</a></li>
	</ul>
</nav>

<style lang="scss">
	nav {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem 2rem;
		background-color: var(--primary);
		color: var(--offwhite);
	}

	ul {
		display: flex;
		list-style: none;
	}

	li {
		margin-right: 1rem;
	}

	a {
		color: var(--offwhite);
		text-decoration: none;
	}

	.label {
		font-size: 1.2rem;
	}
</style>
