<template>
	<div class="blog" :style="styling">
		<div class="content-wrapper">

			<template v-if="blog">
				<template v-if="!editing">
					<h2>{{ blog.title }}</h2>
					<div>{{ blog.text }}</div>
				</template>

				<div
					v-if="modes.default"
					class="options"
				>
					<button @click="editing = true">editoi</button>
					<button @click="deleting = true">poista</button>
				</div>

				<Edit-blog	
					v-if="modes.editing"
					:blog="blog"
					@blog-edited="editing = false"
					@edit-canceled="editing = false"
				/>
				<Delete-blog
					v-if="modes.deleting"
					:blog="blog"
					@delete-canceled="deleting = false"
				/>
				<Blog-commenting/>
				<Blog-comments :blogId="blogId"/>
			</template>
			<div v-else>LOADING...</div>

		</div>
	</div>
</template>

<script>
import { getBlog } from '@/firebase/api'
import EditBlog from '@/components/EditBlog'
import DeleteBlog from '@/components/DeleteBlog'
import BlogCommenting from '@/components/BlogCommenting'
import BlogComments from '@/components/BlogComments'

export default {
	name: 'Blog',

	components: {
		EditBlog,
		DeleteBlog,
		BlogCommenting,
		BlogComments
	},

	data() {
		return {
			editing: false,
			deleting: false
		}
	},

	created() {		
		getBlog(this.blogId)
	},

	computed: {
		modes() {
			const isLogged = this.$store.state.isLogged

			return {
				default: isLogged && !this.editing && !this.deleting,
				editing: isLogged && this.editing && !this.deleting,
				deleting: isLogged && !this.editing && this.deleting
			}
		},

		blogId() {
			return this.$route.params.id
		},

		blog() {
			const blogs = this.$store.state.blogs

			if (blogs && blogs[this.blogId]) {
				return blogs[this.blogId]
			} else return null
		},

		styling() {
			return {
				paddingTop: `${this.$store.state.ui.navTopHeight}px` || '60px'
			}
		}
	}
}
</script>

<style lang="scss" scoped>
.blog {
	padding-top: 60px; // dummy

	.options {
		margin: 1rem 0;
	}
}
</style>