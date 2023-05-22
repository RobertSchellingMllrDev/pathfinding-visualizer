<template>
  <div class="menu">
    <BaseDropdown
      ><template #toggler><Button>ONE</Button></template>
      <ul>
        <li>SAMPLE</li>
      </ul></BaseDropdown
    >
    <BaseDropdown
      ><template #toggler><Button>TWO</Button></template>
      <ul>
        <li>SAMPLE</li>
      </ul></BaseDropdown
    >
    <BaseDropdown
      ><template #toggler><Button>THREE</Button></template>
      <ul>
        <li>SAMPLE</li>
      </ul></BaseDropdown
    >
  </div>
</template>

<script lang="ts" setup>
import BaseDropdown from './Dropdown/BaseDropdown.vue'
</script>

<style lang="scss">
@import './styles.scss';
</style>
