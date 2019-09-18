<template>
	<div class="left">
		<div 
			class="card"
			v-for="post in posts"
		>
			<div class="header">
				<router-link 
					v-bind:to="`/one/${post._id}`" 
					>{{post.title}}
				</router-link>
			</div>
			<div class="body">
				<p v-html="post.body.substring(0,200)"></p>
			</div>
			<div class="footer">
				{{convTime(post.date)}}
			</div>
		</div>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'; 
	import { fullTime } from '../../common';

	export default {
		name:'left',
		computed:mapGetters(['posts']),
		methods:{
			convTime(old){
				return fullTime(old);
			}
		}
	}
</script>

<style scoped>
	.left {
		display: grid;
		grid-template-columns: repeat(auto-fit,minmax(300px,1fr));
		grid-gap: 0.8rem;
	}
	.card {
		background:#E2D7D7;
		min-height: 200px;
		box-shadow: 3px 4px 3px #565656;
		border-radius: 2px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	.header {
		background: #333;
		font-size: 1.2rem;
		text-align: center;
		padding:0.2rem 0;
	}
	.header a {
		color: #fff;
	}
	.header a:hover {
		color: #E34BD0;
	}
	.body {
		padding: 0.5rem 1rem ;
	}
	.footer {
		background: #333;
		color:#fff;
		padding: 0.2rem 0;
		padding-left: 1rem;

	}
</style>