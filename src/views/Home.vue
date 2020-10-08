<template>
  <div class="view--home">
		this is front page
		<router-link to="/blogs">to blogs</router-link>
		<router-link to="/blog">to blog</router-link>
		<Add-Blog/>
		<br>

		<!-- Latest blog -->
		<template v-if="latestBlog">
			<div>
				<h2>{{ latestBlog.title }}</h2>
				<p>{{ latestBlog.text }}</p>
			</div>
		</template>
		<div v-else>LOADING...</div>
  </div>
</template>

<script>
//import db from '@/firebase/init'
import { getLatestBlog } from '@/firebase/api'

import AddBlog from '@/components/AddBlog'

export default {
	name: 'ViewHome',

	components: { AddBlog },

	data() {
		return {
			newestBlog: null
		}
	},
	
	created() {
		if (!this.$store.state.latestBlog) {
			getLatestBlog()
		}
		//this.getLatestBlog()
	},

	computed: {
		latestBlog() {
			const latestBlog = this.$store.state.latestBlog

			return latestBlog
				?	latestBlog
				: null
		}
	}

	/* methods: {
		getLatestBlog() {
			const blogsRef = db.collection('blogs')
			let newestBlogId

			blogsRef.doc('main').get()
				.then(doc => {
					if (doc.exists) {
						//console.log('Document data:', doc.data().newestBlog)
						const newestBlogId = doc.data().newestBlog

						blogsRef.doc(newestBlogId).get()
							.then(blog => {
								console.log('Newest blog successfully fetched!')
								this.newestBlog = { ...blog.data(), id: blog.id }
							})
							.catch(error => console.log('Error getting newest blog:', error))
					} else {
						console.log('No such document!')
					}
				})
				.catch(error => console.log('Error getting document:', error))
		}
	} */
}
</script>
