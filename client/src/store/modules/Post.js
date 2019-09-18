import axios from 'axios';

const url = 'http://localhost:5000/api/post';
const config = {
	headers:{
		'Content-Type':'application/json'
	}
}

const state = {
	posts:[],
	post:{},
	postAdded:false
}

const getters = {
	posts:state => state.posts,
	post:state => state.post
}

const mutations = {
	setPosts: (state,posts) => state.posts = posts,
	setPost: (state,post) => state.post = post ,
	delPosts: (state,id) => state.posts = state.posts.filter(p => p._id !== id),
	postSearch:(state,posts) => state.posts = posts
}

const actions = {
	postFindAll: ({commit}) =>{
		axios.get(url)
			.then(({data})=>{
				commit('setPosts', data);
			})
	},
	postFindOne:({commit},id) =>{
		axios.get(`${url}/${id}`)
			.then(({data})=>{
				commit('setPost', data);
			})
	},
	postAdd:({commit,dispatch},post) =>{
		axios.post(url,post,config)
			.then(({data})=>{
				dispatch('success', 'Post Added');
			})
			.catch(err => {
				dispatch('error', err.response.data);
			})
	},
	postUpdate:({commit,dispatch},post) =>{
		axios.put(`${url}/${post.id}`,post,config)
			.then(({data})=>{
				dispatch('success', 'Post Updated');
			})
			.catch(err => {
				dispatch('error', err.response.data);
			})
	},
	postDelete:({commit,dispatch},id) =>{
		axios.delete(`${url}/${id}`)
			.then(({data})=>{
				commit('delPosts', id);
				dispatch('success', 'Post Deleted');
			})
			.catch(err => {
				dispatch('error', err.response.data);
			})
	},
	postSearch:({commit},search) =>{
		axios.get(url)
			.then(({ data }) => {
				let result = data.filter(p => p.title.toUpperCase().indexOf(search.toUpperCase()) > -1)
				commit('postSearch', result);
			})
	},
	postCategorySearch:({commit},cate) =>{
		axios.get(url)
			.then(({data})=>{
				let result = data.filter(p => p.category == cate);
				commit('postSearch', result);
			})
	}
}

export default {
	state,
	getters,
	mutations,
	actions
}