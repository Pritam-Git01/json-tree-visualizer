import React from "react";
import { Toaster } from "react-hot-toast";
import { TreeProvider } from "./context/TreeContext";
import Header from "./components/Header";
import JSONInput from "./components/JSONInput";
import TreeVisualization from "./components/TreeVisualization";
import "reactflow/dist/style.css";

const JSONTreeVisualizer: React.FC = () => {
  return (
    <TreeProvider>
      <div className="h-screen flex flex-col bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:bg-gray-900">
        <Toaster />
        <Header />
        <div className="flex-1 flex flex-col lg:flex-row gap-4 p-2 overflow-hidden dark:bg-gray-800/95">
          <JSONInput />
          <TreeVisualization />
        </div>
      </div>
    </TreeProvider>
  );
};

export default JSONTreeVisualizer;