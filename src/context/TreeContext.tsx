import React, { createContext, useContext, useState, useEffect } from "react";
import type { TreeContextType, CustomNode, CustomEdge } from "../types";
import { SAMPLE_JSON } from "../constants";
import type { ReactFlowInstance } from "reactflow";

const TreeContext = createContext<TreeContextType | undefined>(undefined);

export const useTreeContext = () => {
  const context = useContext(TreeContext);
  if (!context) throw new Error("useTreeContext must be used within TreeProvider");
  return context;
};

export const TreeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [jsonInput, setJsonInput] = useState(SAMPLE_JSON);
  const [nodes, setNodes] = useState<CustomNode[]>([]);
  const [edges, setEdges] = useState<CustomEdge[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [darkMode, setDarkMode] = useState(
    () => window.matchMedia?.("(prefers-color-scheme: dark)").matches || false
  );
  const [reactFlowInstance, setReactFlowInstanceState] = useState<ReactFlowInstance | null>(null);

  // ✅ Keep document <html> class synced with darkMode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

  }, [darkMode]);

  // ✅ Expose a toggle function that ensures reactivity
  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  const value: TreeContextType = {
    jsonInput,
    setJsonInput,
    nodes,
    setNodes,
    edges,
    setEdges,
    searchQuery,
    setSearchQuery,
    darkMode,
    toggleDarkMode,
    reactFlowInstance,
    setReactFlowInstance: setReactFlowInstanceState,
    clearAll: () => {
      setJsonInput("");
      setNodes([]);
      setEdges([]);
      setSearchQuery("");
    },
  };

  return <TreeContext.Provider value={value}>{children}</TreeContext.Provider>;
};
