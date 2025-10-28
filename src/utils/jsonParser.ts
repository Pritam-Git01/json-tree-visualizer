import { MarkerType } from "reactflow";
import type { CustomNode, CustomEdge, TreeStructure, NodeType } from "../types";
import { getEdgeStyle } from "./edgeStyles";

export const jsonPathToTree = (obj: unknown, path: string = "$"): TreeStructure => {
  const nodes: CustomNode[] = [];
  const edges: CustomEdge[] = [];
  let nodeId = 0;

  const traverse = (
    value: unknown,
    currentPath: string,
    parentId: string | null,
    parentType: NodeType = "root",
    key?: string,
    isArrayItem: boolean = false
  ): string => {
    const id = `node-${nodeId++}`;

    if (value === null || typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
      nodes.push({
        id,
        type: "custom",
        data: { label: key || "value", type: "property", path: currentPath, value },
        position: { x: 0, y: 0 },
      });

      if (parentId) {
        const style = getEdgeStyle(parentType, "property");
        edges.push({
          id: `${parentId}-${id}`,
          source: parentId,
          target: id,
          type: "smoothstep",
          animated: false,
          style,
          markerEnd: { type: MarkerType.ArrowClosed, color: style.stroke, width: 20, height: 20 },
        });
      }
    } else if (Array.isArray(value)) {
      nodes.push({
        id,
        type: "custom",
        data: { label: key || "array", type: "arrayKey", path: currentPath, itemCount: value.length },
        position: { x: 0, y: 0 },
      });

      if (parentId) {
        const style = getEdgeStyle(parentType, "arrayKey");
        edges.push({
          id: `${parentId}-${id}`,
          source: parentId,
          target: id,
          type: "smoothstep",
          animated: false,
          style,
          markerEnd: { type: MarkerType.ArrowClosed, color: style.stroke, width: 20, height: 20 },
        });
      }

      value.forEach((item, index) => {
        traverse(item, `${currentPath}[${index}]`, id, "arrayKey", `[${index}]`, true);
      });
    } else if (typeof value === "object" && value !== null) {
      const keys = Object.keys(value);
      const currentNodeType: NodeType = parentId === null ? "root" : isArrayItem ? "arrayKey" : "objectKey";

      nodes.push({
        id,
        type: "custom",
        data: { 
          label: parentId === null ? "" : key || "object", 
          type: currentNodeType, 
          path: currentPath, 
          itemCount: parentId === null ? undefined : keys.length 
        },
        position: { x: 0, y: 0 },
      });

      if (parentId) {
        const style = getEdgeStyle(parentType, currentNodeType);
        edges.push({
          id: `${parentId}-${id}`,
          source: parentId,
          target: id,
          type: "smoothstep",
          animated: false,
          style,
          markerEnd: { type: MarkerType.ArrowClosed, color: style.stroke, width: 20, height: 20 },
        });
      }

      keys.forEach((k) => traverse((value as Record<string, unknown>)[k], `${currentPath}.${k}`, id, currentNodeType, k, false));
    }

    return id;
  };

  traverse(obj, path, null, "root");
  return { nodes, edges };
};