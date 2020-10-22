<template>
	<div class="blog-comments">
		<template v-if="allComments">
			<h2>{{ allComments.length }} kommenttia:</h2>
			<div
				class="comment card"
				v-for="(comment, index) in allComments"
				:key="index"
			>
				<strong>{{ comment.alias }}:</strong>
				{{ comment.text }}
				<button
					v-if="isLogged"
					@click="deleteComment(index, comment)"
				>delete</button>
			</div>
		</template>
		<div v-else>LOADING COMMENTS...</div>
	</div>
</template>

<script>
import { deleteComment } from '@/firebase/api'

export default {
	name: 'BlogComments',

	props: {
		blogId: {
			type: String,
			required: true
		}
	},

	computed: {
		isLogged() {
			return this.$store.state.isLogged
		},

		allComments() {
			const allComments = this.$store.state.comments[this.blogId]
			
			return allComments ? allComments.commentList : []
		}
	},

	methods: {
		deleteComment(commentIndex) {
			try {
				deleteComment(this.blogId, commentIndex)
			} catch(error) {
				console.log('Error deleting comment:', error);
			}
		}
	}
}
</script>

<style lang="scss" scoped>
.blog-comments {

	.comment {
		margin-bottom: 0.4rem;
		border: 1px solid yellow;
		padding: 1rem;
	}
}
</style>