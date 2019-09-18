<template>
	<div class="editpost">
		<div class="left">
			<form 
				class="form"
				@submit="submit"
			>
			<h3>Edit Post</h3>
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
					v-bind:body = post.body
					/>
				</div>
				<input type="submit" value="editPost" class="btn btn-dark">
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
	import { mapActions,mapGetters } from 'vuex';
	import Right from './Right.vue';
	import CKEditor from '../CKEditor.vue';

	export default {
		name:'editpost',
		computed:mapGetters(['post']),
		data(){
			return {
				id:'',
				title:'',
				author:'',
				body:'',
				category:'',
				file:''
			}
		},
		components:{
			Right,
			CKEditor
		},
		methods:{
			...mapActions(['postFindOne','postUpdate']),
			submit(e){
				e.preventDefault();
				const { id,title,author,body,category,file } = this;
				const updatePost = { id,title,author,body,category,file };
				//send action
				this.postUpdate(updatePost);
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
		},
		created(){
			this.postFindOne(this.$route.params.postId);

			setTimeout(()=>{
				//reset form
				this.id = this.post._id;
				this.title = this.post.title;
				this.author = this.post.author;
				this.body = this.post.body;
				this.category = this.post.category;
				this.file = this.post.file;
			},1500);
		}
	}
</script>

<style scoped>
	.editpost {
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