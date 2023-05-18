<template>
  <center>
    <BaseNode v-for="item in list" :key="item" :message="item.toString()"> </BaseNode>
  </center>
  <button
    @click="
      () => {
        list[2]++
      }
    "
  ></button>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import BaseNode from '../Node/BaseNode.vue'

const list = ref(new Array(10).fill(1))
</script>
