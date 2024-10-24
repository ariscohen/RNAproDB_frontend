tooltipColorDict = {
"#FF9896": "#ffcece", //red/pink
"#90cc84": "#ddffd6", //green
"#DBDB8D": "#ffffba", //yellow
"#AEC7E8": "#dbeaff", // blue
"#c6c6c6": "#eaeaea", //gray
}

var multiple_select = [];
var prev_single_select;

function static_d3graphscript(config = {
    // Default values
    width: 800,
    height: 600,
    graph: null,
  }) {
    let transformState = {
      translateX: 0,
      translateY: 0,
      rotation: 0,
      scale: 1
    };
    let disableZoomFit = false;
    //Constants for the SVG
    var width = config.width;
    var height = config.height;
    
    // Set the graph
    var graph = config.graph;
  
    //Set up the colour scale
    var color = d3.scale.category20();
  
    //Remove existing SVG if it exists
    d3.selectAll("svg.interfaceGraph").remove();
  
    var isForcefieldActive = false;
    // TOGGLE THE BUTTON IF WE NEED TO!
    // BASICALLY, RESET THE BUTTON WHEN THIS IS CALLED! OR DO IT ABOVE IN NEWPYTHONGRAPH

    const forcefieldButton = document.getElementById("forcefieldButton");
    
    forcefieldButton.addEventListener("click", function() {
      // Toggle the value of the global variable
      isForcefieldActive = !isForcefieldActive;
      if(isForcefieldActive){ //if force field is active, make sure none of the nodes are fixed!
        d3.selectAll('g.node[shape_class="circle"]').each(function(e) {e.fixed=false});
        d3.selectAll('g.node[shape_class="rect"]').each(function(e) {e.fixed=false});
            // Fix nodes position and start the simulation
        graph.nodes.forEach(function(d) {
            d.fixed = false; // Fix the nodes position
        });

        force.start()
      }
      else{ // if force field inactive, set every node as fixed!
        d3.selectAll('g.node[shape_class="circle"]').each(function(e) {e.fixed=true});
        d3.selectAll('g.node[shape_class="rect"]').each(function(e) {e.fixed=true});
      }
    });

    //Append a SVG to the body of the html page. Assign this SVG as an object to svg
    d3.selectAll("svg.interfaceGraph").remove();
    var svg = d3.select("#right_column").append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("class","interfaceGraph")
        .call(d3.behavior.zoom().on("zoom", function () {
          // Update the transform state with the current zoom translate and scale values
          transformState.translateX = d3.event.translate[0];
          transformState.translateY = d3.event.translate[1];
          transformState.scale = d3.event.scale;
      
          // Apply the transformation, including rotation from transformState
          svg.attr("transform", "translate(" + transformState.translateX + "," + transformState.translateY + ") " +
                                "scale(" + transformState.scale + ") " +
                                "rotate(" + transformState.rotation + ")");
      }))
              .on("dblclick.zoom", null)
        .append("g");

    // Append a defs (definitions) section to your SVG
var defs = svg.append("defs");

// FILTER FOR BLACK BORDER AROUND SVG
var filter = defs.append("filter")
    .attr("id", "border-effect")
    .attr("x", "-50%")
    .attr("y", "-50%")
    .attr("width", "200%")
    .attr("height", "200%");

filter.append("feMorphology")
    .attr("operator", "dilate")
    .attr("radius", "1")
    .attr("in", "SourceGraphic")
    .attr("result", "expanded");

filter.append("feComposite")
    .attr("in", "expanded")
    .attr("in2", "SourceGraphic")
    .attr("operator", "out")
    .attr("result", "border");

filter.append("feFlood")
    .attr("flood-color", "black")
    .attr("result", "color");

filter.append("feComposite")
    .attr("in", "color")
    .attr("in2", "border")
    .attr("operator", "in")
    .attr("result", "border");

filter.append("feMerge")
    .append("feMergeNode")
    .attr("in", "border");
filter.select("feMerge")
    .append("feMergeNode")
    .attr("in", "SourceGraphic");

    var force = d3.layout.force()
    .size([width, height])
    .nodes(graph.nodes) // Initialize nodes
    .links(graph.links) // Initialize links
    .linkDistance(100)  // You can customize this value
    .charge(-800) // Very low charge
    .gravity(0)
    // .linkStrength(0.1) // Weak link strength
    .friction(0.2) // High friction to slow down movement
    .on('tick', tick)   // Tick function for the force simulation

    // Fix nodes position and start the simulation
    
    // window.changeMappingAlgorithm = function(algorithm) {
    //   graph.nodes.forEach(function(d) {
    //     d.fixed = true; // Fix the nodes position
    //     if (algorithm === "None") {
    //         d.x = parseFloat(d.x);
    //         d.y = parseFloat(d.y);
    //     } else if (algorithm === "PCA") {
    //       d.x = parseFloat(d.pca_x);
    //       d.y = parseFloat(d.pca_y);
    //     } else if (algorithm === "RNAScape") {
    //       d.x = parseFloat(d.rnascape_x);
    //       d.y = parseFloat(d.rnascape_y);
    //     } else if (algorithm === "SecondaryStructure") {
    //       d.x = parseFloat(d.viennarna_x);
    //       d.y = parseFloat(d.viennarna_y);
    //     }
    //   });
    //   updateGraph();
    // }
    
    // window.changeMappingAlgorithm("None");
    graph.nodes.forEach(function(d) {
    d.x = parseFloat(d.x);
    d.y = parseFloat(d.y);
    d.fixed = true; // Fix the nodes position
    });
    force.start(); // Start the simulation with nodes fixed

    
    // DRAGGING START
    function dragstarted(d) {
      disableZoomFit = true;
      d3.event.sourceEvent.stopPropagation();
      d3.select(this).classed("dragging", true);
      d.fx = d.x; // Set the fixed position to the current position
      d.fy = d.y;
  }
  
  function dragged(d) {
      d.fx = d3.event.x; // Update the fixed x-position
      d.fy = d3.event.y; // Update the fixed y-position
  }
  
  function dragended(d) {
      d3.select(this).classed("dragging", false);
      if (!d3.event.active) {
          d.fx = null; // Allow the node to move freely again
          d.fy = null;
      }
  }
  
    
    var drag = force.drag()
    .origin(function(d) { return d; })
    .on("dragstart", dragstarted)
    .on("drag", dragged)
    .on("dragend", dragended);
      
      // DRAGGING STOP
      
      // Create arrow for backbone
      svg.append("defs").selectAll("marker")
      .data(["arrowRNAscape"]) // A unique identifier for the arrow marker
      .enter().append("marker")
      .attr("id", "arrowRNAscape")
      .attr("viewBox", "0 -5 10 10")
      .attr("refX", 16) // Position the arrow closer or further from the node
      .attr("refY", 0)
      .attr("markerWidth", 3)
      .attr("markerHeight", 3)
      .attr("orient", "auto")
      .append("path")
      .attr("d", "M0,-5L10,0L0,5")  // The shape of the arrow
      .attr("fill", "#000");


    // Create links with a "double stroke" effect for borders
    var link = svg.selectAll(".link")
    .data(graph.links)
    .enter().append("line")
    .attr("class","link")
    .style("stroke-dasharray", function(d) { 
      // console.log("Distance 3d for link:", d.distance_3d);
      return d.my_type === "pair" ? "10,10" : "none"; // "none" for solid
     })
     .style("stroke", function(d) { return d.color; }) // Colored stroke
    .style("stroke-opacity", 1)
    .style("stroke-width", function(d) { return d.edge_width + 4; }) // Make the black stroke wider
    .attr("x1", function(d) { return d.source.x; })
    .attr("y1", function(d) { return d.source.y; })
    .attr("x2", function(d) { return d.target.x; })
    .attr("y2", function(d) { return d.target.y; })
    .attr("marker-end", function(d) { return d.my_type === "backbone" ? "url(#arrowRNAscape)" : null}); // Apply the arrow marker to "backbone" links

      const edges = graph.links;
      const length = 12; // Define the length variable

     const waterMediatedCircle = svg.selectAll(".waterMediatedCircle")
     .data(edges.filter(d => d.is_whbond))
     .enter().append("circle")
     .attr("class", "waterMediatedCircle")
     .attr("r", 9)
     .style("fill", "white")
    //  .style("opacity", function(d) { return d.node_opacity; })
     .style("stroke-width", function(d) { return 3; })
     .style("stroke", "black");


      const linkTriangleRight = svg.selectAll(".linkTriangleRight")
        .data(edges.filter(d => d.LW && ['hs', 'ws'].includes(d.LW.slice(-2).toLowerCase())))
        .enter().append("path")
        .attr("class", "linkTriangleRight")
        .attr("d", `M -${length} -${length} L 0 ${length} L ${length} -${length} Z`)
        .style("fill", function(d) { 
          if (d.LW && d.LW[0].toLowerCase() === 't') {
            return "white";
          } else {
            return "#4169e1";
          }
        })
        .style("opacity", function(d) { return d.node_opacity; })
        .style("stroke-width", function(d) { return 2; })
        .style("stroke", "#4169e1");

      const linkTriangleLeft = svg.selectAll(".linkTriangleLeft")
      .data(edges.filter(d => d.LW && ['sh', 'sw'].includes(d.LW.slice(-2).toLowerCase())))
      .enter().append("path")
      .attr("class", "linkTriangleLeft")
      .attr("d", `M ${length} ${length} L 0 -${length} L -${length} ${length} Z`)
      .style("fill", function(d) { 
        if (d.LW && d.LW[0].toLowerCase() === 't') {
          return "white";
        } else {
          return "#4169e1";
        }
      })
      .style("opacity", function(d) { return d.node_opacity; })
      .style("stroke-width", function(d) { return 2; })
      .style("stroke", "#4169e1");
      
      const linkSquareLeft = svg.selectAll(".linkSquareLeft")
        .data(edges.filter(d => d.LW && ['hs', 'hw'].includes(d.LW.slice(-2).toLowerCase())))
        .enter().append("path")
        .attr("class", "linkSquareLeft")
        .attr("d", `M -${length} -${length} L ${length} -${length} L ${length} ${length} L -${length} ${length} Z`)
        .style("fill", function(d) { 
          if (d.LW && d.LW[0].toLowerCase() === 't') {
            return "white";
          } else {
            return "#4169e1";
          }
        })
        .style("opacity", function(d) { return d.node_opacity; })
        .style("stroke-width", function(d) { return 2; })
        .style("stroke", "#4169e1");
      
     const linkSquareRight = svg.selectAll(".linkSquareRight")
        .data(edges.filter(d => d.LW && ['wh', 'sh'].includes(d.LW.slice(-2).toLowerCase())))
        .enter().append("path")
        .attr("class", "linkSquareRight")
        .attr("d", `M -${length} -${length} L ${length} -${length} L ${length} ${length} L -${length} ${length} Z`)
        .style("fill", function(d) { 
          if (d.LW && d.LW[0].toLowerCase() === 't') {
            return "white";
          } else {
            return "#4169e1";
          }
        })
        .style("opacity", function(d) { return d.node_opacity; })
        .style("stroke-width", function(d) { return 2; })
        .style("stroke", "#4169e1");
      
      const linkSquareCenter = svg.selectAll(".linkSquareCenter")
        .data(edges.filter(d => d.LW && ['hh'].includes(d.LW.slice(-2).toLowerCase())))
        .enter().append("path")
        .attr("class", "linkSquareCenter")
        .attr("d", `M -${length} -${length} L ${length} -${length} L ${length} ${length} L -${length} ${length} Z`)
        .style("fill", function(d) { 
          if (d.LW && d.LW[0].toLowerCase() === 't') {
            return "white";
          } else {
            return "#4169e1";
          }
        })
        .style("opacity", function(d) { return d.node_opacity; })
        .style("stroke-width", function(d) { return 2; })
        .style("stroke", "#4169e1");
      
      const linkTriangleCenter = svg.selectAll(".linkTriangleCenter")
        .data(edges.filter(d => d.LW && ['ss'].includes(d.LW.slice(-2).toLowerCase())))
        .enter().append("path")
        .attr("class", "linkTriangleCenter")
        .attr("d", `M -${length} -${length} L 0 ${length} L ${length} -${length} Z`)
        .style("fill", function(d) { 
          if (d.LW && d.LW[0].toLowerCase() === 't') {
            return "white";
          } else {
            return "#4169e1";
          }
        })
        .style("opacity", function(d) { return d.node_opacity; })
        .style("stroke-width", function(d) { return 2; })
        .style("stroke", "#4169e1");
      
      const linkCircleLeft = svg.selectAll(".linkCircleLeft")
        .data(edges.filter(d => d.LW && ['ws', 'wh'].includes(d.LW.slice(-2).toLowerCase())))
        .enter().append("circle")
        .attr("class", "linkCircleLeft")
        .attr("r", length)
        .style("fill", function(d) { 
          if (d.LW && d.LW[0].toLowerCase() === 't') {
            return "white";
          } else {
            return "#4169e1";
          }
        })
        .style("opacity", function(d) { return d.node_opacity; })
        .style("stroke-width", function(d) { return 2; })
        .style("stroke", "#4169e1");

      const linkCircleRight = svg.selectAll(".linkCircleRight")
      .data(edges.filter(d => d.LW && ['sw', 'hw'].includes(d.LW.slice(-2).toLowerCase())))
      .enter().append("circle")
      .attr("class", "linkCircleRight")
      .attr("r", length)
      .style("fill", function(d) { 
        if (d.LW && d.LW[0].toLowerCase() === 't') {
          return "white";
        } else {
          return "#4169e1";
        }
      })
      .style("opacity", function(d) { return d.node_opacity; })
      .style("stroke-width", function(d) { return 2; })
      .style("stroke", "#4169e1");
      
      const linkCircleCenter = svg.selectAll(".linkCircleCenter")
        .data(edges.filter(d => d.LW && d.LW == 'tWW'))
        .enter().append("circle")
        .attr("class", "linkCircleCenter")
        .attr("r", length)
        .style("fill", "white")
        .style("opacity", function(d) { return d.node_opacity; })
        .style("stroke-width", function(d) { return 2; })
        .style("stroke", "#4169e1");

    // //Do the same with the circles for the nodes
    var node = svg.selectAll(".node")
      .data(graph.nodes)
      .enter().append("g")
      .attr("class", "node")
      .attr("id", function(d) {var spl = d.name.split(":"); return `${spl[0]}:${spl[1]}:${spl[2]}`;})
      .attr("shape_class", function(d) {return d.shape;})
      .call(drag)
      .on('dblclick', connectedNodes); // HIGHLIGHT ON/OFF
    // console.log(node);
    node.on('click', color_on_click); // ON CLICK HANDLER
    
    // // Create Circles for nodes with shape_class of "circle"

    // Now append circles to those groups that have a 'shape_class' of 'circle'
    node.filter(function(d) { // Use filter to append circles only to nodes with 'circle' shape
        return d.shape === 'circle';
    })
    .append("circle")
    .attr("r", function(d) { return d.node_size; })
    .attr("height", window.nodeHeight)
    .style("fill", function(d) {return d.node_color;})				// NODE-COLOR
    .style("opacity", function(d) {return d.node_opacity;}) 	    // NODE-OPACITY
    .style("stroke-width", function(d) {return d.node_size_edge*2;})	// NODE-EDGE-SIZE
    .style("stroke", function(d) {return d.node_color_edge;})		// NODE-COLOR-EDGE
    //  .style("stroke", '#000')										// NODE-EDGE-COLOR (all black));
    
  // Add text to Circles
  d3.selectAll('g.node[shape_class="circle"]').append("text")
    .attr("dx", function(d) {
      return d.node_name.length === 1 ? -8 : -15; // Adjust horizontal displacement
    })
    .attr("dy", 9)
    .text(function(d) { return d.node_name; }) // NODE-TEXT
    .style("font-size", function(d) { return d.node_fontsize + "px"; }) // Set font size equal to node edge size
    .style("fill", function(d) { return d.node_fontcolor; }) // Set the text fill color to the same as node color
    .style("font-family", "monospace")
    .attr("transform", function(d) {
      return "rotate(" + transformState.rotation + ")";
  });

    
    // Create Circles for nodes with shape_class of "squares"
    d3.selectAll('g.node[shape_class="rect"]').append("rect") 
      .attr("width", function(d) { return d.node_size; })					// NODE SIZE
      .attr("height", function(d) { return d.node_size; })					// NODE SIZE
      .style("fill", function(d) {return d.node_color;})				// NODE-COLOR
      .style("opacity", function(d) {return d.node_opacity;}) 	    // NODE-OPACITY
      .style("stroke-width", function(d) {return d.node_size_edge*2;})	// NODE-EDGE-SIZE
      .style("stroke", function(d) {return d.node_color_edge;})		// NODE-COLOR-EDGE
    //  .style("stroke", '#000')										// NODE-EDGE-COLOR (all black)
    
    // Add text to Squares
    d3.selectAll('g.node[shape_class="rect"]').append("text")
    .attr("dx", 10)
    .attr("dy", 20)
    .text(function(d) {return d.node_name}) // NODE-TEXT
    .style("font-size", function(d) {return d.node_fontsize + "px";}) // set font size equal to node edge size
    .style("fill", function(d) {return d.node_fontcolor;}) // set the text fill color to the same as node color
    .style("font-family", "monospace")
    .attr("transform", function(d) {
      return "rotate(" + transformState.rotation + ")";
  });
    

    // New NODE tooltip code
    const tooltip = d3.select("#tooltip");
    function generateTooltipContent(event) {
      // console.log(event);
      let content = `<div style="text-align: center;"><strong>${event.node_name} ${event.rnaprodb_id.split(":")[1]}${event.icode}</strong></div>`;
  
      // Attempt to parse the tooltip_table JSON
      try {
          const tooltipData = JSON.parse(event.tooltip_table);
          //console.log("tooltipData", tooltipData);
  
          // Append data to the tooltip content
          Object.entries(tooltipData).forEach(([key, value]) => {
              content += `<b>${key}:</b> ${value}<br/>`;
          });
      } catch (error) {
          console.error("Error parsing tooltip_table:", error);
          content += "<em>Error in tooltip data</em>";
      }
  
      return content;
  }
      node.on("mouseover", function(event, d) {
        var newEvent = d3.event; // Access event using d3.event
        // Brighten the node color for the tooltip background
          const brightenedColor = tooltipColorDict[event.node_color]; 
          tooltip.style("opacity", 1)
                  .style("left", (newEvent.pageX + 10) + "px")
                  .style("top", (newEvent.pageY - 10) + "px")
                  .html(() => {
                      return generateTooltipContent(event);
                  })
                  .style("background",brightenedColor); // Optional: custom color for tooltip background
      })
      .on("mouseout", function() {
          tooltip.style("opacity", 0);
      });
      
      // New EDGE TOOLTIP CODE
      const edgeTooltip = d3.select("#edgeTooltip");

      // RAKTIM ADD EDGE STUFF HERE
      function generateEdgeTooltipContent(d) {
        // console.log(d);
    // You can customize this content based on the edge data
    let content = `<strong>Connection:</strong> ${d.source.node_name} to ${d.target.node_name}<br/>`;
            // Attempt to parse the tooltip_table JSON
      try {
        const tooltipData = JSON.parse(d.tooltip_table);
        //console.log("tooltipData", tooltipData);

        // Append data to the tooltip content
        Object.entries(tooltipData).forEach(([key, value]) => {
            var key = key.replace(/\\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;');
            content += `<b>${key}:</b> ${value}<br/>`;
        });
    } catch (error) {
        console.error("Error parsing tooltip_table:", error);
        content += "<em>Error in tooltip data</em>";
    }


    return content;
}

// Event listeners for lines (edges)
link.on("mouseover", function(event, d) {
  var newEvent = d3.event; // Access event using d3.event
    edgeTooltip.style("opacity", 1)
               .style("left", `${newEvent.pageX + 10}px`)
               .style("top", `${newEvent.pageY + 10}px`)
               .html(() => generateEdgeTooltipContent(event));
})
.on("mouseout", function() {
    edgeTooltip.style("opacity", 0);
});

// Event listeners for triangles along the edges
linkTriangleRight.on("mouseover", function(event, d) {
  var newEvent = d3.event; // Access event using d3.event
    edgeTooltip.style("opacity", 1)
               .style("left", `${newEvent.pageX + 10}px`)
               .style("top", `${newEvent.pageY + 10}px`)
               .html(() => generateEdgeTooltipContent(event));
})
.on("mouseout", function() {
    edgeTooltip.style("opacity", 0);
});
// Event listeners for triangles along the edges
linkTriangleLeft.on("mouseover", function(event, d) {
  var newEvent = d3.event; // Access event using d3.event
    edgeTooltip.style("opacity", 1)
               .style("left", `${newEvent.pageX + 10}px`)
               .style("top", `${newEvent.pageY + 10}px`)
               .html(() => generateEdgeTooltipContent(event));
})
.on("mouseout", function() {
    edgeTooltip.style("opacity", 0);
});
// Event listeners for triangles along the edges
linkTriangleCenter.on("mouseover", function(event, d) {
  var newEvent = d3.event; // Access event using d3.event
    edgeTooltip.style("opacity", 1)
               .style("left", `${newEvent.pageX + 10}px`)
               .style("top", `${newEvent.pageY + 10}px`)
               .html(() => generateEdgeTooltipContent(event));
})
.on("mouseout", function() {
    edgeTooltip.style("opacity", 0);
});
// Event listeners for triangles along the edges
linkSquareRight.on("mouseover", function(event, d) {
  var newEvent = d3.event; // Access event using d3.event
    edgeTooltip.style("opacity", 1)
               .style("left", `${newEvent.pageX + 10}px`)
               .style("top", `${newEvent.pageY + 10}px`)
               .html(() => generateEdgeTooltipContent(event));
})
.on("mouseout", function() {
    edgeTooltip.style("opacity", 0);
});
// Event listeners for triangles along the edges
linkSquareLeft.on("mouseover", function(event, d) {
  var newEvent = d3.event; // Access event using d3.event
    edgeTooltip.style("opacity", 1)
               .style("left", `${newEvent.pageX + 10}px`)
               .style("top", `${newEvent.pageY + 10}px`)
               .html(() => generateEdgeTooltipContent(event));
})
.on("mouseout", function() {
    edgeTooltip.style("opacity", 0);
});
// Event listeners for triangles along the edges
linkSquareCenter.on("mouseover", function(event, d) {
  var newEvent = d3.event; // Access event using d3.event
    edgeTooltip.style("opacity", 1)
               .style("left", `${newEvent.pageX + 10}px`)
               .style("top", `${newEvent.pageY + 10}px`)
               .html(() => generateEdgeTooltipContent(event));
})
.on("mouseout", function() {
    edgeTooltip.style("opacity", 0);
});
// Event listeners for triangles along the edges
linkCircleRight.on("mouseover", function(event, d) {
  var newEvent = d3.event; // Access event using d3.event
    edgeTooltip.style("opacity", 1)
               .style("left", `${newEvent.pageX + 10}px`)
               .style("top", `${newEvent.pageY + 10}px`)
               .html(() => generateEdgeTooltipContent(event));
})
.on("mouseout", function() {
    edgeTooltip.style("opacity", 0);
});
// Event listeners for triangles along the edges
linkCircleLeft.on("mouseover", function(event, d) {
  var newEvent = d3.event; // Access event using d3.event
    edgeTooltip.style("opacity", 1)
               .style("left", `${newEvent.pageX + 10}px`)
               .style("top", `${newEvent.pageY + 10}px`)
               .html(() => generateEdgeTooltipContent(event));
})
.on("mouseout", function() {
    edgeTooltip.style("opacity", 0);
});
// Event listeners for triangles along the edges
linkCircleCenter.on("mouseover", function(event, d) {
  var newEvent = d3.event; // Access event using d3.event
    edgeTooltip.style("opacity", 1)
               .style("left", `${newEvent.pageX + 10}px`)
               .style("top", `${newEvent.pageY + 10}px`)
               .html(() => generateEdgeTooltipContent(event));
})
.on("mouseout", function() {
    edgeTooltip.style("opacity", 0);
});

// Event listeners for water mediated h bond along the edges
waterMediatedCircle.on("mouseover", function(event, d) {
  var newEvent = d3.event; // Access event using d3.event
    edgeTooltip.style("opacity", 1)
               .style("left", `${newEvent.pageX + 10}px`)
               .style("top", `${newEvent.pageY + 10}px`)
               .html(() => generateEdgeTooltipContent(event));
})
.on("mouseout", function() {
    edgeTooltip.style("opacity", 0);
});

      var root = d3.select('g')// any svg.select(...) that has a single node like a container group by #id
  
      var zoom = d3.behavior
      .zoom()
      .scaleExtent([1 / 4, 4])
      .on('zoom', function () {
          // Update the transformState with the new translation and scale
          transformState.translateX = d3.event.translate[0];
          transformState.translateY = d3.event.translate[1];
          transformState.scale = d3.event.scale;
  
          // Apply the current translation, scaling, and rotation to the root
          root.attr('transform',
              'translate(' + transformState.translateX + ',' + transformState.translateY + ') ' +
              'scale(' + transformState.scale + ') ' +
              'rotate(' + transformState.rotation + ')'
          );
      });
  
      function zoomFit(transitionDuration) {
        if(disableZoomFit){
          return;
        }
        console.log("In Zoom fit");
        var bounds = svg.node().getBBox();
        var parent = svg.node().parentElement;
        var fullWidth = parent.clientWidth || parent.parentNode.clientWidth,
            fullHeight = parent.clientHeight || parent.parentNode.clientHeight;
    
        var width = bounds.width,
            height = bounds.height;
        var midX = bounds.x + width / 2,
            midY = bounds.y + height / 2;
        if (width === 0 || height === 0) return; // nothing to fit
        var scale = 0.85 / Math.max(width / fullWidth, height / fullHeight);
        var translate = [
            fullWidth / 2 - scale * midX,
            fullHeight / 2 - scale * midY
        ];
    
        // Update transformState with the new translation and scale
        transformState.translateX = translate[0];
        transformState.translateY = translate[1];
        transformState.scale = scale;
    
        // Apply the updated transformation to the root with the current rotation
        svg.transition()
            .duration(transitionDuration || 0) // milliseconds
            .call(zoom.translate(translate).scale(scale).event);
    
        root.attr('transform',
            'translate(' + transformState.translateX + ',' + transformState.translateY + ') ' +
            'scale(' + transformState.scale + ') ' +
            'rotate(' + transformState.rotation + ')'
        );
    }
    

      // Flip X and Flip Y button functionality
      function handleFlipX() {
        const width = parseInt(d3.select("#right_column svg").attr("width"));
        d3.select("#right_column").selectAll(".node").each(function(d) {
            d.x = width - d.x;
        });
        updateGraph();
    }
    function handleFlipY() {
        const height = parseInt(d3.select("#right_column svg").attr("height"));
        d3.select("#right_column").selectAll(".node").each(function(d) {
            d.y = height - d.y;
        });
        updateGraph();
    }
      
      function updateGraph() {
        // Update node positions
        d3.selectAll(".node").each(function(d) {
            d3.select(this).select("circle")
                .attr("cx", d.x)
                .attr("cy", d.y);
            
            d3.select(this).select("rect")
                .attr("x", d.x)
                .attr("y", d.y);
            
            d3.select(this).select("text")
                .attr("x", d.x)
                .attr("y", d.y);
        });
        
        // Update link positions
        d3.selectAll(".link")
            .attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y);
        

        d3.selectAll(".link-dashed")
            .attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y);

          // Update linkTriangleRight positions
        d3.selectAll(".linkTriangleRight").attr("transform", d => {
            let dx = d.target.x - d.source.x;
            let dy = d.target.y - d.source.y;
            const angle = (Math.atan2(dy, dx) * (180 / Math.PI) - 90);
            return `translate(${(d.source.x + d.target.x) / 2 + dx / 8}, ${(d.source.y + d.target.y) / 2 + dy / 8}) rotate(${angle})`;
        })
        .attr("x", d => (d.source.x + d.target.x) / 2 + (d.target.x - d.source.x) / 8)
        .attr("y", d => (d.source.y + d.target.y) / 2 + (d.target.y - d.source.y) / 8);

        // Update linkSquareLeft positions
        d3.selectAll(".linkSquareLeft").attr("transform", d => {
            let dx = d.target.x - d.source.x;
            let dy = d.target.y - d.source.y;
            const angle = (Math.atan2(dy, dx) * (180 / Math.PI) - 90);
            return `translate(${(d.source.x + d.target.x) / 2 - dx / 8}, ${(d.source.y + d.target.y) / 2 - dy / 8}) rotate(${angle})`;
        })
        .attr("x", d => (d.source.x + d.target.x) / 2 + (d.target.x - d.source.x) / 8)
        .attr("y", d => (d.source.y + d.target.y) / 2 + (d.target.y - d.source.y) / 8);

        // Update linkSquareRight positions
        d3.selectAll(".linkSquareRight").attr("transform", d => {
            let dx = d.target.x - d.source.x;
            let dy = d.target.y - d.source.y;
            const angle = (Math.atan2(dy, dx) * (180 / Math.PI) - 90);
            return `translate(${(d.source.x + d.target.x) / 2 + dx / 8}, ${(d.source.y + d.target.y) / 2 + dy / 8}) rotate(${angle})`;
        })
        .attr("x", d => (d.source.x + d.target.x) / 2 + (d.target.x - d.source.x) / 8)
        .attr("y", d => (d.source.y + d.target.y) / 2 + (d.target.y - d.source.y) / 8);

        // Update linkSquareCenter positions
        d3.selectAll(".linkSquareCenter").attr("transform", d => {
            let dx = d.target.x - d.source.x;
            let dy = d.target.y - d.source.y;
            const angle = (Math.atan2(dy, dx) * (180 / Math.PI) - 90);
            return `translate(${(d.source.x + d.target.x) / 2}, ${(d.source.y + d.target.y) / 2}) rotate(${angle})`;
        })
        .attr("x", d => (d.source.x + d.target.x) / 2 + (d.target.x - d.source.x) / 8)
        .attr("y", d => (d.source.y + d.target.y) / 2 + (d.target.y - d.source.y) / 8);

        // Update linkTriangleCenter positions
        d3.selectAll(".linkTriangleCenter").attr("transform", d => {
            let dx = d.target.x - d.source.x;
            let dy = d.target.y - d.source.y;
            const angle = (Math.atan2(dy, dx) * (180 / Math.PI) - 90);
            return `translate(${(d.source.x + d.target.x) / 2}, ${(d.source.y + d.target.y) / 2}) rotate(${angle})`;
        })
        .attr("x", d => (d.source.x + d.target.x) / 2 + (d.target.x - d.source.x) / 8)
        .attr("y", d => (d.source.y + d.target.y) / 2 + (d.target.y - d.source.y) / 8);

        d3.selectAll(".linkTriangleLeft").attr("transform", d => {
          let dx = d.target.x - d.source.x;
          let dy = d.target.y - d.source.y;
          const angle = (Math.atan2(dy, dx) * (180 / Math.PI) - 90);
          return `translate(${(d.source.x + d.target.x) / 2 - dx / 8}, ${(d.source.y + d.target.y) / 2 - dy / 8}) rotate(${angle})`;
      })
      .attr("x", d => (d.source.x + d.target.x) / 2 + (d.target.x - d.source.x) / 8)
      .attr("y", d => (d.source.y + d.target.y) / 2 + (d.target.y - d.source.y) / 8);

        // Update linkCircleLeft positions
        d3.selectAll(".linkCircleLeft").attr("transform", d => {
            let dx = d.target.x - d.source.x;
            let dy = d.target.y - d.source.y;
            return `translate(${(d.source.x + d.target.x) / 2 - dx / 8}, ${(d.source.y + d.target.y) / 2 - dy / 8})`;
        })
        .attr("x", d => (d.source.x + d.target.x) / 2 + (d.target.x - d.source.x) / 8)
        .attr("y", d => (d.source.y + d.target.y) / 2 + (d.target.y - d.source.y) / 8);

        d3.selectAll(".linkCircleRight").attr("transform", d => {
          let dx = d.target.x - d.source.x;
          let dy = d.target.y - d.source.y;
          return `translate(${(d.source.x + d.target.x) / 2 + dx / 8}, ${(d.source.y + d.target.y) / 2 + dy / 8})`;
        })
          .attr("x", d => (d.source.x + d.target.x) / 2 + (d.target.x - d.source.x) / 8)
          .attr("y", d => (d.source.y + d.target.y) / 2 + (d.target.y - d.source.y) / 8);
          
        // Update linkCircleCenter positions
        d3.selectAll(".linkCircleCenter").attr("transform", d => {
            let dx = d.target.x - d.source.x;
            let dy = d.target.y - d.source.y;
            return `translate(${(d.source.x + d.target.x) / 2}, ${(d.source.y + d.target.y) / 2})`;
        })
        .attr("x", d => (d.source.x + d.target.x) / 2 + (d.target.x - d.source.x) / 8)
        .attr("y", d => (d.source.y + d.target.y) / 2 + (d.target.y - d.source.y) / 8);

                // Update waterMediatedCircle positions
        d3.selectAll(".waterMediatedCircle").attr("transform", d => {
            let dx = d.target.x - d.source.x;
            let dy = d.target.y - d.source.y;
            return `translate(${(d.source.x + d.target.x) / 2}, ${(d.source.y + d.target.y) / 2})`;
        })
        .attr("x", d => (d.source.x + d.target.x) / 2 + (d.target.x - d.source.x) / 8)
        .attr("y", d => (d.source.y + d.target.y) / 2 + (d.target.y - d.source.y) / 8);
        // tick();
    }

    window.handleFlipX = handleFlipX;
    window.handleFlipY = handleFlipY;
    window.updateGraph = updateGraph;

 // collision detection
  
 var padding = 1, // separation between circleszoom
 radius = 25;

