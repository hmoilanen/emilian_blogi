<template>
  <div class="view--home" :style="styling">
		<div class="content-wrapper">

			<Add-Blog v-if="isLogged"/>
			<template v-if="latestBlog">
				<div>
					<h2 @click="goToBlog">{{ latestBlog.title }}</h2>
					<div>{{ latestBlog.text }}</div>
					<div>lisätty: {{ parseCreated(latestBlog.created) }}</div>
				</div>
			</template>
			<div v-else>LOADING...</div>

		</div>
  </div>
</template>

<script>
import { getLatestBlog } from '@/firebase/api'
import { timestampToDate } from '@/utils/parse'
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
	},

	computed: {
		isLogged() {
			return this.$store.state.isLogged
		},

		latestBlog() {
			const latestBlog = this.$store.state.latestBlog

			return latestBlog
				?	latestBlog
				: null
		},

		styling() {
			return {
				paddingTop: `${this.$store.state.ui.navTopHeight}px` || '60px'
			}
		}
	},

	methods: {
		goToBlog() {
			this.$router.push({ name: 'Blog', params: { id: this.latestBlog.id } })
		},

		parseCreated(timestamp) {
			return timestampToDate(timestamp)
		}
	}
}
</script>

<style lang="scss" scoped>
.view--home {}
</style>