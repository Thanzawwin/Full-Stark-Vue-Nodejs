const state = {
	success:'',
	error:''
}

const getters = {
	msgSuccess:state => state.success,
	msgError:state => state.error
}

const mutations = {
	setSuccess:(state,msg) => {
		state.success = msg;
		state.error = '';
	},
	setError:(state,msg) => {
		state.error = msg;
		state.success = '';
	},
	allClear:state => {
		state.success = '';
		state.error = '';
	}
}

const actions = {
	error:({commit},msg) =>{
		commit('setError', msg);
	},
	success:({commit},msg) =>{
		commit('setSuccess', msg);
	},
	msgClear:({commit}) =>{
		commit('allClear');
	}
}


export default {
	state,
	getters,
	mutations,
	actions
}