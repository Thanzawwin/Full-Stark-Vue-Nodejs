import axios from 'axios';

const url = 'http://localhost:5000/api/category';
const config = {
	headers: {
		'Content-Type': 'application/json'
	}
}

const state = {
	categorys:[],
	category:{}
}

const getters = {
	categorys:state => state.categorys,
	category:state => state.category
}

const mutations = {
	setCategorys: (state, categorys) => state.categorys = categorys,
	setCategory: (state, category) => state.category = category,
	addCategorys:(state,category) => state.categorys.unshift(category),
	delCategory:(state,id) => state.categorys = state.categorys.filter(cate => cate._id !== id)
}

const actions = {
	categoryFindAll:({commit}) => {
		axios.get(url)
			.then(({data})=>{
				commit('setCategorys', data);
			})
	},
	categoryFindOne: ({ commit },id) => {
		axios.get(`${url}/${id}`)
			.then(({ data }) => {
				commit('setCategory', data);
			})
	},
	categoryAdd:({commit,dispatch},cate) => {
		axios.post(url,cate,config)
			.then(({data})=>{
				commit('addCategorys', data);
				dispatch('success', 'Category Added');
			})
			.catch(err => {
				dispatch('error', err.response.data);
			})
	},
	categorySearch:({commit},search) =>{
		axios.get(url)
			.then(({ data }) => {
				let result = data.filter(cate => cate.name.toUpperCase().indexOf(search) > -1);
				commit('setCategorys', result);
			})
	},
	categoryDel:({commit,dispatch},id) =>{
		axios.delete(`${url}/${id}`)
			.then(({ data }) => {
				commit('delCategory', id);
				dispatch('success', 'Category Deleted');
			})
			.catch(err => {
				dispatch('error', err.response.data);
			})
	}
}


export default {
	state,
	getters,
	mutations,
	actions
}