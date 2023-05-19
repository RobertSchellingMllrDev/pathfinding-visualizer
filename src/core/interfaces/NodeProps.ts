import NodeType from '../enums/NodeType'

interface NodeProps {
  cords: Array<number>
  isMouseDown: boolean
  isMouseOver: boolean
  nodeType: NodeType
  onMouseDownHandler: any
  onMouseEnterHandler: any
  onMouseLeaveHandler: any
}

export type { NodeProps }
