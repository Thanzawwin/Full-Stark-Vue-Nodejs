import axios from 'axios';

const url = 'http://localhost:5000/api/file';

const config = {
	headers:{
		'Content-Type':'multipart/form-data'
	}
}

const state = {
	files:[],
	file:{}
}

const getters = {
	files:state => state.files,
	file:state => state.file
}

const mutations = {
	setFiles:(state,files) => state.files = files,
	setFile:(state,file) => state.file = file,
	setAddFile:(state,file) => state.files.unshift(file),
	removeFile:(state,id) => {
		state.files = state.files.filter(f => f._id !== id);
	},
	fileSearch:(state,files) => state.files = files
}

const actions = {
	fileAdd:({commit,dispatch},files) =>{
		axios.post(url,files,config)
			.then(({data})=>{
				commit('setAddFile', data);
				dispatch('success', 'File Added');
			})
			.catch(err => {
				dispatch('error',err.response.data)
			})
	},
	fileFindAll:({commit}) =>{
		axios.get(url)
			.then(({data})=>{
				commit('setFiles', data);
			})
	},
	fileDelete: ({ commit,dispatch }, id) => {
		commit('removeFile', id);

		axios.delete(`${url}/${id}`)
			.then(({data})=>{
				if(data.ok == 1){
					dispatch('success', 'file deleted');
				}
			})
			.catch(err => {
				dispatch('error', err.response.data)
			})
	},
	fileSearch: ({ commit }, search) => {
		axios.get(url)
			.then(({ data }) => {
				if (search !== '') {
					let result = data.filter(f => f.name.toUpperCase().indexOf(search) > -1)
					commit('fileSearch', result);
				} else {
					commit('fileSearch', data);
				}

			})
	}
}

export default {
	state,
	getters,
	mutations,
	actions
}