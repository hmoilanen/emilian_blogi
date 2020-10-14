<template>
	<div class="blogs-blog">
		<h2>{{ blog.title }}</h2>
		<p>{{ blog.text }}</p>

		<button @click="goToBlog">open</button>

		<button v-if="!deleting" @click="deleting = true">delete</button>
		<Delete-blog
			v-else
			:blog="blog"
			@delete-canceled="deleting = false"
		></Delete-blog>
	</div>
</template>

<script>
import DeleteBlog from '@/components/DeleteBlog'

export default {
	name: 'BlogsBlog',

	components: { DeleteBlog },

	props: {
		blog: {
			type: Object,
			required: true
		}
	},

	data() {
		return {
			deleting: false
		}
	},

	methods: {	
		goToBlog() {
			this.$router.push({ name: 'Blog', params: { id: this.blog.id } })
		}
	}
}
</script>

<style>
.blogs-blog {
	border: 2px solid red;
	padding: 1rem;
}
</style>