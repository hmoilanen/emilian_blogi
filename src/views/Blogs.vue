<template>
  <div class="view--blogs">
		this is page for all blogs
		<router-link to="/">to front page</router-link>
		<br>

		<!-- Blogs -->
		<template v-if="allBlogs">
			<Blogs-blog
				v-for="blog in allBlogs"
				:key="blog.id"
				:blog="blog"
			/>
		</template>
		<div v-else>LOADING...</div>
  </div>
</template>

<script>
import { getAllBlogs } from '@/firebase/api'
import BlogsBlog from '@/components/BlogsBlog'

export default {
	name: 'ViewBlogs',

	components: { BlogsBlog },
	
	created() {
		if (!this.$store.state.allBlogsStored) {
			getAllBlogs()
		}
	},

	computed: {
		allBlogs() {
			const blogs = this.$store.state.blogs

			if (blogs && Object.keys(blogs).length > 0) {
				return this.$store.getters['GET_ORDERED_BLOGS']
			} else return null
		}
	}
}
</script>
