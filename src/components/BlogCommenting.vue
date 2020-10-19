<template>
	<div class="blog-commenting">
		<h3>Comment here</h3>
		<input
			v-model="alias"
			type="text"
			name="alias"
			placeholder="nimimerkki"
		>
		<input
			v-model="comment"
			type="text"
			name="comment"
			placeholder="kommentti"
		>
		<button v-if="comment" @click="saveComment">send</button>
	</div>
</template>

<script>
import { getComments, saveComment } from '@/firebase/api'

export default {
	name: 'BlogCommenting',

	data() {
		return {
			comment: '',
			alias: '',
		}
	},

	created() {
		getComments(this.blogId)
	},

	computed: {
		blogId() {
			return this.$route.params.id
		}
	},

	methods: {
		async saveComment() {
			if (this.comment) {
				const comment = {
					created: new Date(),
					text: this.comment,
					alias: this.alias || 'jokuvaan'
				}

				await saveComment(this.blogId, comment)
				this.comment = ''
				this.alias = ''
			}
		}
	}
}
</script>

<style lang="scss" scoped>
.blog-commenting {
	border: 2px solid blue;
	padding: 2rem;
}
</style>