import Vue from 'vue'
import Router from 'vue-router'

import Home from './components/home/Home.vue';
import PostOne from './components/PostOne.vue';

//dashboard
import Dashboard from './components/dashboard/Dashboard.vue';
import Posts from './components/dashboard/Posts.vue';
import Files from './components/dashboard/Files.vue';
import Categorys from './components/dashboard/Categorys.vue';
import AddPost from './components/dashboard/addpost/AddPost.vue';
import Folders from './components/dashboard/folder/Folders.vue';
import FolderDetail from './components/dashboard/folder/FolderDetail.vue';
import EditPost from './components/dashboard/editpost/EditPost.vue';
import SubTitle from './components/dashboard/SubTitle.vue';
//user
import Profile from './components/user/profile/Profile.vue';

import NotFound from './components/NotFound.vue';

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/one/:postId',
      name: 'postone',
      component: PostOne
    },
    {
    	path:'/dashboard',
    	name:'dashboard',
    	component:Dashboard,
    	children:[
    		{
    			path:'/posts',
    			name:'posts',
    			component:Posts
    		},
				{
					path: '/add post',
					name: 'addpost',
					component: AddPost
				},
        {
          path: '/edit-post/:postId',
          name: 'editpost',
          component: EditPost
        },
				{
					path: '/categorys',
					name: 'categorys',
					component: Categorys
				},
				{
					path: '/files',
					name: 'files',
					component: Files
				},
        {
          path: '/SubTitle',
          name:'subtitle',
          component:SubTitle
        },
        {
          path: '/folders',
          name: 'folders',
          component: Folders
        },
        {
          path:'/folder/:folderId',
          name:'folderdetail',
          component:FolderDetail
        }
    	]
    },
    {
      path:'/profile',
      name:'profile',
      component:Profile
    },
		{
			path: '*',
			name: 'notfound',
			component: NotFound
		}
  ]
})
