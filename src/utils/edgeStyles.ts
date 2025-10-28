import type { NodeType } from "../types";

export const getEdgeStyle = (sourceType: NodeType, targetType: NodeType) => {
  const isDark = document.documentElement.classList.contains("dark");
  let color = isDark ? "#9CA3AF" : "#6B7280";
  
  if (sourceType === "arrayKey" || targetType === "arrayKey") {
    color = isDark ? "#A78BFA" : "#A855F7";
  } else if (sourceType === "objectKey" || targetType === "objectKey") {
    color = isDark ? "#60A5FA" : "#3B82F6";
  }
  
  return { stroke: color, strokeWidth: 2.5 };
};