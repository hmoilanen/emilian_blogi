<template>
  <div id="app">
    <router-view/>
		<NavTop/>
  </div>
</template>

<script>
import NavTop from '@/components/NavTop'

export default {
	name: 'App',

	components: { NavTop }
}
</script>

<style lang="scss">
*,
*::before,
*::after { box-sizing: border-box; }

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;

	h1, h2, h3, h4, h5, h6 {
		margin-top: 0;
	}

	.content-wrapper {
		max-width: 900px;
		margin: 0 auto;
		padding: 1rem;
	}

	.card {
		border: 1px solid lightgrey;
		border-radius: 3px;
		padding: 1rem;
	}
}

/* #nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
} */
</style>
