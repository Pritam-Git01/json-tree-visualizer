import type { Node, Edge, ReactFlowInstance } from "reactflow";

export type NodeType = "root" | "objectKey" | "arrayKey" | "property";

export interface CustomNodeData {
  label: string;
  type: NodeType;
  path: string;
  value?: string | number | boolean | null;
  isHighlighted?: boolean;
  itemCount?: number;
}

export interface CustomNode extends Node {
  data: CustomNodeData;
}

export type CustomEdge = Edge & { animated: boolean };

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
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
  reactFlowInstance: ReactFlowInstance | null;
  setReactFlowInstance: (instance: ReactFlowInstance | null) => void;
  clearAll: () => void;
}