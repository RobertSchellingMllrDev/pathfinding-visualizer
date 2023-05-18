<template>
  <button class="square">{{ message }}</button>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import { onBeforeUpdate } from 'vue'

defineProps({ message: String })

onMounted(() => {
  console.log('RENDER NODE')
})
</script>

<style>
@import './styles.scss';
</style>
