<script lang="ts">
	import type { Person } from '$lib/people';
	import { people } from '$lib/people';

	const path = window.location.pathname;
	const slug = path.split('/').pop();
	console.log(slug);

	let person: Person;

	// Extract index from slug
	if (slug) {
		const match = slug.match(/person(\d+)/); // Matches "person1" and captures "1"
		if (match) {
			const index = parseInt(match[1], 10); // Convert to 0-based index
			console.log(index);

			person = people[index];
		}
	}
</script>

<main class="container">
	{#if person}
		<div>
			<img src={person.image} alt={person.fullName} />
		</div>

		<div class="info">
			<h1>{person.name}</h1>
			<p>{person.fullName}</p>
			<p>No. {person.number}</p>
			<p>🎂 {person.birth}</p>

			<br />

			<p>{person.description}</p>
		</div>
	{:else}
		<h1>Person not found!</h1>
	{/if}
</main>

<style lang="scss">
	.container {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 2rem;

		width: 100%;
		max-width: 60rem;
		margin-inline: auto;
	}

	.info {
		display: flex;
		flex-direction: column;

		justify-content: center;
	}

	img {
		width: 100%;
		max-width: 20rem;
		height: 20rem; /* Make the image a square */
		object-fit: cover; /* Ensure the image covers the square area */

		border-radius: 1.2rem;
		box-shadow: 1px 10px 5px 0px rgba(0, 0, 0, 0.2);
		-webkit-box-shadow: 1px 10px 5px 0px rgba(0, 0, 0, 0.2);
		-moz-box-shadow: 1px 10px 5px 0px rgba(0, 0, 0, 0.2);
	}

	@media (max-width: 768px) {
		.container {
			grid-template-columns: 1fr;
		}
	}
</style>
