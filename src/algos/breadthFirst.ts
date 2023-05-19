import type { INode } from '../core/interfaces/INode'
import Queue from '../core/types/Queue'

export function* breadthFirst({
  startNode,
  graph
}: {
  startNode: INode
  graph: Array<Array<INode>>
}) {
  const frontier = new Queue<INode>()
  var goalNode = undefined
  frontier.put(startNode)
  var cameFrom: { [key: string]: INode | undefined } = {}
  while (frontier.queue.length > 0) {
    const current = frontier.pop()
    var prevLength = frontier.queue.length
    if (current != undefined) {
      current.isVisited = true
      if (current.isGoal) {
        goalNode = current
        break
      }
    }
    for (var next of checkNeighbors(graph, current)) {
      if (!cameFrom[next.cords.toString()] && !next.isWall) {
        frontier.put(next)
        cameFrom[next.cords.toString()] = current
      }
    }
    if (prevLength < frontier.queue.length) {
      yield frontier.queue
    }
  }
  yield true
  yield { cameFrom: cameFrom, goalNode: goalNode }
}

function checkNeighbors(graph: Array<Array<INode>>, node: INode | undefined): Array<INode> {
  if (node != undefined) {
    var list = []
    //top
    typeof graph[node.cords[0]][node.cords[1] - 1] === 'undefined'
      ? null
      : list.push(graph[node.cords[0]][node.cords[1] - 1])
    //left
    typeof graph[node.cords[0] - 1] != 'undefined'
      ? typeof graph[node.cords[0] - 1][node.cords[1]] === 'undefined'
        ? null
        : list.push(graph[node.cords[0] - 1][node.cords[1]])
      : null
    //bottom
    typeof graph[node.cords[0]][node.cords[1] + 1] === 'undefined'
      ? null
      : list.push(graph[node.cords[0]][node.cords[1] + 1])
    //right
    typeof graph[node.cords[0] + 1] != 'undefined'
      ? typeof graph[node.cords[0] + 1][node.cords[1]] === 'undefined'
        ? null
        : list.push(graph[node.cords[0] + 1][node.cords[1]])
      : null
    return list
  }
  return []
}
