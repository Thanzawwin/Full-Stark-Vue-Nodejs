<template>
	<div class="dashboard">
		<div class="left">
			<ul class="list">
				<li
					v-for="name in comNames"
				>
					<router-link :to="'/'+name" >{{name}}</router-link>
				</li>
			</ul>
		</div>
		<div class="right">
			<router-view></router-view>
		</div>
	</div>
</template>

<script>
	export default {
		name:'home',
		data(){
			return {
				comNames:['Posts','Add Post','Categorys','Folders','Files','SubTitle']
			}
		}
	}
</script>

<style scoped>
	.dashboard {
		display: grid;
		grid-template-columns: 3fr 10fr;
		grid-gap: 1.5rem;
	}
</style>