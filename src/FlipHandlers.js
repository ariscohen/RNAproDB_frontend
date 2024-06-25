// FlipHandlers.js
import * as d3 from 'd3';

export const handleFlipX = () => {
  const width = parseInt(d3.select("#right_column svg").attr("width"));
  const height = parseInt(d3.select("#right_column svg").attr("height"));

  d3.select("#right_column").selectAll(".node").each(function (d) {
    d.x = width - d.x;
  });

  updateGraph();
};

export const handleFlipY = () => {
  const width = parseInt(d3.select("#right_column svg").attr("width"));
  const height = parseInt(d3.select("#right_column svg").attr("height"));

  d3.select("#right_column").selectAll(".node").each(function (d) {
    d.y = height - d.y;
  });

  updateGraph();
};

export const updateGraph = () => {
  // Update node positions
  d3.select("#right_column").selectAll(".node").each(function (d) {
    d3.select(this).select("circle")
      .attr("cx", d.x)
      .attr("cy", d.y);

    d3.select(this).select("rect")
      .attr("x", d.x)
      .attr("y", d.y);

    d3.select(this).select("text")
      .attr("x", d.x)
      .attr("y", d.y)
      .style("font-size", "16px"); // Adjust text size here
  });

  d3.select("#right_column").selectAll(".link")
    .attr("x1", d => d.source.x)
    .attr("y1", d => d.source.y)
    .attr("x2", d => d.target.x)
    .attr("y2", d => d.target.y);

  d3.select("#right_column").selectAll(".link-dashed")
    .attr("x1", d => d.source.x)
    .attr("y1", d => d.source.y)
    .attr("x2", d => d.target.x)
    .attr("y2", d => d.target.y);
};
