<template>
	<div class="subtitle">
		<ul class="title">
			<li
			v-for="sub in subTitles"
			>
				<a href="#">{{sub.name}}</a>
				<ul
				v-for="subName in subTitles" 
				v-if="subName.name == sub.name"
				class="sub-title">
					<li
					v-for="sub in subName.subs"
					>
						{{sub}}
					</li>
				</ul>
			</li>
		</ul>
		
	</div>
</template>

<script>
	import { mapGetters } from 'vuex';

	export default {
		name:'subtitle',
		computed:mapGetters(['subTitles'])
	}
</script>

<style scoped>
	a {
		color: #fff;
	}
	a:hover {
		color: #FD2525;
	}
	.title {
		display: flex;
		position: relative;
	}
	.title li {
		padding: 0.9rem 0.6rem;
		
	}
	.title li:hover .sub-title {
		display: block;
	}
	.sub-title {
		position: absolute;
		top: 45px;
		min-width: 150px;
		background:#545454;
		display: none;
		z-index: 1;
	}
	.sub-title li {
		padding: 0;
		padding: 10px 0;
		padding-left: 10px;
		border-bottom: 1px solid #06139B;
		font-size: 1.2rem;
		cursor: pointer;
		color: #fff;
	}
	.sub-title li:hover {
		background: #3D3636;
	}
</style>