<template>
	<div class="add-blog">
		<h3>Create a new blog</h3>
		<form @submit.prevent="saveBlog">
			<input
				type="text"
				name="title"
				v-model="title"
			>
			<input
				type="text"
				name="text"
				v-model="text"
			>
			<button type="submit">create</button>
		</form>
	</div>
</template>

<script>
//import db from '@/firebase/init'
import { saveBlog } from '@/firebase/api'

export default {
	name: 'AddBlog',

	data() {
		return {
			title: '',
			text: ''
		}
	},

	methods: {
		async saveBlog() {
			const newBlog = {
				title: this.title,
				text: this.text,
				created: new Date(),
				edited: null
			}

			await saveBlog(newBlog)
			
			// Empty fields once blog is saved
			this.title = ''
			this.text = ''
		}
	}
}
</script>

<style lang="scss" scoped>
.add-blog {
	border: 2px solid black;
	padding: 1rem;
}
</style>