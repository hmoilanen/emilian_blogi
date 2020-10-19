<template>
	<div class="blog">
		<button @click="toBlogs">to blogs</button>
		
		<template v-if="blog">
			<div>{{ blog.title }}</div>
			<div>{{ blog.text }}</div>
			<hr>
			<button
				v-if="!editMode"
				@click="editMode = true"
			>edit blog</button>
			<Edit-blog	
				v-if="editMode"
				:blog="blog"
				@blog-edited="editMode = false"
			></Edit-blog>
			<Blog-commenting/>
			<Blog-comments :blogId="blogId"></Blog-comments>
		</template>

		<div v-else>LOADING...</div>
	</div>
</template>

<script>
import { getBlog } from '@/firebase/api'
import EditBlog from '@/components/EditBlog'
import BlogCommenting from '@/components/BlogCommenting'
import BlogComments from '@/components/BlogComments'

export default {
	name: 'Blog',

	components: {
		EditBlog,
		BlogCommenting,
		BlogComments
	},

	data() {
		return { editMode: false }
	},

	created() {		
		getBlog(this.blogId)
	},

	computed: {
		blogId() {
			return this.$route.params.id
		},

		blog() {
			const blogs = this.$store.state.blogs

			if (blogs && blogs[this.blogId]) {
				return blogs[this.blogId]
			} else return null
		}
	},

	methods: {
		toBlogs() {
			this.$router.push({ name: 'Blogs' })
		}
	}
}
</script>

<style>

</style>