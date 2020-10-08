<template>
	<div class="blog">
		<template v-if="blog">{{ blog }}</template>
		<div v-else>LOADING...</div>
	</div>
</template>

<script>
import { getBlog } from '@/firebase/api'

export default {
	name: 'Blog',

	created() {		
		getBlog(this.blogId)
	},

	computed: {
		blogId() {
			return this.$route.params.id
		},

		blog() {
			const blogs = this.$store.state.blogs

			if (blogs && blogs[this.blogId]) {
				return blogs[this.blogId]
			} else return null
		}
	}
}
</script>

<style>

</style>