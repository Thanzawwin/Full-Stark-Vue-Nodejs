<template>
	<div class="navbar">
		<a 
		href="#"
		class="navbar-brand"
		@click="home" 
		>Home</a>

		<ul class="left">
			<li>
				<router-link to="/posts">Dashboard</router-link>
			</li>
			<li>
				<router-link to="/profile">Profile</router-link>
			</li>
		</ul>
		<!-- sub-title -->
			<SubTitle />
		<ul class="right">
			<li>
				<router-link to="/login">Login</router-link>
			</li>
			<li>
				<router-link to="/register">Register</router-link>
			</li>
			<li>
				<a href="#">Logout</a>
			</li>
		</ul>
	</div>
</template>

<script>
	import { mapActions } from 'vuex';
	import SubTitle from './SubTitle.vue';

	export default {
		name:'navbar',
		components:{ SubTitle },
		methods:{
			...mapActions(['postFindAll']),
			home(){
				this.postFindAll();
				if(this.$route.path !== '/'){
					this.$router.push({path:'/'});
				}
			}
		}
	}
</script>

<style scoped>
	.navbar {
		background: #3A3535;
		display: grid;
		grid-template-columns: 1fr 1.5fr 4fr 2fr;
	}
	.navbar-brand {
		text-align: center;
		padding: 0.5rem;
		font-size: 1.5rem;
	}
	a {
		color: #fff;
	}
	a:hover {
		color: #FD2525;
	}
	.left,
	.right {
		display: flex;
	}
	.left {
		justify-content: flex-start;
	}
	.right {
		justify-content: flex-end;
		padding-right: 1rem;
	}
	.left li ,
	.right li {
		padding: 0.9rem 0.6rem;
	}

</style>