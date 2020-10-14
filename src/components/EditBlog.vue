<template>
	<div>
		<h3>EDITOINTI!</h3>
		<div>{{ blog }}</div>
		<input
			v-model="title"
			type="text"
			name="title"
		>
		<textarea
			v-model="text"
			name="text"
			cols="30"
			rows="5"
		></textarea>
		<!-- <input
			type="text"
			name="title"
			v-model="title"
		> -->
		<button @click="saveEditedBlog">save</button>
	</div>
</template>

<script>
import { editBlog } from '@/firebase/api'

export default {
	name: 'EditBlog',

	props: {
		blog: Object
	},

	data() {
		return {
			title: '',
			text: ''
		}
	},

	created() {
		this.title = this.blog.title
		this.text = this.blog.text
	},

	methods: {
		async saveEditedBlog() {
			let editedBlog = {
				title: this.title,
				text: this.text,
				edited: new Date(),
				created: this.blog.created
			}

			try {
				await editBlog(editedBlog, this.blog.id)
				this.$emit('blog-edited')
			} catch (error) {
				console.error('Error editing blog:', error)
			}
		}
	}
}
</script>

<style>

</style>