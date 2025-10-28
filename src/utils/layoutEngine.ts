import type { CustomNode, CustomEdge } from "../types";
import { HORIZONTAL_SPACING, VERTICAL_SPACING } from "../constants";

export const getLayoutedElements = (nodes: CustomNode[], edges: CustomEdge[]): CustomNode[] => {
  const childrenMap = new Map<string, string[]>();
  edges.forEach((edge) => {
    const children = childrenMap.get(edge.source) || [];
    children.push(edge.target);
    childrenMap.set(edge.source, children);
  });

  const positioned = new Set<string>();
  const nodePositions = new Map<string, { x: number; y: number }>();

  const layoutNode = (nodeId: string, x: number, startY: number): number => {
    if (positioned.has(nodeId)) return startY;
    positioned.add(nodeId);
    const children = childrenMap.get(nodeId) || [];

    if (children.length === 0) {
      nodePositions.set(nodeId, { x, y: startY });
      return startY + VERTICAL_SPACING;
    }

    let currentY = startY;
    const childYPositions: number[] = [];

    children.forEach((childId) => {
      const childStartY = currentY;
      currentY = layoutNode(childId, x + HORIZONTAL_SPACING, childStartY);
      const childPos = nodePositions.get(childId);
      if (childPos) childYPositions.push(childPos.y);
    });

    const avgY = childYPositions.reduce((a, b) => a + b, 0) / childYPositions.length;
    nodePositions.set(nodeId, { x, y: avgY });
    return currentY;
  };

  if (nodes.length > 0) layoutNode(nodes[0].id, 0, 0);
  return nodes.map((node) => ({ ...node, position: nodePositions.get(node.id) || { x: 0, y: 0 } }));
};