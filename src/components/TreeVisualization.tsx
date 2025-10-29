import React, { useCallback } from "react";
import ReactFlow, { Background, Controls, MiniMap } from "reactflow";
import type { Node } from "reactflow";
import toast from "react-hot-toast";
import { useTreeContext } from "../context/TreeContext";
import CustomNode from "./CustomNode";
import type { CustomNodeData } from "../types";

const nodeTypes = { custom: CustomNode };

const TreeVisualization: React.FC = () => {
  const { nodes, edges, onNodesChange, onEdgesChange, setReactFlowInstance } = useTreeContext();

  const onNodeClick = useCallback((_: React.MouseEvent, node: Node<CustomNodeData>) => {
    navigator.clipboard.writeText(node.data.path);
    toast.success(`Copied: ${node.data.path}`);
  }, []);

  return (
    <div className="flex-1">
      <div className="h-full rounded-2xl shadow-2xl overflow-hidden bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={onNodeClick}
          onInit={setReactFlowInstance}
          nodeTypes={nodeTypes}
          nodesDraggable={true}
          nodesConnectable={false}
          elementsSelectable={true}
          fitView
          minZoom={0.1}
          maxZoom={2}
        >
          <Background color="#E5E7EB" className="dark:!bg-gray-700" gap={20} size={1.5} />
          <Controls className="bg-white dark:bg-gray-700 border-2 border-blue-500 shadow-lg rounded-md" />
          <MiniMap
            nodeColor={(node: Node<CustomNodeData>) => {
              const isDark = document.documentElement.classList.contains("dark");
              if (node.data.type === "root") return isDark ? "#6B7280" : "#9CA3AF";
              if (node.data.type === "objectKey") return isDark ? "#3B82F6" : "#60A5FA";
              if (node.data.type === "arrayKey") return isDark ? "#A855F7" : "#C084FC";
              return isDark ? "#4B5563" : "#D1D5DB";
            }}
            className="!rounded-xl !shadow-xl !bg-gray-100 dark:!bg-gray-700 !border-2"
          />
        </ReactFlow>
      </div>
    </div>
  );
};

export default TreeVisualization;
