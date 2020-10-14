import Vue from 'vue'
import Vuex from 'vuex'
import { dynamicSort } from '@/utils/arrange'

Vue.use(Vuex)

export default new Vuex.Store({
	strict: process.env.NODE_ENV !== 'production',

  state: {
		blogs: {}, // All blogs will be stored here
		allBlogsStored: false,
		latestBlog: null
	},

	getters: {
		GET_ORDERED_BLOGS: state => (order = 'desc') => {
			let orderedBlogs = []
			
			for (const blog in state.blogs) {
				orderedBlogs.push(state.blogs[blog])
			}

			return orderedBlogs.slice().sort(dynamicSort('created', order))
		}
	},
	
  mutations: {
		STORE_BLOGS: (state, blogs) => {
			// Store blogs as a hash map
			// Note: pass blogs always as an array!
			for (let i = 0; i < blogs.length; i++) {	
				Vue.set(state.blogs, blogs[i].id, blogs[i])
			}
		},

		STORE_LATEST_BLOG: (state, blog) => {
			Vue.set(state, 'latestBlog', blog)

			// Store latest blog to state.blogs too if it isn't stored yet
			if (!state.blogs[blog.id]) {
				Vue.set(state.blogs, blog.id, blog)
			}
		},

		DELETE_BLOG: (state, blogId) => {
			Vue.delete(state.blogs, blogId)
		},

		ALL_BLOGS_STORED: (state, payload) => {
			Vue.set(state, 'allBlogsStored', payload)
		}
	},
	
  actions: {
		STORE_BLOGS: ({ commit }, blogs) => {
			// Note: pass blogs always as an array!
			if (Array.isArray(blogs)) {
				commit('STORE_BLOGS', blogs)
			} else {
				console.log('STORE_BLOGS:', 'blog data must be passed as an array of objects!');
			}
		},

		STORE_LATEST_BLOG: ({ commit }, blog) => {
			commit('STORE_LATEST_BLOG', blog)
		},

		DELETE_BLOG: ({ commit, getters }, blogId) => {
			const allBlogsInOrder = getters['GET_ORDERED_BLOGS']('desc')

			// Set a new state.latestBlog if the blog to be deleted
			// is the current state.latestBlog
			if (blogId === allBlogsInOrder[0].id) {
				commit('STORE_LATEST_BLOG', allBlogsInOrder[1])
			}

			commit('DELETE_BLOG', blogId)
		},
		
		ALL_BLOGS_STORED: ({ commit }, payload) => {
			commit('ALL_BLOGS_STORED', payload)
		},
	}
})