function collide(alpha) {
 var quadtree = d3.geom.quadtree(graph.nodes);
 return function(d) {
   var rb = 2 * radius + padding,zoom
     nx1 = d.x - rb,
     nx2 = d.x + rb,
     ny1 = d.y - rb,
     ny2 = d.y + rb;
   quadtree.visit(function(quad, x1, y1, x2, y2) {
     if (quad.point && (quad.point !== d)) {
       var x = d.x - quad.point.x,
         y = d.y - quad.point.y,
         l = Math.sqrt(x * x + y * y);
       if (l < rb) {
         l = (l - rb) / l * alpha;
         d.x -= x *= l;
         d.y -= y *= l;
         quad.point.x += x;
         quad.point.y += y;
       }
     }
     return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
   });
 };
}
// collision detection end


  // --------- MARKER -----------
  
  var data_marker = [
    { id: 0, name: 'circle', path: 'M 0, 0  m -5, 0  a 5,5 0 1,0 10,0  a 5,5 0 1,0 -10,0', viewbox: '-6 -6 12 12' }
  , { id: 1, name: 'square', path: 'M 0,0 m -5,-5 L 5,-5 L 5,5 L -5,5 Z', viewbox: '-5 -5 10 10' }
  , { id: 2, name: 'arrow', path: 'M 0,0 m -5,-5 L 5,0 L -5,5 Z', viewbox: '-5 -5 10 10' }
  , { id: 3, name: 'stub', path: 'M 0,0 m -1,-5 L 1,-5 L 1,5 L -1,5 Z', viewbox: '-1 -5 2 10' }
  ]
  data_marker.push({
    id: 4,
    name: 'large_black_arrow',
    path: 'M 0,0 m -5,-5 L 5,0 L -5,5 Z',
    viewbox: '-5 -5 10 10'
  });
  
  //console.log(JSON.stringify(link))
  
  svg.append("defs").selectAll("marker")
    .data(data_marker)
    .enter()
    .append('svg:marker')
      .attr('id', function(d){ return 'marker_' + d.name})
      //.attr('markerHeight', 14) //ARI modified
      //.attr('markerWidth', 17) //ARI modified
      .attr("markerHeight", function(d) { return d.name === 'large_black_arrow' ? 20 : 14; })
      .attr("markerWidth", function(d) { return d.name === 'large_black_arrow' ? 24 : 17; })
      //.attr('markerUnits', 'strokeWidth')
      .attr("markerUnits", "userSpaceOnUse")                   // Fix marker width
      .attr('orient', 'auto')
      //.attr('refX', -15)                                     // Offset marker-start
      .attr('refX', 21)                                        // Offset marker-end //ARI modified
      .attr('refY', 0)
      .attr('viewBox', function(d){ return d.viewbox })
      .append('svg:path')
      //.attr("transform", "rotate(180)")                    // Marker-start mirrored
        .attr('d', function(d){ return d.path })               // Marker type
        //.style("fill", function(d) {return d.marker_color;}) // Marker color
        .style("fill", function(d) { return d.name === 'arrow' ? '#605f5f' : '#605f5f' }) // Conditionally set color
        .style("stroke", function(d) { return d.name === 'arrow' ? '#605f5f' : '#605f5f' })
        .style("opacity", 1)                                // Marker opacity
        .style("stroke-width", 2);                             // Marker edge thickness
  
  // --------- END MARKER -----------







    //   var hasZoomFit = false; // Flag to ensure zoomFit is only called once
    var timetostopautozoom = 0
    var zoomstopthreshold = 100 // parameter, may not be optimal !!
    function tick(e) {
      // Update link positions
      link.attr("x1", function(d) { return d.source.x; })
          .attr("y1", function(d) { return d.source.y; })
          .attr("x2", function(d) { return d.target.x; })
          .attr("y2", function(d) { return d.target.y; });
  
      // Update node positions using transform to move entire group (g) elements
      node.attr("transform", function(d) {
          return "translate(" + d.x + "," + d.y + ")";
      });
  
      // Update link decorations (arrows, squares, circles, etc.)
      linkTriangleRight.attr("transform", function(d) {
          let dx = d.target.x - d.source.x;
          let dy = d.target.y - d.source.y;
          const angle = (Math.atan2(dy, dx) * (180 / Math.PI) - 90);
          return `translate(${(d.source.x + d.target.x) / 2 + dx / 8}, ${(d.source.y + d.target.y) / 2 + dy / 8}) rotate(${angle})`;
      });
  
      linkTriangleLeft.attr("transform", function(d) {
          let dx = d.target.x - d.source.x;
          let dy = d.target.y - d.source.y;
          const angle = (Math.atan2(dy, dx) * (180 / Math.PI) - 90);
          return `translate(${(d.source.x + d.target.x) / 2 - dx / 8}, ${(d.source.y + d.target.y) / 2 - dy / 8}) rotate(${angle})`;
      });
  
      linkTriangleCenter.attr("transform", function(d) {
          let dx = d.target.x - d.source.x;
          let dy = d.target.y - d.source.y;
          const angle = (Math.atan2(dy, dx) * (180 / Math.PI) - 90);
          return `translate(${(d.source.x + d.target.x) / 2}, ${(d.source.y + d.target.y) / 2}) rotate(${angle})`;
      });
  
      linkSquareLeft.attr("transform", function(d) {
          let dx = d.target.x - d.source.x;
          let dy = d.target.y - d.source.y;
          const angle = (Math.atan2(dy, dx) * (180 / Math.PI));
          return `translate(${(d.source.x + d.target.x) / 2 - dx / 8}, ${(d.source.y + d.target.y) / 2 - dy / 8}) rotate(${angle})`;
      });
  
      linkSquareRight.attr("transform", function(d) {
          let dx = d.target.x - d.source.x;
          let dy = d.target.y - d.source.y;
          const angle = (Math.atan2(dy, dx) * (180 / Math.PI) - 90);
          return `translate(${(d.source.x + d.target.x) / 2 + dx / 8}, ${(d.source.y + d.target.y) / 2 + dy / 8}) rotate(${angle})`;
      });
  
      linkSquareCenter.attr("transform", function(d) {
          let dx = d.target.x - d.source.x;
          let dy = d.target.y - d.source.y;
          const angle = (Math.atan2(dy, dx) * (180 / Math.PI) - 90);
          return `translate(${(d.source.x + d.target.x) / 2}, ${(d.source.y + d.target.y) / 2}) rotate(${angle})`;
      });
  
      linkCircleLeft.attr("transform", function(d) {
          let dx = d.target.x - d.source.x;
          let dy = d.target.y - d.source.y;
          const angle = (Math.atan2(dy, dx) * (180 / Math.PI));
          return `translate(${(d.source.x + d.target.x) / 2 - dx / 8}, ${(d.source.y + d.target.y) / 2 - dy / 8}) rotate(${angle})`;
      });
  
      linkCircleCenter.attr("transform", function(d) {
          let dx = d.target.x - d.source.x;
          let dy = d.target.y - d.source.y;
          const angle = (Math.atan2(dy, dx) * (180 / Math.PI) - 90);
          return `translate(${(d.source.x + d.target.x) / 2}, ${(d.source.y + d.target.y) / 2}) rotate(${angle})`;
      });
  
      linkCircleRight.attr("transform", function(d) {
          let dx = d.target.x - d.source.x;
          let dy = d.target.y - d.source.y;
          return `translate(${(d.source.x + d.target.x) / 2 + dx / 8}, ${(d.source.y + d.target.y) / 2 + dy / 8})`;
      });
  
      waterMediatedCircle.attr("transform", function(d) {
          let dx = d.target.x - d.source.x;
          let dy = d.target.y - d.source.y;
          const angle = (Math.atan2(dy, dx) * (180 / Math.PI) - 90);
          return `translate(${(d.source.x + d.target.x) / 2}, ${(d.source.y + d.target.y) / 2}) rotate(${angle})`;
      });
      
      // Optional auto-zoom logic
      timetostopautozoom += 1;
      if (timetostopautozoom < zoomstopthreshold) {
          zoomFit(0);
      }
  }
  

         // Call zoomFit once when the simulation cools down a bit
        // For example, at the half-way point of the simulation
        // if (e.alpha < 0.05 && !hasZoomFit) {
        //   zoomFit(500); // Call zoomFit with a transition duration
        //   hasZoomFit = true; // Set the flag to true
        // }
    //   }
      // OG TOOLTIP CODE
      // let showInHover = ["node_tooltip"]; // Tooltip
      // node.append("title")
      // .text((d) => Object.keys(d)
      //     .filter((key) => showInHover.indexOf(key) !== -1)
      //     .map((key) => `${d[key]}`)
      //     .join('\n')
      // )


    





