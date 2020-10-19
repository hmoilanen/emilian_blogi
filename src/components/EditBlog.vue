<template>
	<div class="edit-blog">
		<h4>EDITOI:</h4>
		<input
			v-model="title"
			type="text"
			name="title"
		>
		<textarea
			v-model="text"
			name="text"
			cols="30"
			rows="10"
		></textarea>
		<button @click="saveEditedBlog">tallenna</button>
		<button @click="cancelEdit">palaa</button>
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
		},

		cancelEdit() {
			this.$emit('edit-canceled')
		}
	}
}
</script>

<style lang="scss" scoped>
.edit-blog {
	input, textarea {
		display: block;
	}

	textarea {
		width: 100%;
	}
}
</style>