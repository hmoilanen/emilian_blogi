<template>
	<div class="blogs-blog card">
		<h2
			class="blog-title"
			@click="goToBlog"
		>{{ blog.title }}</h2>
		<div>{{ blog.text }}</div>
		<div>lisätty: {{ parseCreated(blog.created) }}</div>
	</div>
</template>

<script>
import { timestampToDate } from '@/utils/parse'

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
		},

		parseCreated(timestamp) {
			return timestampToDate(timestamp)
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