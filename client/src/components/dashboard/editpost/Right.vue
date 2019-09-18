<template>
	<div class="right">
		<div class="form-list-group">
			<h3>Category</h3>
			<!-- Category add -->
			<div class="add">
				<input id="add-cate" type="text" placeholder="Add Category">
				<a @click="addCate" href="#">Add</a>				
			</div>
			<select @change="cateChange">
				<option>unknown</option>
				<option
				v-for="cate in categorys"
				:key="cate._id"
				>
					{{cate.name}}
				</option>
			</select>
		</div>
		<div class="form-list-group">
			<h3>Folder</h3>
			<!-- Folder added -->
			<div class="add">
				<input 
				v-model="folderName"
				type="text" 
				placeholder="File Name...">
				<a
				@click="folderAddFunc" 
				href="#">Add</a>
			</div>
			<!-- File added -->
			<div class="add">
				<input 
				@change="fileAdd"
				type="file" placeholder="Add File" multiple>			
			</div>
			<select @change="folderChange">
				<option>unknown</option>
				<option 
					v-for="folder in folders"
					:key="folder._id"
				>
					{{folder.name}}
				</option>
			</select>
			<h3>Files of Folder</h3>
			<select>
				<option
					v-for="file in folderAddFile"
					:key="file._id"
				>
			{{file.name}}</option>

			</select>
		</div>
	</div>
</template>

<script>
	import { mapActions,mapGetters } from 'vuex';

	export default {
		name:'right',
		computed:mapGetters(['folders','folderAddFile','categorys']),
		methods:{
			...mapActions(
					[
						'setFolderAddFile',
						'folderFindAll',
						'folderAdd',
						'categoryFindAll',
						'categoryAdd'
					]
				),
			cateChange(e){
				this.$emit('cateChange',e.target.value);
				
			},
			folderChange(e){
				this.$emit('folderChange',e.target.value)
			},
			fileAdd(e){
				let files = e.target.files;

				for(let i=0;i < files.length;i++){
					let data = new FormData();
					data.append('files',files[i]);
					//send action
					this.setFolderAddFile(data);
				}
			},
			folderAddFunc(){
				const { folderName,folderAddFile } = this;
				const newFolder = { name:folderName,files:folderAddFile };
				//send action
				this.folderAdd(newFolder);
			},
			addCate(){
				let value = document.querySelector('#add-cate').value;
				this.categoryAdd({name:value});
			}
		},
		created(){
			this.folderFindAll();
			this.categoryFindAll();
			this.folderFindAll();
		},
		data(){
			return {
				folderName:''
			}
		}
	}
</script>

<style scoped>
	.form-list-group {
		width: 100%;
		background: #AAA5A5;
		padding: 5px;
		min-height: 120px;
		margin-bottom: 1rem;
	}
	.form-list-group select {
		width: 100%;
		padding: 3px;
	}
	.add {
		width: 100%;
		margin: 0.5rem 0; 
		display: flex;
	}
	.add input,
	.form-list-group input {
		width: 100%;
		font-size: 0.9rem;
		border: 0.3px solid #595555;
		padding: 4px;
	}
	.add a {
		padding: 4px;
		background: #686565;
		color: #fff;
	}
	.add a:hover {
		background: #989393;
	}
</style>