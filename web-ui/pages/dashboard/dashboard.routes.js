export default [
  {
    path:"/",
    name:'home',
    component:() => import('./views/Home.vue')
  },
  {
    path:"/todos",
    name:"todos",
    component:() => import('./views/Todos.vue'),
  }
]
