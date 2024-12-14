import React from "react";

const NodeDetails = ({ node, onDeselect }) => {
  if (!node) return null;

  return (
    <div className="node-details">
      <h2>Node Details</h2>
      <p><strong>Name:</strong> {node.name}</p>
      <p><strong>Description:</strong> {node.description}</p>
      <button onClick={onDeselect}>Deselect</button>
    </div>
  );
};

export default NodeDetails;
