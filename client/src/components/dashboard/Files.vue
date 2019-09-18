<template>
	<div class="files">
		<!-- Add File -->
		<form @submit="submit" class="add">
			<input id="file" type="file" multiple >
			<input type="submit" value="add" class="btn btn-dark">
		</form>
		<!-- Searc File -->
		<form class="search">
			<input @input="onSearch" v-model="name" type="text" placeholder="Search File...">
		</form>
		<table class="table">
			<thead>
				<tr>
					<th>Name</th>
					<th>Size</th>
					<th>Type</th>
					<th>Date</th>
					<th>Edit</th>
					<th>Del</th>
				</tr>
			</thead>
			<tbody>
				<tr
					v-for="file in files"
					:key="file._id"
				>
					<td>{{file.name.substring(0,20)}}</td>
					<td>{{fileMB(file.size)}}</td>
					<td>{{file.type}}</td>
					<td>{{convDate(file.date)}}</td>
					<td>
						edit
					</td>
					<td>
						<a @click="fileDel(file._id)" href="#" class="btn btn-danger">Del</a>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
	import { mapGetters,mapActions } from 'vuex';
	import { halfTime,fileMB } from '../../common';

	export default {
		name:'files',
		computed:mapGetters(['files']),
		methods:{
			...mapActions(['fileFindAll','fileAdd','fileDelete','fileSearch']),
			submit(e){
				let files = document.querySelector('#file').files;
				e.preventDefault();

				for(let i=0;i < files.length;i++){
					let data = new FormData();
					data.append('files',files[i]);
					//action
					this.fileAdd(data);
				}

			},
			fileDel(id){
				this.fileDelete(id);
			},
			onSearch(){
				this.fileSearch(this.name.toUpperCase());
			},
			convDate(old){
				return halfTime(old);
			},
			fileMB(num){
				return fileMB(num);
			}
		},
		created(){
			this.fileFindAll();
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
	.add input,
	.search input {
		width: 100%;
		flex: 12;
		font-size: 1.2rem;
		border: 1px solid #333;
		padding: 5px;
	}
	.add .btn {
		flex: 1;
	}
	.search {
		margin-bottom: 0.5rem;
	}
</style>