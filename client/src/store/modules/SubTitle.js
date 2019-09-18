const subs = [
	{
		_id: '1',
		name: 'Speaking',
		subs: [
			'7 Way',
			'bbc english',
			'easy conversation'
		]
	},
	{
		_id: '2',
		name: 'Grammer',
		subs: [
			'Vocabulary',
			'Adj'
		]
	},
	{
		_id: '3',
		name: 'Beginner',
		subs: []
	}
]

import axios from 'axios';

const url = 'http://localhost:5000/api/sub-title';
const config = {
	headers: {
		'Content-Type': 'application/json'
	}
}

const state = {
	subTitles:subs,
	subTitle:{}
}

const getters = {
	subTitles:state => state.subTitles,
	subTitle:state => state.subTitle
}

const mutations = {
	setSubtitles: (state, subs) => state.subTitles = subs,
	setSubtitle: (state, sub) => state.subTitle = sub,
	addSubtitle:(state,sub) => state.subTitles.unshift(sub),
	delSubTitle:(state,id) => state.subTitles = state.subTitles.filter(s => s._id !== id)
}

const actions = {
	subTitleOne:({commit},id) =>{
		axios.get(`${url}/${id}`)
			.then(({ data }) => {
				commit('setSubtitle', data);
			})
	},
	subTitleFindAll:({commit}) =>{
		axios.get(url)
			.then(({data})=>{
				commit('setSubtitles', data);
			})
	},
	subTitleAdd:({commit,dispatch},subTitle) =>{
		axios.post(url,subTitle,config) 
			.then(({ data }) => {
				commit('addSubtitle', data);
				dispatch('success', 'SubTitle Added');
			})
			.catch(err =>{
				dispatch('error', err.response.data);
			})
	},
	subTitleUpdate:({commit,dispatch},subTitle) =>{
		let id = subTitle._id;
		axios.put(`${url}/${id}`, subTitle, config)
			.then(({ data }) => {
				commit('addSubtitle', data);
				dispatch('success', 'SubTitle Updated');
				dispatch('subTitleFindAll');
			})
			.catch(err => {
				dispatch('error', err.response.data);
			})
	},
	subTitleDel:({commit,dispatch},id) =>{
		axios.delete(`${url}/${id}`)
			.then(({ data }) => {
				commit('delSubTitle', id);
				dispatch('success', 'SubTitle Deleted');
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