//Toggle stores whether the highlighting is on **********************
var toggle = 0;
//Create an array logging what is connected to what
var linkedByIndex = {};
for (i = 0; i < graph.nodes.length; i++) {
  linkedByIndex[i + "," + i] = 1;
};
graph.links.forEach(function(d) {
  linkedByIndex[d.source.index + "," + d.target.index] = 1;
});
//This function looks up whether a pair are neighbours
function neighboring(a, b) {
  return linkedByIndex[a.index + "," + b.index];
}
// format of string should be chain:residue:#
function select_node(idToFind){
  var escapedId = idToFind.replace(/:/g, "\\:");
  var foundNode = d3.select("#" + escapedId);
  return foundNode;
}

// format of string should be chain:residue:#
function d3_highlight_node(idToFind){
  console.log("In d3 highlight node");
  console.log("idtofind", idToFind);
  var curNode = select_node(idToFind);
  console.log("curNode", curNode);
  reset_node_colors();

  // Set the color on click for rect
  curNode.select("circle")
  .style("fill", "yellow")

  // Set the color on click for rect
  curNode.select("rect")
  .style("fill", "yellow");
}
window.d3_highlight_node = d3_highlight_node;


function reset_node_colors(){
  d3.selectAll(".node")
  .select("circle")
  .style("fill", function(d) {return d.node_color;})
  .style("opacity", function(d) {return d.node_opacity;})
  .style("stroke", function(d) {return d.node_color_edge;})
  .style("stroke-width", function(d) {return d.edge_width*2;})
  .attr("r", function(d) { return d.node_size; })
  ;
  d3.selectAll(".node")
  .select("rect")
  .style("fill", function(d) {return d.node_color;})
  .style("opacity", function(d) {return d.node_opacity;})
  .style("stroke", function(d) {return d.node_color_edge;})
  .style("stroke-width", function(d) {return d.edge_width*2;})
  ;
  }
  function reset_graph_colors(e){
      if(e['target']['nodeName']=='svg') {
          reset_node_colors();
          parent.resetView();
      }
  }
