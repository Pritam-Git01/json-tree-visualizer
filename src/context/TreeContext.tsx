import React, { createContext, useContext, useEffect } from "react";
import { useNodesState, useEdgesState } from "reactflow";
import { type TreeContextType, type CustomNodeData, type CustomEdge } from "../types";
import { SAMPLE_JSON } from "../constants";

const TreeContext = createContext<TreeContextType | undefined>(undefined);

export const useTreeContext = () => {
  const context = useContext(TreeContext);
  if (!context) throw new Error("useTreeContext must be used within TreeProvider");
  return context;
};

export const TreeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [jsonInput, setJsonInput] = React.useState(SAMPLE_JSON);
  
  const [nodes, setNodes, onNodesChange] = useNodesState<CustomNodeData>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<CustomEdge[]>([]);
  
  const [searchQuery, setSearchQuery] = React.useState("");
  const [darkMode, setDarkMode] = React.useState(false);
  const [reactFlowInstance, setReactFlowInstanceState] = React.useState<any>(null);

 useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

  }, [darkMode]);

  // Exposed a toggle function that ensures reactivity
  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  const value: TreeContextType = {
    jsonInput,
    setJsonInput,
    nodes,
    setNodes,
    edges,
    setEdges,
    onNodesChange,
    onEdgesChange,
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
