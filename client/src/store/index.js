import Vue from 'vue';
import Vuex from 'vuex';

//load module
import Post from './modules/Post';
import Message from './modules/Message';
import File from './modules/File';
import Folder from './modules/Folder';
import Category from './modules/Category';
import SubTitle from './modules/SubTitle';

//load vuex
Vue.use(Vuex);

export default new Vuex.Store({
	modules:{
		Post,
		Message,
		File,
		Folder,
		Category,
		SubTitle
	}
})