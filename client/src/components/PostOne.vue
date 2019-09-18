<template>
	<div class="view">
		<router-link to="/" class="btn btn-dark">Go Back</router-link>
		<!-- check post -->
		<div v-if="post._id == postId">
			<h1>{{post.title}}</h1>
		<strong>Author</strong>
		{{post.author}}
		<br />
		<strong>Date</strong>
		{{convTime(post.date)}}
		<br />
		<strong>Category</strong>
		{{post.category}}
		<br />
		<router-link :to="{name:'editpost',params:{postId:post._id}}" class="btn btn-dark">Post Edit</router-link>
		<hr />
		<!-- mp3 -->
		<MusicPlayer
		v-if="folder"
		:folder="folder"
		/>

		<p v-html="post.body"></p>
		</div>
		
	</div>
</template>

<script>
	import { mapGetters,mapActions } from 'vuex';
	import MusicPlayer from './MusicPlayer.vue';
	import { fullTime } from '../common';

	export default {
		name:'postone',
		computed:mapGetters(['post','folder']),
		components:{MusicPlayer},
		methods:{
			...mapActions(['postFindOne','folderFindName']),
			convTime(old){
				return fullTime(old);
			},
			findFolder(name){
				this.folderFindName(name);
			}
		},
		created(){
			this.postFindOne(this.$route.params.postId);
			this.postId = this.$route.params.postId;
			setTimeout(()=>{
				this.findFolder(this.post.file);
			},1000);

		},
		data(){
			return {
				postId:''
			}
		}
	}
</script>

<style scoped>
	.view {
		line-height: 1.5;
		position: relative;
		
	}

</style>