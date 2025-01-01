<script lang="ts">
	import { people } from '$lib/people';
</script>

<main class="container">
	<h1>About</h1>
	<p>
		Welcome to This or That! This is a simple web app that allows you to compare values of two
		different products. Normally, when products are priced similarly or have sales that are hard to
		compare, we often struggle and waste a lot of time deciding which one to buy. This app aims to
		help you make a decision by using AI to scan the products and compare them for you.
	</p>

	<br />

	<p>
		This is a project made for fun and was used for presenting in multiple school projects. Our
		group consists of me (Pat), Thun, Buga, Aimy, and Proud.
	</p>

	<br />

	<div class="team">
		{#each people as person, index}
			<div class="person">
				<a href="/about/person{index}">
					<img src={person.image} alt={person.fullName} />
				</a>
				<strong>{person.name}</strong>
			</div>
		{/each}
	</div>

	<br />

	<p>
		This or That is made with SvelteKit framework, SCSS for styling, and GPT-4o vision api for image
		processing. Programming languages used were Svelte, TypeScript, SCSS, and markdown for text.
	</p>

	<br />

	<span>
		You can find the source code for this project on <a
			href="https://github.com/patatobit/thisorthat"
			target="_blank"
			rel="noopener noreferrer">Github</a
		>. Feedbacks, questions or suggestions are always open and appreciated. You can contact us
		<a href="/contacts">here</a>.
	</span>
</main>

<style lang="scss">
	.team {
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		gap: 1rem;

		.person {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			border-radius: 5px;
			gap: 0.5rem;
		}

		img {
			width: 100%;
			border-radius: 5px;
		}
	}
</style>