window.reset_graph_colors = reset_graph_colors;

// adds node to subgraph textbox, so subgraph can be computed
function add_node_to_subgraph(chain, num, icode){
  let textBox = document.getElementById("subgraph-textbox");
  if (textBox) {  // Check if the textBox is not null
      textBox.value += `${chain}:${num}:${icode},`;
  }
}

  // COLOR ON CLICK
  function color_on_click() {
    // Give the original color back for all nodes!
    if (!d3.event.shiftKey) reset_node_colors();
  
    const nodeData = d3.select(this).datum();
    var name_split = nodeData.name.split(":");
    var chain = name_split[0];
    var residue = name_split[2];
    var icode = nodeData.icode;
  
    add_node_to_subgraph(chain, residue, icode);
  
    var nodeIdToFind = nodeData.name; // replace this with the ID you want to search for
    var escapedId = nodeIdToFind.replace(/:/g, "\\:");
    var foundNode = d3.select("#" + escapedId);
  
    var selectionString = residue + ":" + chain;
  
    if (d3.event.shiftKey) {
      if (multiple_select.includes(selectionString)) {
        d3.select(this).select("circle")
          .style("fill", function(d) { return d.node_color; })
          .style("opacity", function(d) { return d.node_opacity; })
          .style("stroke", function(d) { return d.node_color_edge; })
          .style("stroke-width", function(d) { return d.edge_width * 2; })
          .attr("r", function(d) { return d.node_size; });
  
        d3.select(this).select("rect")
          .style("fill", function(d) { return d.node_color; })
          .style("opacity", function(d) { return d.node_opacity; })
          .style("stroke", function(d) { return d.node_color_edge; })
          .style("stroke-width", function(d) { return d.edge_width * 2; });
  
        index = multiple_select.indexOf(selectionString);
        multiple_select.splice(index, 1);
  
        setTimeout(() => {
          parent.zoomOnClick(multiple_select);
        }, 100);  // Small delay to allow the graph to fully update
        return;
      }
  
      multiple_select.push(selectionString);
      setTimeout(() => {
        parent.zoomOnClick(multiple_select);
      }, 100);
    } else {
      multiple_select = [];
      try {
        setTimeout(() => {
          parent.zoomOnClick(selectionString);  // zooms in on Residue in NGLViewer!
        }, 100);  // Small delay to ensure everything is fully updated
      } catch (error) {
        console.error(error);
      }
    }
  
    if (!d3.event.shiftKey) {
      if (prev_single_select == selectionString) {
        reset_node_colors();
        prev_single_select = null;
        parent.resetView();
        return;
      } else {
        prev_single_select = selectionString;
      }
    }
  
    // Set the color on click for circles
    d3.select(this).select("circle")
      .style("fill", "yellow")
      .attr("r", function(d) { return d.node_size * 1.5; });
  
    // Set the color on click for rect
    d3.select(this).select("rect")
      .style("fill", "yellow");
  }
  
