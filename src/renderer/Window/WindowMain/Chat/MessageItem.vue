<script setup lang="ts">
//src\renderer\Window\WindowMain\Chat\MessageItem.vue
import { ModelMessage } from "../../../../model/ModelMessage";
defineProps<{ data: ModelMessage }>();
</script>
<template>
  <template v-if="data.isInMsg">
    <div class="messageItem left">
      <div class="avatar">
        <img :src="data.avatar" alt="" />
      </div>
      <div class="msgBox">
        <div class="fromName">{{ data.fromName }}</div>
        <div class="msgContent">{{ data.messageContent }}</div>
      </div>
    </div>
  </template>
  <template v-else>
    <div class="messageItem right">
      <div class="msgBox">
        <div class="msgContent">{{ data.messageContent }}</div>
      </div>
      <div class="avatar">
        <img :src="data.avatar" alt="" />
      </div>
    </div>
  </template>
</template>
