<template>
	<div class="detail">
		<div class="left">
			<div class="go-back">
				<router-link to="/Folders" class="btn btn-dark">Go Back</router-link>
			</div>
			<h3>{{folder.name}}</h3>
			<strong>Files</strong>
			<!-- Save -->
			<br />
			<button 
			@click="update(folder._id)"
			class="btn btn-dark">Save</button>
			<hr />
			<ul class="list">
				<li
				v-for="file in folder.files"
				 @mouseover="fileShow(file)"
				>
					{{file.name.substring(0,20)+'.....'}}
					<!-- file show -->
					<div class="fileShow">{{file.name}}</div>
					<button @click="detailDel(file._id)" class="del">del</button>
				</li>
			</ul>

		</div>

		<div class="right">
			<h1>Files</h1>
			<input type="text" placeholder="Search...">
			<!-- Save -->
			<br />
			<hr />
			<ul class="list">
				<li
				v-for="file in files"
				 @mouseover="fileShow(file)"
				>
					{{file.name.substring(0,20)+'.....'}}
					<!-- file show -->
					<div class="fileShow">{{file.name}}</div>

					<button @click="detailFileAdd(file)" class="add">add</button>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	import { mapActions,mapGetters } from 'vuex';

	export default {
		name:'folderdetail',
		computed:mapGetters(['files','folder']),
		methods:{
			...mapActions(['fileFindAll','folderFindOne','folderUpdate']),
			update(id){
				this.folderUpdate(this.folder);
			},
			detailDel(id){
				this.folder.files = this.folder.files.filter(f => f._id !== id);
			},
			detailFileAdd(file){				
				this.folder.files = [...this.folder.files,file];
			},
			fileShow(file){
				// console.log(file.name,file.type)
			}
		},
		created(){
			this.fileFindAll();
			this.folderFindOne(this.$route.params.folderId);
		},
		data(){
			return {
				stateFolder:{}
			}
		}
	}
</script>

<style scoped>
/* go back */
	.go-back {
		margin: 0.5rem 0;
	}
	.detail{
		display: grid;
		grid-template-columns: 4fr 4fr;
		grid-gap: 1fr;

	}
	.left .list,
	.right .list {
		height: 400px;
		overflow: auto;
		padding-bottom: 1.5rem;
	}
	/* left */
	.left {
		width: 100%;
		right: 0;
		height: 500px;
		border-right: 4px solid #333;
		padding: 0 1rem;
	}
	.del {
		color: #fff;
		float: right;
		border: 1px solid #333;
		padding: 3px;
		background: red;
		cursor: pointer;
	}
	.add {
		color: #fff;
		float: right;
		border: 1px solid #333;
		padding: 3px;
		background: green;
		cursor: pointer;
	}
	/* rignt */
	.right {
		width: 100%;
		padding: 0 1rem;
	}
	.right .list li {
		font-size: 1.2rem;
	}
	.right .list li:hover {
		color: #04AB15;
		cursor: pointer;
	}
	.right input {
		width: 100%;
		font-size: 1.1rem;
		padding: 0.2rem ;
	}
	li {
		position: relative;
	}
	li:hover .fileShow {
		display: block;
	}
	/* file show */
	.fileShow {
		color: #fff;
		display: none;
		position: absolute;
		right: 1rem;
		to: 50px;
		z-index: 1;
		min-width: 150px;
		background:#717171;
		padding: 0.5rem;
		/* overflow-x: auto; */
	}
</style>