function connectedNodes() {
  if (toggle == 0) {
    //Reduce the opacity of all but the neighbouring nodes
    d = d3.select(this).node().__data__;
    node.style("opacity", function(o) {
      return neighboring(d, o) | neighboring(o, d) ? 1 : 0.1;
    });
    link.style("opacity", function(o) {
      return d.index == o.source.index | d.index == o.target.index ? 1 : 0.1;
    });
    //Reduce the op
    toggle = 1;
  } else {
    //Put them back to opacity=1
    node.style("opacity", 0.95);
    link.style("opacity", 1);

    toggle = 0;
  }
}
//*************************************************************


//adjust threshold
function threshold() {
  let thresh = this.value;

  // console.log('Setting threshold', thresh)
  graph.links.splice(0, graph.links.length);

  for (var i = 0; i < graphRec.links.length; i++) {
    if (graphRec.links[i].edge_weight > thresh) {
      graph.links.push(graphRec.links[i]);
    }
  }
  restart();
}

d3.select("#thresholdSlider").on("change", threshold);

//Restart the visualisation after any node and link changes
function restart() {

  link = link.data(graph.links);
  link.exit().remove();
  link.enter().insert("line", ".node").attr("class", "link");
  // link.style("stroke-width", function(d) {return d.edge_width*2;});           // LINK-WIDTH AFTER BREAKING WITH SLIDER
  //link.style('marker-start', function(d){ return 'url(#marker_' + d.marker_start  + ')' })
  // link.style("marker-end", function(d) {                                    // Include the markers.
  // if (config.directed) {return 'url(#marker_' + d.marker_end + ')' }})
  // link.style("stroke", function(d) {return d.color;});                      // EDGE-COLOR AFTER BREAKING WITH SLIDER

  node = node.data(graph.nodes);
  node.enter().insert("circle", ".cursor").attr("class", "node").attr("r", 5).call(force.drag);
  force.start();
}

