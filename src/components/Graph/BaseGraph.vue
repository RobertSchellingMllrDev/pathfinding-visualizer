<template>
  <center>
    <button @click="breadthFirstHandler()">START ALGO</button>
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
import { breadthFirst } from '@/algos/breadthFirst'
import type { INode } from '@/core/interfaces/INode'

const selectedSquare = ref<Array<number>>([])
const startCords = ref([5, 3])
const goalCords = ref([6, 7])
const currentEdit = ref(EditOptions.Wall)
const isMouseDown = ref(false)
const nodes = ref(initNodes({ height: 30, width: 50 }))

function breadthFirstHandler() {
  var startNode: INode | undefined = {
    cords: nodes.value[startCords.value[0]][startCords.value[1]].cords,
    isGoal: nodes.value[startCords.value[0]][startCords.value[1]].nodeType === NodeType.Goal,
    isVisited: false,
    isWall: nodes.value[startCords.value[0]][startCords.value[1]].nodeType === NodeType.Wall
  }
  var graph: Array<Array<INode>> = []
  nodes.value.forEach((row, index) => {
    graph[index] = []
    row.forEach((item, index2) => {
      graph[index][index2] = {
        cords: item.cords,
        isGoal: item.nodeType === NodeType.Goal,
        isWall: item.nodeType === NodeType.Wall,
        isVisited: item.nodeType === NodeType.Visited
      }
    })
  })
  var generator = breadthFirst({ startNode: startNode, graph: graph })
  breadthFirstLoop(generator)
}

function breadthFirstLoop(g: Generator) {
  setTimeout(() => {
    var value = g.next().value
    if (typeof value === 'boolean') {
      var result = g.next().value
      console.log(result)
      setBreadthFirstPath(result.cameFrom, result.goalNode)
    } else {
      setVisitedNodes(value ? value : [])
      breadthFirstLoop(g)
    }
  }, 10)
}
function setBreadthFirstPath(
  cameFrom: { [key: string]: INode | undefined },
  node: INode | undefined
) {
  setTimeout(() => {
    if (node?.cords.toString() === startCords.value.toString()) {
      console.log('FINISHED')
    } else if (node != undefined) {
      const current = cameFrom[node.cords.toString()]
      if (current != undefined) {
        if (
          nodes.value[current.cords[0]][current.cords[1]].nodeType != NodeType.Goal &&
          nodes.value[current.cords[0]][current.cords[1]].nodeType != NodeType.Start
        ) {
          nodes.value[current.cords[0]][current.cords[1]].nodeType = NodeType.Path
        }
        setBreadthFirstPath(cameFrom, current)
      }
    }
  }, 50)
}
function setVisitedNodes(frontier: INode[]) {
  frontier.forEach((item) => {
    if (
      nodes.value[item.cords[0]][item.cords[1]].nodeType != NodeType.Goal &&
      nodes.value[item.cords[0]][item.cords[1]].nodeType != NodeType.Start
    ) {
      nodes.value[item.cords[0]][item.cords[1]].nodeType = NodeType.Visited
    }
  })
}
function mouseDownHandler() {
  isMouseDown.value = true
  nodes.value[selectedSquare.value[0]][selectedSquare.value[1]] = recalculateNodes(
    nodes.value[selectedSquare.value[0]][selectedSquare.value[1]]
  )
  // nodes.value.forEach((row) => {
  //   row.forEach((node) => {
  //     node = recalculateNodes(node)
  //   })
  // })
}
function mouseLeaveHandler() {
  isMouseDown.value = false
}
function mouseUpHandler() {
  isMouseDown.value = false
}
function mouseEnterHandler(cords: any) {
  // nodes.value[selectedSquare.value[0]][selectedSquare.value[1]] = recalculateNodes(
  //   nodes.value[selectedSquare.value[0]][selectedSquare.value[1]]
  // )
  var prevCords = selectedSquare.value
  selectedSquare.value = cords
  nodes.value[cords[0]][cords[1]] = recalculateNodes(nodes.value[cords[0]][cords[1]])
  nodes.value[prevCords[0]][prevCords[1]] = recalculateNodes(
    nodes.value[prevCords[0]][prevCords[1]]
  )
  // console.log('PREVIOUS ' + prevCords.toString())
  // console.log('CURRENT' + cords.toString())
  // nodes.value.forEach((row) => {
  //   row.forEach((node) => {
  //     node = recalculateNodes(node)
  //   })
  // })
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
            : NodeType.Empty
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
      : node.nodeType === NodeType.Visited
      ? NodeType.Visited
      : node.nodeType === NodeType.Path
      ? NodeType.Path
      : NodeType.Empty
  return node
}
</script>
