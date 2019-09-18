<template>
	<div class="msg">
		<!-- msg clear -->
		{{clear()}}
		<!-- success -->
		<div 
			v-if="msgSuccess !== '' "
			v-bind:class="{'message success': msgSuccess !== ''}"
		>
			{{msgSuccess}}
		</div>
		<!-- error -->
		<div
			v-if="msgError !== '' "
			v-bind:class="{'message error':msgError !== ''}"
		>
			{{msgError}}
		</div>
	</div>
</template>

<script>
	import { mapActions,mapGetters } from 'vuex';

	export default {
		name:'message',
		computed:mapGetters(['msgError','msgSuccess']),
		methods:{
			...mapActions(['success','error','msgClear']),
			clear(){
				if(this.msgError !== ''){
					setTimeout(()=>{
						this.msgClear();
						},3000);
				}else if(this.msgSuccess !== ''){
					setTimeout(()=>{
						this.msgClear();
						},5000);
				}
			}
		}
	}
</script>

<style scoped>
	.message {
		width: 95%;
		margin: 1rem auto;
		/* height: 40px; */
		padding: 0.4rem 0;
		text-align: center;
		font-size: 1.3rem;
	}

	.success {
		background:#0BAA12;
		color: #fff;
	}
	.error {
			background:#F85549;
			color: #fff;
		}
	
</style>