<template>
  <div class="BarLeft">
    <div class="userIcon">
      <img src="../assets/avatar.jpg" alt="" />
    </div>
    <div class="menu">
      <router-link
        v-for="item in mainWindowRoutes"
        :to="item.path"
        :class="[`menuItem`, { selected: item.isSelected }]"
      >
        <i
          :class="[`icon`, item.isSelected ? item.iconSelected : item.icon]"
        ></i>
      </router-link>
    </div>
    <div class="setting">
      <div class="menuItem">
        <i class="icon icon-setting"></i>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
//菜单列表数组
let mainWindowRoutes = ref([
  {
    path: `/WindowMain/Chat`,
    isSelected: true,
    icon: `icon-chat`,
    iconSelected: `icon-chat`,
  },
  {
    path: `/WindowMain/Contact`,
    isSelected: false,
    icon: `icon-tongxunlu1`,
    iconSelected: `icon-tongxunlu`,
  },
  {
    path: `/WindowMain/Collection`,
    isSelected: false,
    icon: `icon-shoucang1`,
    iconSelected: `icon-shoucang`,
  },
]);
let route = useRoute();
//注册路由变化监听器
watch(
  () => route,
  () =>
    mainWindowRoutes.value.forEach(
      (v) => (v.isSelected = v.path === route.fullPath)
    ),
  {
    immediate: true,
    deep: true,
  }
);
let openSettingWindow = async () => {
  let config = {
    modal: true,
    width: 800,
    webPreferences: { webviewTag: false },
  };
  let dialog = await createDialog(`/WindowSetting/AccountSetting`, config);
  window.addEventListener("message", (e) => {
    console.log(e.data);
  });
  let msg = { msgName: "hello", value: "msg from your parent" };
  dialog.postMessage(msg);
  // window.open(`/WindowSetting/AccountSetting`, "_blank", JSON.stringify(config));
};
</script>
