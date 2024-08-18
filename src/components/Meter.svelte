<script>
	export let value = 50; // Value between 0 and 100

	const radius = 50; // Radius of the semi-circle

	const percent = value / 100;
	const degree = -90 + percent * 180; // Degree of the arrow
</script>

<img src="/uparrow.svg" alt="Arrow" class="arrow" style="rotate: {degree}deg" />

<br />

<p>{value < 50 ? 'First product is recommended' : 'Second product is recommended'}</p>

<!-- Optional: Display the current value -->
<!-- <p>{value}%</p> -->

<style>
	.arrow {
		width: 100px;
	}
</style>
