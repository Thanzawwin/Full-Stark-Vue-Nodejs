<template>
	<div class="addpost">
		<div class="left">
			<form 
				class="form"
				@submit="submit"
			>
			<h3>Add Post</h3>
				<div class="form-group">
					<label>Title</label>
					<input type="text" v-model="title" placeholder="Title...">
				</div>
				<div class="form-group">
					<label>Author</label>
					<input type="text" v-model="author" placeholder="Author...">
				</div>
				<div class="form-group">
					<label>Category</label>
					<input type="text" v-model="category" placeholder="Category...">
				</div>
				<div class="form-group">
					<label>Folder</label>
					<input type="text" v-model="file" placeholder="Folder...">
				</div>
				<div class="form-group">
					<label>Body</label>
					<CKEditor
					v-on:bodyChange="bodyChange"
					/>
				</div>
				<input type="submit" value="addPost" class="btn btn-dark">
			</form>
		</div>
		<div class="right">
			<Right
				v-on:cateChange="cateChange"
				v-on:folderChange="folderChange"
			/>
		</div>
	</div>
</template>

<script>
	import { mapActions } from 'vuex';
	import Right from './Right.vue';
	import CKEditor from '../CKEditor.vue';

	export default {
		name:'addpost',
		data(){
			return {
				title:'',
				author:'unknown',
				body:'',
				category:'unknown',
				file:'unknown'
			}
		},
		components:{
			Right,
			CKEditor
		},
		methods:{
			...mapActions(['postAdd']),
			submit(e){
				e.preventDefault();
				const { title,author,body,category,file } = this;
				const newPost = { title,author,body,category,file };
				//send action
				this.postAdd(newPost);
			},
			cateChange(value){
				this.category = value;
			},
			folderChange(value){
				this.file = value;
			},
			bodyChange(value){
				this.body = value;
			}
		}
	}
</script>

<style scoped>
	.addpost {
		display: grid;
		grid-template-columns: 7fr 3fr;
		grid-gap: 1.5rem;
	}
	textarea {
		width: 100%;
		height: 100px;
		border: 1px solid #333;
	}
</style>