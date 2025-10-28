import React, { useCallback } from "react";
import { Search, Moon, Sun, Download } from "lucide-react";
import { toPng } from "html-to-image";
import toast from "react-hot-toast";
import { useTreeContext } from "../context/TreeContext";

const Header: React.FC = () => {
  const { 
    searchQuery, 
    setSearchQuery, 
    darkMode, 
    toggleDarkMode, 
    nodes, 
    setNodes, 
    reactFlowInstance 
  } = useTreeContext();

  const handleSearch = useCallback(() => {
    if (!searchQuery.trim()) {
      toast.error("Please enter a search path");
      return;
    }

    const matchingNode = nodes.find((n) =>
      n.data.path.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.data.label.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (matchingNode) {
      setNodes(nodes.map((n) => ({ 
        ...n, 
        data: { ...n.data, isHighlighted: n.id === matchingNode.id } 
      })));
      
      if (reactFlowInstance) {
        reactFlowInstance.setCenter(
          matchingNode.position.x, 
          matchingNode.position.y, 
          { zoom: 1.5, duration: 800 }
        );
      }
      toast.success("Match found!");
    } else {
      toast.error("No match found");
    }
  }, [searchQuery, nodes, setNodes, reactFlowInstance]);

  const handleDownload = useCallback(() => {
    if (reactFlowInstance) {
      const viewport = reactFlowInstance.getViewport();
      reactFlowInstance.fitView({ padding: 0.2 });

      setTimeout(() => {
        const canvas = document.querySelector(".react-flow__renderer") as HTMLElement;
        if (canvas) {
          toPng(canvas, { 
            backgroundColor: darkMode ? "#1F2937" : "#FFFFFF", 
            quality: 1.0 
          })
            .then((dataUrl) => {
              const link = document.createElement("a");
              link.download = "json-tree.png";
              link.href = dataUrl;
              link.click();
              toast.success("Downloaded successfully!");
            })
            .catch(() => toast.error("Download failed"))
            .finally(() => reactFlowInstance.setViewport(viewport));
        }
      }, 100);
    }
  }, [reactFlowInstance, darkMode]);

  return (
    <header className="bg-white/95 dark:bg-gray-800/95 border-b border-gray-100 dark:border-gray-500 px-6 py-3 shadow-sm">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
          JSON Tree Visualizer
        </h1>
        <div className="flex items-center gap-4">
          <div className="flex gap-3">
            <div className="relative">
              <Search 
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" 
                size={18} 
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                placeholder="Search by key or path..."
                className="w-full pl-9 pr-3 py-1.5 rounded-lg text-sm bg-gray-50 dark:bg-gray-900/80 text-gray-900 dark:text-gray-100 border-2 border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
              />
            </div>
            <button 
              onClick={handleSearch} 
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-lg font-semibold"
            >
              Search
            </button>
          </div>
          <button 
            onClick={handleDownload} 
            className="p-2 rounded-md bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600" 
            aria-label="Download"
          >
            <Download size={16} className="dark:text-white" />
          </button>
          <button 
            onClick={toggleDarkMode} 
            className="p-2 rounded-md bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white"
            aria-label="Toggle theme"
          >
            {darkMode ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;