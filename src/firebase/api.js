import db from '@/firebase/init'
import store from '@/store'

const blogsRef = db.collection('blogs')

const getBlog = blogId => {
	// Get single blog from firebase if it isn't stored yet
	if (store.state.blogs[blogId]) return

	blogsRef.doc(blogId).get()
		.then(doc => {
			if (doc.exists) {
				const blog = { ...doc.data(), id: doc.id }

				// Store single blog
				store.dispatch('STORE_BLOGS', [blog])
			} else {
				console.log('getBlog: No such blog!')
			}
		})
		.catch(error => {
			// This can be catched in try / catch
			throw new Error(error)
		})
}

const getAllBlogs = () => {
	const allBlogs = []

	// Get all blogs from firebase
	blogsRef.get()
		.then(querySnapshot => {
			querySnapshot.forEach(doc => {
				// Handle all other blog objects except blogs.main
				if (doc.id !== 'main') {
					const blog = { ...doc.data(), id: doc.id }			
					allBlogs.push(blog)
				}
			})

			// Store all blogs
			store.dispatch('STORE_BLOGS', allBlogs)
			store.dispatch('ALL_BLOGS_STORED', true)
		})
		.catch(error => {
			// This can be catched in try / catch
			throw new Error(error)
		})
}

const getLatestBlog = () => {
	// HUOM!... MUUTA TÄTÄ NIIN ETTÄ EI VÄLTTÄMÄTTÄ TARVITSE AINA TEHDÄ HAKUA...
	// ...ESIM JOS UUSIN BLOGI LÖYTYY JO KANNASTA
	blogsRef.orderBy('created', 'desc').limit(1).get()
		.then(querySnapshot => {
			querySnapshot.forEach(doc => {
				const blog = { ...doc.data(), id: doc.id }	
				store.dispatch('STORE_LATEST_BLOG', blog)
			})
		})
		.catch(error => {
			// This can be catched in try / catch
			throw new Error(error)
		})
}

const saveBlog = blog => {
	blogsRef.add(blog)
		.then(savedBlog => {
			const latestBlog = { ...blog, id: savedBlog.id }
			store.dispatch('STORE_LATEST_BLOG', latestBlog)
		})
		.catch(error => {
			// This can be catched in try / catch
			throw new Error(error)
		})
}

const editBlog = (blog, blogId) => {
	blogsRef.doc(blogId).set(blog)
		.then(() => {
			const blogForStore = { ...blog, id: blogId }
			store.dispatch('STORE_BLOGS', [blogForStore])
		})
		.catch(error => {
			// This can be catched in try / catch
			throw new Error(error)
		})
}

const deleteBlog = (blogId) => {
//const deleteBlog = blogId => {
	blogsRef.doc(blogId).delete()
		.then(() => {
			console.log('kun hommat hoidettu');
			// käytä tässä storen actionia deleteBlog()
			store.dispatch('DELETE_BLOG', blogId)
		})
		.catch(error => {
			// This can be catched in try / catch
			throw new Error(error)
		})
}

export {
	getBlog,
	getAllBlogs,
	getLatestBlog,
	saveBlog,
	editBlog,
	deleteBlog
}