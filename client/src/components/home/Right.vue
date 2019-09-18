<template>
	<div class="right">
		<!-- Category -->
		<div class="category group">
			<h3>Category</h3>
			<input @input="searchCate" type="text" placeholder="Search Category...">
			<ul class="list">
				<li
				v-for="cate in categorys"
				v-bind:key="cate._id"
				>
					<a href="#" @click="postCateSearch(cate.name)">{{cate.name}}</a>
				</li>
			</ul>
		</div>
		<!-- Tag -->
		<div class="tag group">
			<h3>Tag</h3>
			<input type="text" placeholder="Search Tag...">
			<ul class="list">
				<li>
					<a href="#">One</a>
				</li>
				<li>
					<a href="#">One</a>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	import { mapActions,mapGetters } from 'vuex';

	export default {
		name:'right',
		computed:mapGetters(['categorys','tags']),
		methods:{
			...mapActions(['categoryFindAll','categorySearch','postCategorySearch']),
			searchCate(e){
				let search = e.target.value.toUpperCase();
				this.categorySearch(search);
			},
			postCateSearch(name){
				this.postCategorySearch(name);
			}
		},
		created(){
			this.categoryFindAll();
		}
	}
</script>

<style scoped>
.group input {
	width: 100%;
	font-size: 1rem;
	padding: 0.2rem;
	border: 1px solid #333;
	margin: 0.3rem 0;

}
.group .list {
	height: 130px;
	overflow-y: auto;
}
.category,
.tag {
	margin-bottom: 1rem;
	background: #908686;
	padding: 0.5rem;
}
.group .list li {
	 padding: 1px;
	 margin: 3px 0;
	 
}
.group .list li a {
	font-size: 1.1rem;
}
	
</style>