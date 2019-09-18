<template>
	<div class="subtitle">
		<div class="left">
			<!-- add and update -->
			<h4>Add && Update</h4>
			<form @submit="subAdd" class="add">
				<input type="text" v-model="name" placeholder="Sub Title Add...">
				<input type="submit" class="btn btn-dark">
			</form>
			<ul class="list title">
				<li
				v-for="title in subTitles"
				:key="title._id"
				@click="subOne(title._id)"
				>
					{{title.name}}
					<span
						@click="titleDel(title._id)"
						>&times;</span>
				</li>
			</ul>

			<!-- Out put -->
			<div
			v-if="Object.keys(subTitle).length > 0"
			class="out-put">
				Sub Title:<strong>{{subTitle.name}}</strong>
				<br />
				<strong>Subs</strong>:
				<br />
				<button 
				@click="titleUpdate" 
				class="btn btn-dark">Update</button>
				<ul class="list sub">
					<li
						v-for="sub in subTitle.subs"
						:key="sub"
					>
						{{sub}}
						<span
						@click="subDel(sub)"
						>&times;</span>
					</li>
				</ul>
			</div>
		</div>
		<!-- right -->
		<div class="right">
			<!-- add and update -->
			<h4>Category Add</h4>
			<form @submit="cateAdd" class="add">
				<input type="text" v-model="cateName" placeholder="Category Add...">
				<input type="submit" class="btn btn-dark">
			</form>
			<ul class="list cate">
				<li
				v-for="cate in categorys"
				>
					{{cate.name}}
					<span @click="subAddCate(cate.name)">Add</span>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	import { mapGetters,mapActions } from 'vuex';

	export default {
		name:'subtitle',
		computed:mapGetters(['subTitles','subTitle','categorys']),
		methods:{
			...mapActions(
				['subTitleOne',
				'categoryFindAll',
				'subTitleFindAll',
				'subTitleAdd',
				'subTitleUpdate',
				'subTitleDel',
				//category
				'categoryAdd'
				]
			),
			subOne(id){
				this.subTitleOne(id);
			},
			subAdd(e){
				e.preventDefault();
				this.subTitleAdd({name:this.name,subs:[]});
				this.name = '';
			},
			subAddCate(name){
				const { subs } = this.subTitle;
				if(!subs){
					return false;
				}
				if(subs.length > 0){
					let sub = subs.find(s => s == name);
					if(sub == undefined){
						this.subTitle.subs.push(name);					
					}
				}else{
					this.subTitle.subs.push(name);					
				}
			},
			titleUpdate(){
				this.subTitleUpdate(this.subTitle);
			},
			titleDel(id){
				this.subTitleDel(id);
			},
			subDel(name){
				this.subTitle.subs = this.subTitle.subs.filter(s => s !== name);
			},
			// category
			cateAdd(e){
				e.preventDefault();
				this.categoryAdd({name:this.cateName});
				this.cateName = '';
			}
		},
		created(){
			this.categoryFindAll();
			this.subTitleFindAll();
		},
		data(){
			return {
				name:'',
				cateName:''
			}
		}
	}
</script>

<style scoped>
	.subtitle {
		display: grid;
		grid-template-columns: 5fr 5fr;
		grid-gap: 1rem
	}
	/* add from */
	.add {
		display: grid;
		grid-template-columns: 8fr 2fr;
	}
	.add input[type="text"] {
		font-size: 1rem;
		border: 1px solid #333;
		padding: 2px;
	}


	.title {
		border-bottom: 3px solid #333;
		height: 180px;
	}
	.title li:hover {
		cursor: pointer;
		color: #A2A0A0;
	}
	.out-put {
		padding: 1.5rem 0;
	}
	.sub li,
	.cate li,
	.title li {
		position: relative;
	}
	.sub span,
	.title span {
		font-size: 1.8rem;
		color: red;
		/* background: #545454; */
		position: absolute;
		right: 0;
		top: -5px;
		cursor: pointer;
		text-shadow: 2px 3px 4px #767474;
	}
	.sub span:hover {
		color: #F714A7;
	}
	.cate span {
		font-size: 1rem;
		position: absolute;
		right: 3px;
		top: 4px;
		color: #0DB00F;
		cursor: pointer;
		text-shadow: 2px 3px 4px #767474;
	}
	.cate span:hover {
		color: #108F11;
	}

</style>