<template>
	<div class="blog-comments">
		<h3>comments:</h3>
		<template v-if="allComments">
			<div
				class="comment"
				v-for="(comment, index) in allComments"
				:key="index"
			>
				<strong>{{ comment.alias }}:</strong>
				{{ comment.text }}
				<button @click="deleteComment(index, comment)">delete</button>
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
		allComments() {
			const allComments = this.$store.state.comments[this.blogId]
			
			return allComments ? allComments.commentList : null
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
	border: 2px solid orange;
	padding: 1rem;
	.comment {
		border: 2px solid yellow;
		padding: 1rem;
	}
}
</style>