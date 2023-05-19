<template>
  <button :class="getClass()" @mouseenter="$emit('selectedSquare', props.cords)"></button>
</template>

<script lang="ts" setup>
import Colors from '@/core/enums/Colors'
import NodeType from '@/core/enums/NodeType'
import type { NodeProps } from '@/core/interfaces/NodeProps'
import { changeAnim } from '@/service/AnimService'
import { changeColor } from '@/service/ColorService'
import { onRenderTriggered } from 'vue'
import { ref } from 'vue'

const props = defineProps<NodeProps>()

const color = ref(Colors.White)

function getClass() {
  var colorClass = getColorClass()
  var animClass = getAnimClass()
  return 'square' + animClass + colorClass
}

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
    case NodeType.Visited:
      color.value = Colors.Green
      break
    case NodeType.Path:
      color.value = Colors.Yellow
      break
    case NodeType.Empty:
      color.value = Colors.White
      break
  }
  return changeColor(color.value)
}

function getAnimClass() {
  return changeAnim(color.value)
}
onRenderTriggered(() => {
  console.log('RENDER NODE')
})
</script>

<style lang="scss">
@import './styles.scss';
</style>
