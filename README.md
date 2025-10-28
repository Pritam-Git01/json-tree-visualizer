# 🌳 JSON Tree Visualizer

A beautiful, interactive JSON tree visualization tool built with React, TypeScript, and ReactFlow. Transform complex JSON structures into intuitive, visual tree diagrams with real-time editing, search capabilities, and dark mode support.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-19.x-61dafb.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6.svg)
![ReactFlow](https://img.shields.io/badge/ReactFlow-11.x-ff0072.svg)

---

## ✨ Features

### 🎨 **Visual Tree Representation**
- **Interactive Nodes**: Drag, zoom, and pan through your JSON structure
- **Color-Coded Nodes**: Different colors for objects, arrays, and primitive values
- **Hierarchical Layout**: Automatic tree layout with smart positioning
- **Item Count Badges**: Visual indicators showing object/array sizes

### 🔍 **Advanced Search**
- **Real-time Search**: Find nodes by key name or JSON path
- **Highlight Results**: Automatic highlighting and navigation to matched nodes
- **Path-based Navigation**: Jump directly to specific nodes in your tree

### 🎯 **User Experience**
- **Dark Mode**: Beautiful dark theme with seamless toggle
- **Copy to Clipboard**: Click any node to copy its JSON path
- **Export as PNG**: Download your tree visualization as an image
- **Responsive Design**: Works perfectly on desktop and tablet devices

### 🚀 **Performance**
- **Optimized Rendering**: Efficient handling of large JSON structures
- **Smooth Animations**: Buttery-smooth transitions and interactions
- **Memory Efficient**: Smart layout algorithm with minimal overhead

---

## 🛠️ Tech Stack

- **[React](https://react.dev/)** - UI framework
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe development
- **[ReactFlow](https://reactflow.dev/)** - Interactive node-based graphs
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first styling
- **[Lucide React](https://lucide.dev/)** - Beautiful icons
- **[React Hot Toast](https://react-hot-toast.com/)** - Elegant notifications
- **[html-to-image](https://github.com/bubkoo/html-to-image)** - Export to PNG

---

## 📦 Installation

### Prerequisites
- Node.js 16.x or higher
- npm or yarn package manager

### Steps

1. **Clone the repository**
```bash
git clone https://github.com/pritam-git01/json-tree-visualizer.git
cd json-tree-visualizer
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Start the development server**
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. **Open your browser**
```
http://localhost:5173
```

---

## 🚀 Usage

### Basic Usage

1. **Paste your JSON** in the left panel
2. **Click "Visualize"** to generate the tree
3. **Interact with the tree**:
   - Drag nodes to reposition
   - Zoom in/out using mouse wheel or controls
   - Click nodes to copy their JSON path
   - Use minimap for navigation

### Search Functionality

1. Enter a key name or path in the search box
2. Press Enter or click "Search"
3. The matching node will be highlighted and centered

### Export Tree

Click the download button in the header to export your tree as a PNG image.

### Dark Mode

Toggle between light and dark themes using the moon/sun icon in the header.

---

## 📁 Project Structure

```
src/
├── types/
│   └── index.ts                    # TypeScript interfaces and types
│
├── constants/
│   └── index.ts                    # Application constants
│
├── utils/
│   ├── edgeStyles.ts              # Edge styling utilities
│   ├── jsonParser.ts              # JSON parsing and tree generation
│   └── layoutEngine.ts            # Tree layout algorithm
│
├── context/
│   └── TreeContext.tsx            # Global state management
│
├── components/
│   ├── CustomNode/
│   │   └── CustomNode.tsx         # Node rendering component
│   ├── Header/
│   │   └── Header.tsx             # Header with controls
│   ├── JSONInput/
│   │   └── JSONInput.tsx          # JSON input panel
│   └── TreeVisualization/
│       └── TreeVisualization.tsx  # ReactFlow canvas
│
└── App.tsx                         # Main application component
```

---

## 🏗️ Architecture

### Component Hierarchy

```
App (TreeProvider)
├── Header
│   ├── Search
│   ├── Download
│   └── Theme Toggle
├── JSONInput
│   ├── Textarea
│   ├── Visualize Button
│   └── Clear Button
└── TreeVisualization
    ├── ReactFlow
    ├── CustomNode
    ├── Background
    ├── Controls
    └── MiniMap
```

### State Management

The application uses **React Context API** for global state management:

```typescript
interface TreeContextType {
  jsonInput: string;              // Current JSON input
  nodes: CustomNode[];            // Tree nodes
  edges: CustomEdge[];            // Connections between nodes
  searchQuery: string;            // Current search term
  darkMode: boolean;              // Theme state
  reactFlowInstance: ReactFlowInstance | null;
  // ... methods
}
```

---

## 🎨 Customization

### Modify Node Colors

Edit `src/components/CustomNode/CustomNode.tsx`:

```typescript
const getNodeStyle = (): string => {
  // Customize colors here
  if (type === "objectKey") {
    colors = "bg-blue-50 border-blue-400"; // Change to your colors
  }
  // ...
};
```

### Adjust Layout Spacing

Edit `src/constants/index.ts`:

```typescript
export const HORIZONTAL_SPACING = 300; // Increase for wider spacing
export const VERTICAL_SPACING = 100;   // Increase for taller spacing
```

### Change Sample JSON

Update the default JSON in `src/constants/index.ts`:

```typescript
export const SAMPLE_JSON = `{
  "your": "custom",
  "json": "here"
}`;
```

---

## 🧪 Testing

```bash
# Run unit tests
npm run test

# Run tests with coverage
npm run test:coverage

# Run e2e tests
npm run test:e2e
```

---

## 🏗️ Building for Production

```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

The build artifacts will be stored in the `dist/` directory.

---

## 📚 API Reference

### `jsonPathToTree(obj: any, path?: string): TreeStructure`

Converts a JSON object into a tree structure.

**Parameters:**
- `obj` - The JSON object to convert
- `path` - The root path (default: `"$"`)

**Returns:**
- `TreeStructure` - Object containing nodes and edges arrays

### `getLayoutedElements(nodes, edges): CustomNode[]`

Calculates positions for all nodes in the tree.

**Parameters:**
- `nodes` - Array of nodes
- `edges` - Array of edges

**Returns:**
- Array of nodes with calculated positions

---

## 🤝 Contributing

Contributions are always welcome! Here's how you can help:

### Reporting Bugs

1. Check if the bug has already been reported in [Issues](https://github.com/yourusername/json-tree-visualizer/issues)
2. If not, create a new issue with:
   - Clear description
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable

### Submitting Pull Requests

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Write or update tests
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

### Development Guidelines

- Follow the existing code style
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed
- Keep PRs focused and small

---

## 🐛 Known Issues

- Large JSON files (>10MB) may cause performance issues
- Some Unicode characters might not render correctly in PNG exports
- Mobile support is limited (best viewed on desktop/tablet)

---


---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2025 Pritam Kumar Yadav

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

---

## 👏 Acknowledgments

- [ReactFlow](https://reactflow.dev/) - For the amazing graph visualization library
- [Tailwind CSS](https://tailwindcss.com/) - For the utility-first CSS framework
- [Lucide](https://lucide.dev/) - For beautiful icon set
- All contributors who help improve this project

---

## 📞 Support

- 📧 Email: pritamyadav.dev@gmail.com

---

## 🌟 Show Your Support

If this project helped you, please consider giving it a ⭐️ on GitHub!

---

<p align="center">Made with ❤️ by <a href="https://github.com/yourusername">Pritam</a></p>

<p align="center">
  <a href="#-features">Features</a> •
  <a href="#-installation">Installation</a> •
  <a href="#-usage">Usage</a> •
  <a href="#-contributing">Contributing</a> •
  <a href="#-license">License</a>
</p>
