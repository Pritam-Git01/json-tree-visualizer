import React, { useCallback } from "react";
import { Play, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { useTreeContext } from "../context/TreeContext";
import { jsonPathToTree } from "../utils/jsonParser";
import { getLayoutedElements } from "../utils/layoutEngine";

const JSONInput: React.FC = () => {
  const { 
    jsonInput, 
    setJsonInput, 
    setNodes, 
    setEdges, 
    clearAll, 
    reactFlowInstance 
  } = useTreeContext();

  const handleVisualize = useCallback(() => {
    try {
      const parsed = JSON.parse(jsonInput);
      const { nodes: newNodes, edges: newEdges } = jsonPathToTree(parsed, "$");
      const layoutedNodes = getLayoutedElements(newNodes, newEdges);
      
      setNodes(layoutedNodes);
      setEdges(newEdges);
      toast.success("Tree generated!");
      
      setTimeout(() => {
        if (reactFlowInstance) {
          reactFlowInstance.fitView({ padding: 0.2, duration: 800 });
        }
      }, 100);
    } catch (err) {
      toast.error(`Invalid JSON: ${err instanceof Error ? err.message : "Unknown error"}`);
    }
  }, [jsonInput, setNodes, setEdges, reactFlowInstance]);

  return (
    <div className="lg:w-96 h-full flex flex-col gap-4">
      <div className="bg-white/95 dark:bg-gray-800/95 rounded-2xl shadow-xl p-5 flex flex-col gap-4 h-full border border-gray-200 dark:border-gray-700">
        <h2 className="font-bold text-lg flex items-center gap-2 text-gray-900 dark:text-white">
          <span>📝</span>JSON Input
        </h2>
        <textarea
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          className="w-full h-full p-4 rounded-xl font-mono text-sm bg-gray-50 dark:bg-gray-900/80 text-gray-900 dark:text-gray-100 border-2 border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
          placeholder="Paste your JSON here..."
          spellCheck={false}
        />
        <div className="flex gap-3">
          <button 
            onClick={handleVisualize} 
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
          >
            <Play size={18} />
            Visualize
          </button>
          <button 
            onClick={clearAll} 
            className="px-4 py-3 rounded-xl font-semibold bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600" 
            aria-label="Clear"
          >
            <Trash2 size={18} className="dark:text-white"/>
          </button>
        </div>
      </div>
    </div>
  );
};

export default JSONInput;