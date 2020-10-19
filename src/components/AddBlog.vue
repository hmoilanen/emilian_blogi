<template>
	<div class="add-blog card">
		<h2>LISÄÄ UUSI BLOGI</h2>
		<form @submit.prevent="saveBlog">
			<input
				v-model="title"
				type="text"
				name="title"
				placeholder="otsikko"
			>
			<input
				v-model="text"
				type="text"
				name="text"
				placeholder="tekstisisältö"
			>
			<button type="submit">luo blogi</button>
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
	margin-bottom: 2rem;

	input {
		display: block;
		margin: 1rem 0;
	}
}
</style>