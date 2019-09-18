<template>
	<div class="categorys">
		<form @submit="submit" class="add">
			<input @input="onSearch" v-model="name" type="text" placeholder="Category Add...">
			<input type="submit" value="add" class="btn btn-dark">
		</form>
		<table class="table">
			<thead>
				<tr>
					<th>Name</th>
					<th>Date</th>
					<th>Edit</th>
					<th>Del</th>
				</tr>
			</thead>
			<tbody>
				<tr
					v-for="cate in categorys"
					:key="cate._id"
				>
					<td>{{cate.name}}</td>
					<td>{{convTime(cate.date)}}</td>
					<td>edit</td>
					<td>
						<a href="#" @click="onDel(cate._id)" class="btn btn-danger" >Del</a>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
	import { mapActions,mapGetters } from 'vuex';
	import { halfTime } from '../../common';

	export default {
		name:'categorys',
		computed:mapGetters(['categorys']),
		methods:{
			...mapActions(['categoryFindAll','categoryAdd','categorySearch','categoryDel']),
			submit(e){
				e.preventDefault();

				this.categoryAdd({name:this.name});
			},
			onSearch(){
				this.categorySearch(this.name.toUpperCase());
			},
			onDel(id){
				this.categoryDel(id);
			},
			convTime(old){
				return halfTime(old);
			}
		},
		created(){
			this.categoryFindAll();
		},
		data(){
			return {
				name:''
			}
		}
		
	}
</script>

<style scoped>
	.add {
		display:flex;
		margin-bottom: 1rem;
	}
	.add input {
		width: 100%;
		flex: 12;
		font-size: 1.2rem;
		border: 1px solid #333;
		padding: 5px;
	}
	.add .btn {
		flex: 1;
	}
</style>