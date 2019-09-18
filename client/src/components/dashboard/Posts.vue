<template>
	<div class="posts">
		<div class="search">
			<input @input="onSearch" v-model="title" type="text" placeholder="Post Search...">
		</div>
		<table class="table">
			<thead>
				<tr>
					<th>Title</th>
					<th>Author</th>
					<th>Category</th>
					<th>File</th>
					<th>Date</th>
					<th>Edit</th>
					<th>Del</th>
				</tr>
			</thead>
			<tbody>
				<tr
					v-for="post in posts"
					:key="post._id"
				>
					<td>{{post.title}}</td>
					<td>{{post.author}}</td>
					<td>{{post.category}}</td>
					<td>{{post.file}}</td>
					<td>{{convDate(post.date)}}</td>
					<td>
						<router-link :to="{name:'editpost',params:{postId:post._id}}" class="btn">Edit</router-link>
					</td>
					<td>
						<button 
						@click="delPost(post._id)"
						class="btn btn-danger">
							Del
						</button>
					</td>
					
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
	import { mapGetters,mapActions } from 'vuex';
	import { halfTime } from '../../common';

	export default {
		name:'posts',
		computed:mapGetters(['posts']),
		methods:{
			...mapActions(['postFindAll','postDelete','postSearch']),
			delPost(id){
				this.postDelete(id);
			},
			onSearch(){
				this.postSearch(this.title);
			},
			convDate(old){
				return halfTime(old);
			}
		},
		created(){
			this.postFindAll();
		},
		data(){
			return {
				title:''
			}
		}
		
	}
</script>

<style scoped>
	
</style>