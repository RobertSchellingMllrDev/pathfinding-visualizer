<template>
  <button
    :class="'square' + getColorClass()"
    @mouseenter="$emit('selectedSquare', props.cords)"
  ></button>
</template>

<script lang="ts" setup>
import Colors from '@/core/enums/Colors'
import NodeType from '@/core/enums/NodeType'
import type { NodeProps } from '@/core/interfaces/NodeProps'
import { changeColor } from '@/service/ColorService'
import { onMounted, ref } from 'vue'

const props = defineProps<NodeProps>()

const color = ref(Colors.White)

function getColorClass() {
  switch (props.nodeType) {
    case NodeType.Goal:
      color.value = Colors.Red
      break
    case NodeType.Start:
      color.value = Colors.Blue
      break
    case NodeType.Wall:
      color.value = Colors.Black
      break
    case NodeType.Empty:
      color.value = Colors.White
      break
  }
  return changeColor(color.value)
}

onMounted(() => {
  console.log('RENDER NODE')
})
</script>

<style lang="scss">
@import './styles.scss';
</style>
