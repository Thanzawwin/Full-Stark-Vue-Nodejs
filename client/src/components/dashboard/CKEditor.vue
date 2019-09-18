<template>
	<div class="editor">
			{{init()}}
		<ckeditor @input="onChange" :editor="editor" v-model="editorData" ></ckeditor>
	</div>
</template>

<script>
	import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

	export default {
		name:'editor',
		props:['body'],
		data(){
			return {
				editor:ClassicEditor,
				editorData:''
			}
		},
		methods:{
			onChange(){
				this.$emit('bodyChange',this.editorData)
			},
			init(){
				this.editorData = this.body;
			}
		}
	}
</script>


<style>
	.ck-content {
		height: 150px;
		overflow-y: auto;

	}
</style>