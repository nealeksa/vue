<template>
	<header class="main-header">
		<div class="main-header__wrapper">
			<h1 class="main-header__title">this is a header</h1>
			<nav class="main-header__nav">
				<router-link to="/">list</router-link>
			</nav>
		</div>
		<hr>
	</header>
</template>

<script>
	export default {
		name: 'Header',
		data () {
			return {

			}
		}
	}
</script>