import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import axios from "axios";

const TreeGraph = ({ onNodeSelect }) => {
  const [data, setData] = useState(null);

  const transformToHierarchy = (data) => {
    // Transform flat data into a hierarchical structure
    const map = {};
    data.forEach((item) => (map[item.name] = { ...item, children: [] }));
    const hierarchy = [];
    data.forEach((item) => {
      if (item.parent) {
        map[item.parent].children.push(map[item.name]);
      } else {
        hierarchy.push(map[item.name]);
      }
    });
    return hierarchy[0]; // Root node
  };

  useEffect(() => {
    // Fetch data from the backend
       fetch('http://localhost:3001/users')
      .then(response=>response.json())
      .then((data) => {
        const transformedData = transformToHierarchy(data);
        setData(transformedData);
      }).catch(err => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    const renderGraph = (rootData) => {
      const width = 800;
      const height = 400;

      // Clear previous graph
      d3.select("#tree-graph").selectAll("*").remove();

      // Create SVG
      const svg = d3
        .select("#tree-graph")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

      const root = d3.hierarchy(rootData);
      const treeLayout = d3.tree().size([width - 50, height - 50]);
      treeLayout(root);

      // Draw links
      svg
        .selectAll(".link")
        .data(root.links())
        .enter()
        .append("line")
        .attr("class", "link")
        .attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y)
        .attr("stroke", "#ccc");

      // Draw nodes
      svg
        .selectAll(".node")
        .data(root.descendants())
        .enter()
        .append("circle")
        .attr("class", "node")
        .attr("cx", (d) => d.x)
        .attr("cy", (d) => d.y)
        .attr("r", 10)
        .attr("fill", "steelblue")
        .on("click", (event, d) => onNodeSelect(d.data));
    };
    if (data) renderGraph(data);
  }, [data, onNodeSelect]);

  return <div id="tree-graph"></div>;
};

export default TreeGraph;
