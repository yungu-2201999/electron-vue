import * as VueRouter from "vue-router";
//路由规则描述数组
const routes = [
  { path: "/", redirect: "/WindowMain/Chat" },
  {
    path: "/WindowMain",
    component: () => import("./Window/WindowMain.vue"),
    children: [
      { path: "Chat", component: () => import("./Window/WindowMain/Chat.vue") },
      { path: "Contact", component: () => import("./Window/WindowMain/Contact.vue") },
      { path: "Collection", component: () => import("./Window/WindowMain/Collection.vue") },
    ],
  },
  {
    path: "/WindowSetting",
    component: () => import("./Window/WindowSetting/index.vue"),
    children: [{ path: "AccountSetting", component: () => import("./Window/WindowSetting/AccountSetting.vue") }],
  },
  {
    path: "/WindowUserInfo",
    component: () => import("./Window/WindowUserInfo.vue"),
  },
];
//导出路由对象
export let router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes,
});