function setProteinOpacity(){ //currently links only, opacity conflicts with node coloring currently
        var opacityScale = d3.scale.linear()
              .domain([2, 13])
              .range([1, 0.1]);

        svg.selectAll(".link")
          .filter(function(d) { return d.source.shape === 'rect' || d.target.shape === 'rect'; })
          .style("opacity", function(d) {
            //var sourceIsRect = d.source.type === 'rect';
            //var targetIsCircle = d.target.type === 'circle';
            //if (sourceIsRect && targetIsCircle || targetIsCircle && sourceIsRect) {
                // console.log("hereee", opacityScale(d.distance_3d), d.distance_3d)
              return opacityScale(d.distance_3d);
            //}
            //return 1;
          });
                        

         //svg.selectAll(".waterMediatedCircle")
         // .filter(function(d) { return d.source.shape === 'rect' || d.target.shape === 'rect'; })
         //   .style("opacity", function(d) {
         //   var sourceIsRect = d.source.type === 'rect';
         //   var targetIsCircle = d.target.type === 'circle';
         //   if (sourceIsRect && targetIsCircle || targetIsCircle && sourceIsRect) {
         //     return opacityScale(d.distance_3d);
         //   }
         //   return 1;
         // });



        //svg.selectAll('g.node[shape_class="rect"]')
        //    .style("opacity", function(d) {
        //    var linkedNode = graph.links.find(link => (link.source === d && link.target.type === 'circle') || (link.target === d && link.source.type === 'circle'));
        //     if (linkedNode) {
        //      
        //      return opacityScale(linkedNode.distance_3d);
        //    }
        //    return 1;
        //  });

}
function toggleTertiaryEdges(isChecked) {
  //console.log("In here bb");
  // Select all link elements and update their visibility
  svg.selectAll(".link")
  .filter(function(d) { return d.source.shape !== 'rect' && d.target.shape !== 'rect'; })
  .style('display', function(d) {  // SS TOGGLE 
    return (d.tertiary && isChecked) ? 'none' : 'inline';
  });

  // Also hide/show associated circles and triangles
  svg.selectAll(".waterMediatedCircle")
  .filter(function(d) { return d.source.shape !== 'rect' && d.target.shape !== 'rect'; })
  .style('display', function(d) {
    return (d.tertiary && isChecked) ? 'none' : 'inline';
  });

  svg.selectAll(".linkTriangleRight")
  .style('display', function(d) {
    return (d.tertiary && isChecked) ? 'none' : 'inline';
  });

  svg.selectAll(".linkTriangleLeft")
  .style('display', function(d) {
    return (d.tertiary && isChecked) ? 'none' : 'inline';
  });

  svg.selectAll(".linkTriangleCenter")
  .style('display', function(d) {
    return (d.tertiary && isChecked) ? 'none' : 'inline';
  });

  svg.selectAll(".linkCircleCenter")
  .style('display', function(d) {
    return (d.tertiary && isChecked) ? 'none' : 'inline';
  });

  svg.selectAll(".linkCircleLeft")
  .style('display', function(d) {
    return (d.tertiary && isChecked) ? 'none' : 'inline';
  });

  svg.selectAll(".linkCircleRight")
  .style('display', function(d) {
    return (d.tertiary && isChecked) ? 'none' : 'inline';
  });

  svg.selectAll(".linkSquareCenter")
  .style('display', function(d) {
    return (d.tertiary && isChecked) ? 'none' : 'inline';
  });

  svg.selectAll(".linkSquareLeft")
  .style('display', function(d) {
    return (d.tertiary && isChecked) ? 'none' : 'inline';
  });

  svg.selectAll(".linkSquareRight")
  .style('display', function(d) {
    return (d.tertiary && isChecked) ? 'none' : 'inline';
  });
}
window.toggleTertiaryEdges = toggleTertiaryEdges;

