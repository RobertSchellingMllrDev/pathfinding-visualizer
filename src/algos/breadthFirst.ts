import type { INode } from '../core/interfaces/INode'
import Queue from '../core/types/Queue'

export function* breadthFirst({
  startNode,
  graph
}: {
  startNode: INode
  graph: Array<Array<INode>>
}) {
  const frontier: Queue<INode> = new Queue()
  frontier.put(startNode)
  const cameFrom: { [key: string]: INode } = {}
  while (frontier.queue.length > 0) {
    const current = frontier.pop()
  }
  yield []
}

function checkNeighbors() {}
