import React from "react";
import { Handle, Position } from "reactflow";
import type { NodeProps } from "reactflow";
import type { CustomNodeData } from "../types";

const CustomNode: React.FC<NodeProps<CustomNodeData>> = ({ data }) => {
  const { label, type, value, isHighlighted, itemCount } = data;

  const getNodeStyle = (): string => {
    const base = "rounded-xl shadow-lg transition-all duration-200 border-2 relative";
    let colors = "";
    
    if (type === "root") {
      colors = "bg-gray-50 border-gray-400 dark:bg-gray-800/90 dark:border-gray-500";
    } else if (type === "objectKey") {
      colors = "bg-blue-50 border-blue-400 dark:bg-blue-900/80 dark:border-blue-400";
    } else if (type === "arrayKey") {
      colors = "bg-purple-50 border-purple-400 dark:bg-purple-900/80 dark:border-purple-400";
    } else {
      colors = "bg-white border-gray-300 dark:bg-gray-800/90 dark:border-gray-500";
    }
    
    const highlight = isHighlighted 
      ? "ring-4 ring-yellow-400 ring-offset-2 scale-110 shadow-2xl" 
      : "hover:shadow-2xl hover:scale-105";
    
    return `${base} ${colors} ${highlight}`;
  };

  const getKeyColor = () => {
    if (type === "objectKey") return "text-blue-600 dark:text-blue-300";
    if (type === "arrayKey") return "text-purple-600 dark:text-purple-300";
    return "text-gray-600 dark:text-gray-400";
  };

  if (type === "root") {
    return (
      <div className={getNodeStyle()}>
        <Handle type="source" position={Position.Right} className="!bg-gray-500 !w-3 !h-3" />
        <div className="px-5 py-3">
          <div className="font-bold text-lg text-gray-900 dark:text-gray-100">{"{ }"}</div>
        </div>
      </div>
    );
  }

  if (type === "objectKey" || type === "arrayKey") {
    return (
      <div className={getNodeStyle()}>
        <Handle type="target" position={Position.Left} className="!bg-blue-500 !w-3 !h-3" />
        <Handle type="source" position={Position.Right} className="!bg-blue-500 !w-3 !h-3" />
        <div className="px-4 py-3">
          <div className="flex items-center gap-2">
            <span className={`font-bold text-base ${getKeyColor()}`}>{label}</span>
            {itemCount !== undefined && (
              <span className="text-xs px-2.5 py-1 rounded-full font-bold bg-white/80 text-gray-700 shadow-sm dark:bg-gray-700/80 dark:text-gray-200">
                {type === "arrayKey" ? `[${itemCount}]` : `{${itemCount}}`}
              </span>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={getNodeStyle()}>
      <Handle type="target" position={Position.Left} className="!bg-emerald-500 !w-3 !h-3" />
      <div className="px-4 py-2.5 min-w-[140px]">
        <div className="space-y-1">
          <div className="font-semibold text-sm text-blue-600 dark:text-blue-300">{label}:</div>
          <div className="text-sm font-mono text-emerald-600 dark:text-emerald-300 pl-2">
            {typeof value === "string" ? `"${value}"` : String(value)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomNode;