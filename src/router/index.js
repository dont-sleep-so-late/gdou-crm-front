import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
	// {
	//   path: '/test',
	//   name: 'test',
	//   component: () => import('../views/Test.vue')
	// }
	{
		path: '/getAccounts',
		name: 'getAccounts',
		component: () => import('../views/GetAccounts.vue')
	},
	{
		path: '/editHeadImg',
		name: 'editHeadImg',
		component: () => import('../views/EditHeadImg.vue')
	},
	{
		path: '/editPwd',
		name: 'editPwd',
		component: () => import('../views/EditPwd.vue')
	},
	{
		path: '/getUsers',
		name: 'getUsers',
		component: () => import('../views/GetUsers.vue')
	},
	{
		path: '/getSearchs',
		name: 'getSearchs',
		component: () => import('../views/GetSearchs.vue')
	},
	{
		path: '/getDepts',
		name: 'getDepts',
		component: () => import('../views/GetDepts.vue')
	},
	{
		path: '/getShips',
		name: 'getShips',
		component: () => import('../views/GetShips.vue')
	},
	{
		path: '/echars',
		name: 'echars',
		component: () => import('../views/Echars.vue')
	},
]

const router = new VueRouter({
	routes
})

export default router