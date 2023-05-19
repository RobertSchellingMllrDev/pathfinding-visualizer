import NodeType from '../enums/NodeType'

interface NodeProps {
  cords: Array<number>
  isMouseDown: boolean
  isMouseOver: boolean
  nodeType: NodeType
}

export type { NodeProps }
