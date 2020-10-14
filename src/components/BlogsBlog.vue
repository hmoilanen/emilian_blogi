<template>
	<div class="blogs-blog">
		<h2>{{ blog.title }}</h2>
		<p>{{ blog.text }}</p>
		<p>{{ blog.id }}</p>

		<button @click="goToBlog">open</button>

		<div v-if="deleting">
			<h5>Type title of blog to confirm: {{ this.blog.title }}</h5>
			<input type="text" v-model="deletingConfirmation">
			<button @click="confirmDelete">confirm</button>
			<button @click="deleting = false">cancel</button>
		</div>
		<button v-else @click="deleting = true">delete</button>
	</div>
</template>

<script>
import db from '@/firebase/init'
import { deleteBlog } from '@/firebase/api'


export default {
	name: 'BlogsBlog',

	props: {
		blog: {
			type: Object,
			required: true
		}
	},

	data() {
		return {
			deleting: false,
			deletingConfirmation: ''
		}
	},

	methods: {	
		goToBlog() {
			this.$router.push({ name: 'Blog', params: { id: this.blog.id } })
		},

		async confirmDelete() {
			// https://itnext.io/error-handling-with-async-await-in-js-26c3f20bc06a

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

		/* deleteBlog() {
			if (this.deleteConfirmed) {
				db.collection('blogs').doc(this.blog.id).delete()
					.then(() => {
						console.log('Document successfully deleted!')
						//this.deleteConfirmed = true
					}).catch(error => {
						console.error('Error deleting blog: ', error)
					})
			}
		} */
	}
}
</script>

<style>
.blogs-blog {
	border: 2px solid red;
	padding: 1rem;
}
</style>