<script setup lang="ts">
// src\renderer\Window\WindowMain\Chat\ChatBoard.vue
import { onMounted } from "vue";
import { useChatStore } from "../../../store/useChatStore";
import ChatItem from "./ChatItem.vue";
import ChatSearch from "./ChatSearch.vue";
let store = useChatStore();
onMounted(() => {
  //选中第七个会话
  store.selectItem(store.data[6]);
});
</script>
<template>
  <div class="ChatList">
    <ChatSearch />
    <div class="ListBox">
      <ChatItem :data="item" v-for="item in store.data" :key="item.id" />
    </div>
  </div>
</template>
