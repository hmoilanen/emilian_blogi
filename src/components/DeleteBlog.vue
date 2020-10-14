<template>
	<div class="delete-blog">
		<h5>Type title of blog to confirm: {{ this.blog.title }}</h5>
		<input type="text" v-model="deletingConfirmation">
		<button @click="confirmDelete">confirm delete</button>
		<button @click="cancelDelete">cancel</button>
	</div>
</template>

<script>
import { deleteBlog } from '@/firebase/api'

export default {
	name: 'DeleteBlog',

	props: {
		blog: {
			type: Object,
			required: true
		}
	},

	data() {
		return {
			deletingConfirmation: ''
		}
	},

	methods: {
		async confirmDelete() {
			// See: https://itnext.io/error-handling-with-async-await-in-js-26c3f20bc06
			const title = this.blog.title.toLowerCase()
			const titleConfirm = this.deletingConfirmation.toLowerCase()

			// Delete blog if confirmed
			if (title === titleConfirm) {
				try {
					await deleteBlog(this.blog.id)
				} catch (error) {
					console.error('Error deleting blog:', error)
				}
			} else {
				console.log('Typed title doesn\'t match with the title')
			}

			return
		},

		cancelDelete() {
			this.$emit('delete-canceled')
		}
	}
}
</script>

<style>

</style>