// Toggle function to hide/show protein-related elements
function toggleProteinVisibility(setVisible=false) {
  console.log("toggleProteinVisibility inside d3graphscript");
  var isVisible = d3.select("#toggleProteinCheckbox").property("checked");

  if(setVisible){
    isVisible = false;
  }

  // Toggle links associated with protein nodes
  svg.selectAll(".link")
    .filter(function(d) {return d.source.shape === 'rect' || d.target.shape === 'rect'; })
    .style("display", isVisible ? "none" : "inline");

  // Toggle protein nodes and their labels
  svg.selectAll('g.node[shape_class="rect"]')
    .style("display", isVisible ? "none" : "inline");

  // Toggle associated decorative elements like circles, triangles, and squares on edges
  svg.selectAll(".waterMediatedCircle, .linkTriangleRight, .linkTriangleLeft, .linkSquareLeft, .linkSquareRight, .linkSquareCenter, .linkTriangleCenter, .linkCircleLeft, .linkCircleRight, .linkCircleCenter")
    .filter(function(d) { return d.source.shape === 'rect' || d.target.shape === 'rect'; })
    .style("display", isVisible ? "none" : "inline");  
}
window.toggleProteinVisibility = toggleProteinVisibility;

// Toggle function to hide/show protein-related elements
function filterEdges(edgeThreshold) {
  console.log("filtering edges inside d3graphscript");
  edgeThreshold = parseFloat(edgeThreshold);

  // first make everything visible
  toggleProteinVisibility(true);

  // proteins to keep
  var proteinsToKeep = new Set();

  // Toggle links associated only with protein nodes (circles are nucleotides)
  // choose which ones to hide
  svg.selectAll(".link")
    .filter(function(d) {
      if (d.my_type === "pair" || d.my_type === "backbone"){ 
        return false; // false means show // do not filter backbone or pairs
      } 

      if(d.distance_3d > edgeThreshold){
        console.log("Threshold for: ");
        console.log(d);
        return true;
      }
      // keep the residues that should be shown
      proteinsToKeep.add(d.source.rnaprodb_id);
      proteinsToKeep.add(d.target.rnaprodb_id);
      return false; // false means show
    })
    .style("display", "none");

  svg.selectAll('g.node[shape_class="rect"]')
    .filter(function(d) {
      // console.log(d);
      if(proteinsToKeep.has(d.rnaprodb_id)){
        return false; // false means show
      }
      return true;
    })
    .style("display", "none");

  // // Toggle associated decorative elements like circles, triangles, and squares on edges
  svg.selectAll(".waterMediatedCircle, .linkTriangleRight, .linkTriangleLeft, .linkSquareLeft, .linkSquareRight, .linkSquareCenter, .linkTriangleCenter, .linkCircleLeft, .linkCircleRight, .linkCircleCenter")
    .filter(function(d) { 
      // false equals show
      if(d.distance_3d <= edgeThreshold){
        return false;
      }
      if (d.my_type === "pair" || d.my_type === "backbone"){
        return false;
      }
      // true equals hide
      return true;
    })
    .style("display", "none");  
}
window.filterEdges = filterEdges;

