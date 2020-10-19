<template>
	<div class="nav-top" :style="styling">
		<section>
			<router-link
				v-for="link in links"
				:key="link.text"
				:to="{ name: link.to }"
			>{{ link.text }}</router-link>
		</section>

		<section>
			<button
				v-if="!isLogged"
				@click="login"
			>login</button>
			<button
				v-else
				@click="logout"
			>logout</button>
		</section>
	</div>
</template>

<script>
import { login, logout } from '@/firebase/api'

export default {
	name: 'NavTop',

	data() {
		return {
			links: [
				{ text: 'Etusivu', to: 'Home' },
				{ text: 'Arkisto', to: 'Blogs' }
			],
			// dummyt:
			email: 'emilia@maili.com',
			password: '666420'
		}
	},

	computed: {
		isLogged() {
			return this.$store.state.isLogged
		},

		styling() {
			return {
				height: this.$store.state.ui.navTopHeight + 'px'
			}
		}
	},

	methods: {
		login() {
			try {
				login(this.email, this.password)
			} catch(error) {
				console.log('Error signing in:', error)
			}
		},

		logout() {
			try {
				logout()
			} catch(error) {
				console.log('Error signing out:', error)
			}
		}
	}
}
</script>

<style lang="scss" scoped>
.nav-top {
	background: rgb(187, 248, 187);
	
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	padding: 0 1rem;
	display: flex;
	align-items: center;
	justify-content: space-between;

	a {
		margin-right: 1rem;
		font-weight: 700;
		color: rgb(76, 143, 76);
		&.router-link-exact-active {
      color: black;
    }
	}
}
</style>