<template>
  <center>
    <div
      v-for="row in nodes"
      :key="row.toString()"
      @mousedown="() => mouseDownHandler()"
      @mouseup="() => mouseUpHandler()"
      @mouseleave="() => mouseLeaveHandler"
    >
      <BaseNode
        @selectedSquare="(p) => mouseEnterHandler(p)"
        v-for="item in row"
        :key="item.cords.toString()"
        :is-mouse-down="item.isMouseDown"
        :cords="item.cords"
        :is-mouse-over="item.isMouseOver"
        :node-type="item.nodeType"
        :on-mouse-down-handler="undefined"
        :on-mouse-enter-handler="undefined"
        :on-mouse-leave-handler="undefined"
      >
      </BaseNode>
    </div>
  </center>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import BaseNode from '../Node/BaseNode.vue'
import NodeType from '@/core/enums/NodeType'
import type { NodeProps } from '@/core/interfaces/NodeProps'
import EditOptions from '@/core/enums/EditOptions'

const selectedSquare = ref<Array<number>>([])
const startCords = ref([5, 3])
const goalCords = ref([6, 7])
const currentEdit = ref(EditOptions.Wall)
const isMouseDown = ref(false)
const key = 0
const nodes = ref(initNodes({ height: 30, width: 50 }))
const trackSelectedSquare = (id: Array<number>) => {
  selectedSquare.value = id
}

function mouseDownHandler() {
  isMouseDown.value = true
}
function mouseLeaveHandler() {
  isMouseDown.value = false
}
function mouseUpHandler() {
  isMouseDown.value = false
}
function mouseEnterHandler(cords: any) {
  selectedSquare.value = cords
  nodes.value.forEach((row) => {
    row.forEach((node) => {
      node = recalculateNodes(node)
    })
  })
}
function initNodes({ height, width }: { width: number; height: number }) {
  var list: Array<Array<NodeProps>> = []
  for (var i: number = 0; i < height; i++) {
    list[i] = []
    for (var j: number = 0; j < width; j++) {
      list[i][j] = {
        cords: [i, j],
        isMouseDown: false,
        isMouseOver: false,
        nodeType:
          [i, j].toString() === startCords.value.toString()
            ? NodeType.Start
            : [i, j].toString() === goalCords.value.toString()
            ? NodeType.Goal
            : NodeType.Empty,
        onMouseDownHandler: undefined,
        onMouseEnterHandler: undefined,
        onMouseLeaveHandler: undefined
      }
    }
  }
  return list
}

function recalculateNodes(node: NodeProps) {
  node.isMouseOver = selectedSquare.value.toString() === node.cords.toString()
  node.isMouseDown = isMouseDown.value
  if (node.isMouseDown && node.isMouseOver) {
    if (selectedSquare.value.toString() === startCords.value.toString()) {
      currentEdit.value = EditOptions.Start
    }
    if (selectedSquare.value.toString() === goalCords.value.toString()) {
      currentEdit.value = EditOptions.Goal
    }
    switch (currentEdit.value) {
      case EditOptions.Wall:
        node.nodeType = node.nodeType === NodeType.Wall ? NodeType.Empty : NodeType.Wall
        break
      case EditOptions.Start:
        startCords.value = selectedSquare.value
        // node.nodeType =
        //   startCords.current.toString() === node.cords.toString()
        //     ? NodeType.Start
        //     : node.nodeType;
        break
      case EditOptions.Goal:
        goalCords.value = selectedSquare.value
        // node.nodeType =
        //   goalCords.current.toString() === node.cords.toString()
        //     ? NodeType.Goal
        //     : node.nodeType;
        break
      default:
        node.nodeType = NodeType.Empty
        break
    }
  }
  if (!isMouseDown.value) {
    currentEdit.value = EditOptions.Wall
  }

  node.nodeType =
    startCords.value.toString() === node.cords.toString()
      ? NodeType.Start
      : goalCords.value.toString() === node.cords.toString()
      ? NodeType.Goal
      : node.nodeType === NodeType.Wall
      ? NodeType.Wall
      : NodeType.Empty
  return node
}
</script>
