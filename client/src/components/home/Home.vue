<template>
	<div class="home">
		<Left />
		<Right />
	</div>
</template>

<script>
	import Left from './Left.vue';
	import Right from './Right.vue';

	export default {
		name:'home',
		components:{
			Left,
			Right
		}
	}
</script>

<style scoped>
	.home {

	}
	.left {
		width: 78%;
		float:left;
	}
	.right {
		width: 20%;
		float: right;
	}
</style>