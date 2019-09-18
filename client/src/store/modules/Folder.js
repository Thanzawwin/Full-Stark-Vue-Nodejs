import axios from 'axios';

const url1 = 'http://localhost:5000/api/folder';
const url2 = 'http://localhost:5000/api/file';

const config1 = {
	headers: {
		'Content-Type': 'application/json'
	}
}

const config2 = {
	headers:{
		'Content-Type':'multipart/form-data'
	}
}

const state = {
	folders:[],
	folder:{},
	folderAddFile: []
}

const getters = {
	folders:state => state.folders,
	folder:state => state.folder,
	folderAddFile:state => state.folderAddFile
}

const mutations = {
	setFolders:(state,folders) => state.folders = folders,
	setFolder:(state,folder) => state.folder = folder,
	setFolderAddFile:(state,file) => state.folderAddFile.push(file),
	setAddFolder:(state,folder) => state.folders.unshift(folder),
	delFolder:(state,id) => state.folders = state.folders.filter(fo => fo._id !== id),
	folderSearch:(state,folders) => state.folders = folders
}

const actions = {
	setFolderAddFile:({commit,dispatch},files) =>{
		axios.post(url2,files,config2)
			.then(({data})=>{
				commit('setFolderAddFile',data);
			})
			.catch(err => {
				dispatch('error',err.response.data)
			})
	},
	folderAdd:({commit,dispatch},folder) =>{
		axios.post(url1,folder,config1)
			.then(({data})=>{
				commit('setAddFolder', data);
				dispatch('success', 'Folder Added');
			})
			.catch(err => {
				dispatch('error', err.response.data)
			})
	},
	folderFindAll:({commit}) => {
		axios.get(url1)
			.then(({data})=>{
				commit('setFolders', data);
			})
	},
	folderFindOne:({commit},id) => {
		axios.get(`${url1}/${id}`)
			.then(({data})=>{
				commit('setFolder', data);
			})
	},
	folderFindName:({commit,dispatch},name) =>{
		axios.get(`${url1}/name/${name}`)
			.then(({data})=>{
				commit('setFolder', data);
			})
			.catch(err =>{
				dispatch('error', err.response.data);
			})
	},
	folderUpdate:({commit,dispatch},folder) =>{
		let id = folder._id;
		axios
			.put(`${url1}/${id}`,folder,config1)
			.then(({data})=>{
				commit('setFolder',folder);
				dispatch('success', 'Folder Save');
			})
			.catch(err => {
				dispatch('error', err.response.data);
			})
	},
	folderDel:({commit,dispatch},id) =>{
		axios
			.delete(`${url1}/${id}`)
			.then(({ data }) => {
				commit('delFolder', id);
				dispatch('success', 'Folder Deleted');
			})
			.catch(err => {
				dispatch('error', err.response.data);
			})
	},
	folderSearch:({commit},search) =>{
		axios.get(url1)
			.then(({ data }) => {
				if(search !== ''){
					let result = data.filter(fo => fo.name.toUpperCase().indexOf(search) > -1)
					commit('folderSearch', result);
				}else{
					commit('folderSearch', data);
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