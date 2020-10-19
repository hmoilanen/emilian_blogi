//const firebase = require('firebase/app');
//require('firebase/firestore');

import firebase from 'firebase/app'
import 'firebase/auth'
import db from '@/firebase/init'
import store from '@/store'

const blogsRef = db.collection('blogs')
const commentsRef = db.collection('comments')

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

			// Also update the latest blog in necessary
			if (blogId === store.state.latestBlog.id) {
				store.dispatch('STORE_LATEST_BLOG', blogForStore)
			}
		})
		.catch(error => {
			// This can be catched in try / catch
			throw new Error(error)
		})
}

const deleteBlog = blogId => {
	blogsRef.doc(blogId).delete()
		.then(() => {
			store.dispatch('DELETE_BLOG', blogId)
			// Also delete all comments of the deleted blog
			commentsRef.doc(blogId).delete()
				.catch(error => {
					// This can be catched in try / catch
					throw new Error(error)
				})
		})
		.catch(error => {
			// This can be catched in try / catch
			throw new Error(error)
		})
}

const getComments = blogId => {
	commentsRef.doc(blogId).get()
		.then(doc => {
			const comments = doc.data()

			store.dispatch('STORE_COMMENTS', { blogId, comments })
		})
		.catch(error => {
			// This can be catched in try / catch
			throw new Error(error)
		})
}

const saveComment = (blogId, comment) => {
	const commentsOfBlog = commentsRef.doc(blogId)

	// If the blog has no comments yet
	if (!store.state.comments[blogId]) {
		commentsOfBlog.set({ commentList: [comment] })
			.then(() => store.dispatch('SAVE_COMMENT', { blogId, comment }))
			.catch(error => {
				// This can be catched in try / catch
				throw new Error(error)
			})
	} else { // If blog already has comments
		commentsOfBlog.update({
			commentList: firebase.firestore.FieldValue.arrayUnion(comment)
		})
			.then(() => store.dispatch('SAVE_COMMENT', { blogId, comment }))
			.catch(error => {
				// This can be catched in try / catch
				throw new Error(error)
			})
	}
}

const deleteComment = (blogId, commentIndex) => {
	const initialComments = store.state.comments[blogId].commentList
	const updatedCommentList = initialComments.filter((comment, index) => {
		return index !== commentIndex
	})

	commentsRef.doc(blogId).update({
		commentList: updatedCommentList
	})
		.then(() => store.dispatch('DELETE_COMMENT', { blogId, commentIndex }))
		.catch(error => {
			// This can be catched in try / catch
			throw new Error(error)
		})
}

const login = (email, password) => {
	firebase.auth().signInWithEmailAndPassword(email, password)
		.catch(error => {
			// This can be catched in try / catch
			throw new Error(error)
		})
}

const logout = () => {
	firebase.auth().signOut()
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
	deleteBlog,
	getComments,
	saveComment,
	deleteComment,
	login,
	logout
}