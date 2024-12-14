import React, { useState } from "react";
import TreeGraph from "./components/TreeGraph";
import NodeDetails from "./components/NodeDetails";

const App = () => {
  const [selectedNode, setSelectedNode] = useState(null);

  return (
    <div className="app">
      <h1>Graph Visualization</h1>
      <TreeGraph onNodeSelect={setSelectedNode} />
      <NodeDetails node={selectedNode} onDeselect={() => setSelectedNode(null)} />
    </div>
  );
};

export default App;
