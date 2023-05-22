<template>
  <div
    v-click-outside="clickOutside"
    :class="'drop-down' + (isActive ? '--active' : '--inActive')"
    @click="toggle()"
    class="drop-down-button"
  >
    <slot name="toggler">
      <button>Toggler</button>
    </slot>
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const isActive = ref(true)
const vClickOutside = {
  beforeMount: (el: any, binding: any) => {
    el.clickOutsideEvent = (event: Event) => {
      // here I check that click was outside the el and his children
      if (!(el == event.target || el.contains(event.target))) {
        // and if it did, call method provided in attribute value
        binding.value()
      }
    }
    document.addEventListener('click', el.clickOutsideEvent)
  },
  unmounted: (el: any) => {
    document.removeEventListener('click', el.clickOutsideEvent)
  }
}
function toggle() {
  isActive.value = !isActive.value
}

function clickOutside() {
  console.log('CLICK OUTSIDE')
  isActive.value = false
}
</script>
<style lang="scss">
//@import './styles.scss';
</style>