function rotateGraph(degrees) {
  // Update the current rotation in transformState
  transformState.rotation = degrees % 360;
  console.log("New rotation is:", transformState.rotation);

  // Reapply the transformation with the updated rotation for the entire graph
  root.attr('transform',
    'translate(' + transformState.translateX + ',' + transformState.translateY + ') ' +
    'scale(' + transformState.scale + ') ' +
    'rotate(' + transformState.rotation + ')'
  );

  // Rotate the nodes and their associated text
  d3.selectAll('g.node').each(function(d) {
    const nodeGroup = d3.select(this);

    // Apply the translation to move the node group to its position
    nodeGroup.attr('transform', 'translate(' + d.x + ',' + d.y + ')');

    // Handle rotation for text labels separately
    const textElement = nodeGroup.select('text');

    if (d.shape === 'circle') {
      // Rotate text around the node for circles
      textElement.attr('transform', 'rotate(' + -transformState.rotation + ')');
    } else if (d.shape === 'rect') {
      // Apply rotation logic for squares (rect)
      const size = d.node_size || 0;
      const offsetX = size / 2;
      const offsetY = size / 2;

      // Rotate text around the center of the square
      textElement.attr('transform',
        'translate(' + offsetX + ',' + offsetY + ') ' +
        'rotate(' + -transformState.rotation + ') ' +
        'translate(' + -offsetX + ',' + -offsetY + ')'
      );
    }
  });
}
window.rotateGraph = rotateGraph;

function reflectGraph(axis) {
  if (axis !== 'x' && axis !== 'y') {
      console.error('Invalid axis. Use "x" or "y".');
      return;
  }

  // Reflect nodes by updating their x or y coordinate to its negative value
  graph.nodes.forEach(function(d) {
      if (axis === 'x') {
          d.y = -d.y; // Reflect across x-axis
      } else if (axis === 'y') {
          d.x = -d.x; // Reflect across y-axis
      }
  });

  // Reapply the transformations to nodes
  d3.selectAll('g.node')
      .attr('transform', function(d) {
          return 'translate(' + d.x + ',' + d.y + ')';
      });

  // Update link positions accordingly
  link.attr("x1", function(d) { return d.source.x; })
      .attr("y1", function(d) { return d.source.y; })
      .attr("x2", function(d) { return d.target.x; })
      .attr("y2", function(d) { return d.target.y; });

  // Update decorations (arrows, squares, circles, etc.) linked to the links
  updateLinkDecorations();

  // Use D3's zoom behavior to automatically fit the graph within view
  const bounds = root.node().getBBox();
  const parent = svg.node().parentElement;
  const fullWidth = parent.clientWidth || parent.parentNode.clientWidth;
  const fullHeight = parent.clientHeight || parent.parentNode.clientHeight;

  // Calculate the scale and translation to fit the bounding box within the view
  const width = bounds.width;
  const height = bounds.height;
  const midX = bounds.x + width / 2;
  const midY = bounds.y + height / 2;

  if (width > 0 && height > 0) {
    const scale = 0.85 / Math.max(width / fullWidth, height / fullHeight);
    const translate = [
      fullWidth / 2 - scale * midX,
      fullHeight / 2 - scale * midY
    ];

    // Apply the zoom transformation
    root.transition()
        .duration(750)
        .attr('transform', `translate(${translate}) scale(${scale})`);
  }
}

window.reflectGraph = reflectGraph;



// Helper function to update link decorations (arrows, squares, circles, etc.)
function updateLinkDecorations() {
  linkTriangleRight.attr("transform", function(d) {
      let dx = d.target.x - d.source.x;
      let dy = d.target.y - d.source.y;
      const angle = (Math.atan2(dy, dx) * (180 / Math.PI) - 90);
      return `translate(${(d.source.x + d.target.x) / 2 + dx / 8}, ${(d.source.y + d.target.y) / 2 + dy / 8}) rotate(${angle})`;
  });

  linkTriangleLeft.attr("transform", function(d) {
      let dx = d.target.x - d.source.x;
      let dy = d.target.y - d.source.y;
      const angle = (Math.atan2(dy, dx) * (180 / Math.PI) - 90);
      return `translate(${(d.source.x + d.target.x) / 2 - dx / 8}, ${(d.source.y + d.target.y) / 2 - dy / 8}) rotate(${angle})`;
  });

  linkTriangleCenter.attr("transform", function(d) {
      let dx = d.target.x - d.source.x;
      let dy = d.target.y - d.source.y;
      const angle = (Math.atan2(dy, dx) * (180 / Math.PI) - 90);
      return `translate(${(d.source.x + d.target.x) / 2}, ${(d.source.y + d.target.y) / 2}) rotate(${angle})`;
  });

  linkSquareLeft.attr("transform", function(d) {
      let dx = d.target.x - d.source.x;
      let dy = d.target.y - d.source.y;
      const angle = (Math.atan2(dy, dx) * (180 / Math.PI));
      return `translate(${(d.source.x + d.target.x) / 2 - dx / 8}, ${(d.source.y + d.target.y) / 2 - dy / 8}) rotate(${angle})`;
  });

  linkSquareRight.attr("transform", function(d) {
      let dx = d.target.x - d.source.x;
      let dy = d.target.y - d.source.y;
      const angle = (Math.atan2(dy, dx) * (180 / Math.PI) - 90);
      return `translate(${(d.source.x + d.target.x) / 2 + dx / 8}, ${(d.source.y + d.target.y) / 2 + dy / 8}) rotate(${angle})`;
  });

  linkSquareCenter.attr("transform", function(d) {
      let dx = d.target.x - d.source.x;
      let dy = d.target.y - d.source.y;
      const angle = (Math.atan2(dy, dx) * (180 / Math.PI) - 90);
      return `translate(${(d.source.x + d.target.x) / 2}, ${(d.source.y + d.target.y) / 2}) rotate(${angle})`;
  });

  linkCircleLeft.attr("transform", function(d) {
      let dx = d.target.x - d.source.x;
      let dy = d.target.y - d.source.y;
      const angle = (Math.atan2(dy, dx) * (180 / Math.PI));
      return `translate(${(d.source.x + d.target.x) / 2 - dx / 8}, ${(d.source.y + d.target.y) / 2 - dy / 8}) rotate(${angle})`;
  });

  linkCircleCenter.attr("transform", function(d) {
      let dx = d.target.x - d.source.x;
      let dy = d.target.y - d.source.y;
      const angle = (Math.atan2(dy, dx) * (180 / Math.PI) - 90);
      return `translate(${(d.source.x + d.target.x) / 2}, ${(d.source.y + d.target.y) / 2}) rotate(${angle})`;
  });

  linkCircleRight.attr("transform", function(d) {
      let dx = d.target.x - d.source.x;
      let dy = d.target.y - d.source.y;
      return `translate(${(d.source.x + d.target.x) / 2 + dx / 8}, ${(d.source.y + d.target.y) / 2 + dy / 8})`;
  });

  waterMediatedCircle.attr("transform", function(d) {
      let dx = d.target.x - d.source.x;
      let dy = d.target.y - d.source.y;
      const angle = (Math.atan2(dy, dx) * (180 / Math.PI) - 90);
      return `translate(${(d.source.x + d.target.x) / 2}, ${(d.source.y + d.target.y) / 2}) rotate(${angle})`;
  });
}







function toggleHBondsColor() {
  var newColor = "red";
  const isChecked = document.getElementById("toggleHBondsCheckbox").checked;

  console.log("Checkbox is checked:", isChecked);

  // Select all link elements and update their color
  var links = svg.selectAll(".link")
      .each(function(d) {
          // console.log("Current color:", d3.select(this).style("stroke"));
      })
      .style("stroke", function(d) {
          if (isChecked && d.my_type === "protein_rna_hbond") {
              return newColor;  // Set to new color if the condition is met
          } else {
              return d.color;  // Revert to original color otherwise
          }
      });
  console.log("Colors updated based on checkbox state.");
}



document.getElementById("toggleHBondsCheckbox").addEventListener("change", toggleHBondsColor);
      toggleHBondsColor();
      // zoomFit(0);

// LOGIC TO OPTIMIZE PROTEIN POSITIONS
graph.nodes.forEach(function(d) {
  if (d.shape === 'circle') {
      d.fixed = true;
  } else {
      d.fixed = false;  // Proteins can move
  }
});

setProteinOpacity() // set protein node edge opacity based on Centroid distance distance_3d
// Start the simulation for 2 seconds

force.start();
setTimeout(function() {
    force.stop();  // Stop the simulation after 2 seconds

    // Re-fix all nodes after simulation stops
    graph.nodes.forEach(function(d) {
        d.fixed = true;
    });
}, 2000);


}
