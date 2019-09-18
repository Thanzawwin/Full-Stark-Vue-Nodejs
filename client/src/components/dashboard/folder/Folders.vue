<template>
	<div class="folders">
		<!-- Add Folder -->
		<form @submit="submit" class="add">
			<input @input="onSearch" v-model="name" type="text" placeholder="Folder Add...">
			<input type="submit" value="add" class="btn btn-dark">
		</form>
		<!-- Add File -->
		<form class="file">
			<input type="file" @change="fileAdd" multiple>
			<select>
				<option
				v-for="file in folderAddFile"
				:key="file.name"
				>
					{{file.name}}
				</option>
			</select>		
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
					v-for="folder in folders"
					:key="folder._id"
				>
					<td>
					<router-link :to="{name:'folderdetail',params:{folderId:folder._id}}">
						{{folder.name}}
					</router-link>
					</td>
					<td>{{convTime(folder.date)}}</td>
					<td>Edit</td>
					<td>
						<a href="#" @click="onDelete(folder._id)" class="btn btn-danger">Del</a>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
	import { mapGetters,mapActions } from 'vuex';
	import { halfTime } from '../../../common';

	export default {
		name:'folders',
		computed:mapGetters(['folders','folderAddFile']),
		methods:{
			...mapActions(['folderFindAll','folderDel','folderAdd','folderSearch','setFolderAddFile']),
			submit(e){
				e.preventDefault();
				this.folderAdd({name:this.name,files:this.folderAddFile});
			},
			onDelete(id){
				this.folderDel(id);
			},
			onSearch(){
				this.folderSearch(this.name.toUpperCase());
			},
			fileAdd(e){
				let files = e.target.files;
				if(files.length > 0){
					for(let i=0;i < files.length;i++){
						let data = new FormData();
						data.append('files',files[i]);
						//send actions
						this.setFolderAddFile(data);
					}
				}
			},
			convTime(old){
				return halfTime(old);
			}
		},
		created(){
			this.folderFindAll();
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
	.file {
		margin: 0.4rem 0;
	}
	.file select {
		min-width: 70px;
	}
</style>