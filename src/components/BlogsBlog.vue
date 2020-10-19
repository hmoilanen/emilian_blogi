<template>
	<div class="blogs-blog card">
		<h2
			class="blog-title"
			@click="goToBlog"
		>{{ blog.title }}</h2>
		<p>{{ blog.text }}</p>
	</div>
</template>

<script>
export default {
	name: 'BlogsBlog',

	props: {
		blog: {
			type: Object,
			required: true
		}
	},

	methods: {	
		goToBlog() {
			this.$router.push({ name: 'Blog', params: { id: this.blog.id } })
		}
	}
}
</script>

<style lang="scss" scoped>
.blogs-blog {
	margin-bottom: 1rem;

	.blog-title {
		cursor: pointer;
	}
}
</style>