<script setup lang="ts">
import { ModelChat } from "../../../../model/ModelChat";
import { useChatStore } from "../../../store/useChatStore";
defineProps<{ data: ModelChat }>();
let store = useChatStore();
let itemClick = (item: ModelChat) => {
  //选中当前会话
  store.selectItem(item);
};
</script>
<template>
    <div @click="itemClick(data)" :class="['chatItem', { chatItemSelected: data.isSelected }]">
      <div class="avatar">
        <img :src="data.avatar" alt="" />
      </div>
      <div class="chatInfo">
        <div class="row">
          <div class="fromName">{{ data.fromName }}</div>
          <div class="timeName">{{ data.sendTime }}</div>
        </div>
        <div class="row">
          <div class="lastMsg">{{ data.lastMsg }}</div>
          <div class="subscribe"></div>
        </div>
      </div>
    </div>
  </template>
  