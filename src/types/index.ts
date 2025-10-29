import type { Node, Edge, OnNodesChange, OnEdgesChange } from "reactflow";

export type NodeType = "root" | "objectKey" | "arrayKey" | "property";

export interface CustomNodeData {
  label: string;
  type: NodeType;
  path: string;
  value?: string | number | boolean | null;
  isHighlighted?: boolean;
  itemCount?: number;
}


export type CustomNode = Node<CustomNodeData>;


export type CustomEdge = Edge & { animated?: boolean };

export interface TreeStructure {
  nodes: CustomNode[];
  edges: CustomEdge[];
}

export interface TreeContextType {
  jsonInput: string;
  setJsonInput: (input: string) => void;
  nodes: CustomNode[];
  setNodes: React.Dispatch<React.SetStateAction<CustomNode[]>>;
  edges: CustomEdge[];
  setEdges: React.Dispatch<React.SetStateAction<CustomEdge[]>>;
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
  reactFlowInstance: any;
  setReactFlowInstance: (instance: any) => void;
  clearAll: () => void;
}
