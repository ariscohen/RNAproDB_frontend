var multiple_select = [];
var prev_single_select;

function d3graphscript(config = {
    // Default values
    width: 800,
    height: 600,
    charge: -250,
    distance: 0,
    directed: false,
    collision: 0.5,
    graph: null,
    }) {
  
  //Constants for the SVG
  var width = config.width;
  var height = config.height;
  
  // Set the graph
  var graph = config.graph;

  //Set up the colour scale
  var color = d3.scale.category20();
  
  var force = d3.layout.force()
    .charge(config.charge)
    .linkDistance((d) => d.edge_distance || config.distance)
    //.linkDistance((d) => config.distance > 0 ? config.distance : d.edge_weight)
    .size([width, height])
    .friction(0.8); // added friction, this control the spread-outness
  
  var isForcefieldActive = true;
  const forcefieldButton = document.getElementById("forcefieldButton");
  
  forcefieldButton.addEventListener("click", function() {
    // Toggle the value of the global variable
    isForcefieldActive = !isForcefieldActive;
    if(isForcefieldActive){ //if force field is active, make sure none of the nodes are fixed!
      d3.selectAll('g.node[shape_class="circle"]').each(function(e) {e.fixed=false});
      d3.selectAll('g.node[shape_class="rect"]').each(function(e) {e.fixed=false});
      force.start()
    }
    else{ // if force field inactive, set every node as fixed!
      d3.selectAll('g.node[shape_class="circle"]').each(function(e) {e.fixed=true});
      d3.selectAll('g.node[shape_class="rect"]').each(function(e) {e.fixed=true});
    }
  });
  
  // DRAGGING START
  function dragstarted(d) {
    if(isForcefieldActive){
      force.start()
    }
    d3.event.sourceEvent.stopPropagation();
    d3.select(this).classed("dragging", true);
  }
  
  function dragged(d) {
    d3.select(this).attr("cx", d.x = d3.event.x).attr("cy", d.y = d3.event.y);
    d.fx = d3.event.x;
    d.fy = d3.event.y;
  }
  
  function dragended(d) {
    force.stop() //stop movement after dragging ends
    d3.select(this).classed("dragging", false);
  }
  
  var drag = force.drag()
    .origin(function(d) { return d; })
    .on("dragstart", dragstarted)
    .on("drag", dragged)
    .on("dragend", dragended);
  
  // DRAGGING STOP
  
  //Append a SVG to the body of the html page. Assign this SVG as an object to svg
  d3.select("svg").remove();
  var svg = d3.select("#right_column").append("svg")
    .attr("width", width)
    .attr("height", height)
    .call(d3.behavior.zoom().on("zoom", function () { svg.attr("transform", "translate(" + d3.event.translate + ")" + " scale(" + d3.event.scale + ")") }))
    .on("dblclick.zoom", null)
    .append("g")
    // .attr("id", "interactive-explorer")
  
  //.on("dblclick", threshold); // EXPLODE ALL CONNECTED POINTS
  
  // parse the graph passed into this function
  // graphRec = JSON.parse(graph);
  // graph = graphRec;

  //Creates the graph data structure out of the json data
  force.nodes(graph.nodes)
    .links(graph.links)
    .start();
  // console.log(graph.nodes)
  // Create all the line svgs but without locations yet
  var link = svg.selectAll(".link")
    .data(graph.links)
    .enter().append("line")
    .attr("class", function(d){
      if(d.my_type == "pair")
      {
        return "link-dashed";
      }
      else{
        return "link";
      }
    })
    .attr('marker-start', function(d){ return 'url(#marker_' + d.marker_start + ')' })
    .attr("marker-end", function(d) {
      if (config.directed) {return 'url(#marker_' + d.marker_end + ')' }})
    .style("stroke-width", function(d) {return d.edge_width;})          // LINK-WIDTH
    .style("stroke", function(d) {return d.color;})                     // EDGE-COLORS
  //  .style("stroke-width", 1); // WIDTH OF THE LINKS
  ;
  
  // ADD TEXT ON THE EDGES (PART 1/2)
   var linkText = svg.selectAll(".link-text")
     .data(graph.links)
     .enter().append("text")
     .attr("class", "link-text")
     .attr("font-size", function(d) {return d.label_fontsize + "px";})
     .style("fill", function(d) {return d.label_color;})
     .style("font-family", "Arial")
     //.attr("transform", "rotate(90)")
     .text(function(d) { return d.label; });
  
  //Do the same with the circles for the nodes
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
  
  // Create Circles for nodes with shape_class of "circle"
  d3.selectAll('g.node[shape_class="circle"]').append("circle")
  .attr("r", function(d) { return d.node_size; })					// NODE SIZE
  .attr("height", window.nodeHeight)
  .style("fill", function(d) {return d.node_color;})				// NODE-COLOR
  .style("opacity", function(d) {return d.node_opacity;}) 	    // NODE-OPACITY
  .style("stroke-width", function(d) {return d.node_size_edge;})	// NODE-EDGE-SIZE
  .style("stroke", function(d) {return d.node_color_edge;})		// NODE-COLOR-EDGE
  //  .style("stroke", '#000')										// NODE-EDGE-COLOR (all black));
  
  // Add text to Circles
  d3.selectAll('g.node[shape_class="circle"]').append("text")
  .attr("dx", -8) // negative is left
  .attr("dy", 9)
  .text(function(d) {return d.node_name}) // NODE-TEXT
  .style("font-size", function(d) {return d.node_fontsize + "px";}) // set font size equal to node edge size
  .style("fill", function(d) {return d.node_fontcolor;}) // set the text fill color to the same as node color
  .style("font-family", "monospace");
  
  // Create Squares for nodes with shape_class of "squares"
  d3.selectAll('g.node[shape_class="rect"]').append("rect")
    .attr("width", function(d) { return d.node_size; })					// NODE SIZE
    .attr("height", function(d) { return d.node_size; })					// NODE SIZE
    .style("fill", function(d) {return d.node_color;})				// NODE-COLOR
    .style("opacity", function(d) {return d.node_opacity;}) 	    // NODE-OPACITY
    .style("stroke-width", function(d) {return d.node_size_edge;})	// NODE-EDGE-SIZE
    .style("stroke", function(d) {return d.node_color_edge;})		// NODE-COLOR-EDGE
  //  .style("stroke", '#000')										// NODE-EDGE-COLOR (all black)
  
  // Add text to Squares
  d3.selectAll('g.node[shape_class="rect"]').append("text")
  .attr("dx", 10)
  .attr("dy", 20)
  .text(function(d) {return d.node_name}) // NODE-TEXT
  .style("font-size", function(d) {return d.node_fontsize + "px";}) // set font size equal to node edge size
  .style("fill", function(d) {return d.node_fontcolor;}) // set the text fill color to the same as node color
  .style("font-family", "monospace");
  
  
  //   // Text in nodes
  //   node.append("text")
  //     .attr("dx", {{10}})
  //     .attr("dy", 10)
  //     .text(function(d) {return d.node_name}) // NODE-TEXT
  //     .style("font-size", function(d) {return d.node_fontsize + "px";}) // set font size equal to node edge size
  // 	.style("fill", function(d) {return d.node_fontcolor;}) // set the text fill color to the same as node color
  // 	.style("font-family", "monospace");
  // //  .style("stroke", "gray");
  
  let showInHover = ["node_tooltip"]; // Tooltip
  node.append("title")
      .text((d) => Object.keys(d)
          .filter((key) => showInHover.indexOf(key) !== -1)
          .map((key) => `${d[key]}`)
          .join('\n')
      )
  var root = d3.select('g')// any svg.select(...) that has a single node like a container group by #id
  
  var zoom = d3.behavior
  .zoom()
  .scaleExtent([1/4, 4])
  .on('zoom.zoom', function () {
    // console.trace("zoom", d3.event.translate, d3.event.scale);
    root.attr('transform',
      'translate(' + d3.event.translate + ')'
      +   'scale(' + d3.event.scale     + ')');
  })
  ;
  
  function zoomFit(transitionDuration) {
    var bounds = svg.node().getBBox();
    // console.log(bounds)
    var parent = svg.node().parentElement;
    var fullWidth  = parent.clientWidth  || parent.parentNode.clientWidth,
        fullHeight = parent.clientHeight || parent.parentNode.clientHeight;
  
    // console.log(fullWidth, fullHeight)
  
    var width  = bounds.width,
        height = bounds.height;
    var midX = bounds.x + width / 2,
        midY = bounds.y + height / 2;
    if (width == 0 || height == 0) return; // nothing to fit
    var scale = 0.85 / Math.max(width / fullWidth, height / fullHeight);
    var translate = [
        fullWidth  / 2 - scale * midX,
        fullHeight / 2 - scale * midY
    ];
  
    //console.trace("zoomFit", translate, scale);
  
    svg
        .transition()
        .duration(transitionDuration || 0) // milliseconds
        .call(zoom.translate(translate).scale(scale).event);
  }
  
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
    // tick();
  }

  window.handleFlipX = handleFlipX;
  window.handleFlipY = handleFlipY;
  window.updateGraph = updateGraph;


  // console.log(node)
  //Now we are giving the SVGs co-ordinates - the force layout is generating the co-ordinates which this code is using to update the attributes of the SVG elements
  //
  var timetostopautozoom = 0
  var zoomstopthreshold = 100 // parameter, may not be optimal !!
  force.on("tick", function() {
    link.attr("x1", function(d) { return d.source.x; })
      .attr("y1", function(d) { return d.source.y; })
      .attr("x2", function(d) { return d.target.x; })
      .attr("y2", function(d) { return d.target.y; });
    d3.selectAll("rect").attr("x", function(d) { return d.x; }) // change this 
      .attr("y", function(d) { return d.y; });
    d3.selectAll("circle").attr("cx", function(d) { return d.x; }) // change this 
      .attr("cy", function(d) { return d.y; });
    d3.selectAll("text").attr("x", function(d) { return d.x; })
      .attr("y", function(d) { return d.y; })
  linkText.attr("x", function(d) { return (d.source.x + d.target.x) / 2; })  // ADD TEXT ON THE EDGES (PART 2/2)
      .attr("y", function(d) { return (d.source.y + d.target.y) / 2; })
      .attr("text-anchor", "middle");
      ;
  
    node.each(collide(config.collision)); //COLLISION DETECTION. High means a big fight to get untouchable nodes (default=0.5)
  
    timetostopautozoom += 1
    if (timetostopautozoom < zoomstopthreshold) zoomFit(0);
  });
  
  // --------- MARKER -----------
  
  var data_marker = [
    { id: 0, name: 'circle', path: 'M 0, 0  m -5, 0  a 5,5 0 1,0 10,0  a 5,5 0 1,0 -10,0', viewbox: '-6 -6 12 12' }
  , { id: 1, name: 'square', path: 'M 0,0 m -5,-5 L 5,-5 L 5,5 L -5,5 Z', viewbox: '-5 -5 10 10' }
  , { id: 2, name: 'arrow', path: 'M 0,0 m -5,-5 L 5,0 L -5,5 Z', viewbox: '-5 -5 10 10' }
  , { id: 3, name: 'stub', path: 'M 0,0 m -1,-5 L 1,-5 L 1,5 L -1,5 Z', viewbox: '-1 -5 2 10' }
  ]
  
  //console.log(JSON.stringify(link))
  
  svg.append("defs").selectAll("marker")
    .data(data_marker)
    .enter()
    .append('svg:marker')
      .attr('id', function(d){ return 'marker_' + d.name})
      .attr('markerHeight', 14) //ARI modified
      .attr('markerWidth', 17) //ARI modified
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
        .style("fill", '#605f5f')                              // Marker color
        .style("stroke", '#605f5f')                            // Marker edge-color
        .style("opacity", 1)                                // Marker opacity
        .style("stroke-width", 1);                             // Marker edge thickness
  
  // --------- END MARKER -----------
  
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
    var curNode = select_node(idToFind);
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
    .style("stroke-width", function(d) {return d.edge_width;})
    .attr("r", function(d) { return d.node_size; })
    ;
    d3.selectAll(".node")
    .select("rect")
    .style("fill", function(d) {return d.node_color;})
    .style("opacity", function(d) {return d.node_opacity;})
    .style("stroke", function(d) {return d.node_color_edge;})
    .style("stroke-width", function(d) {return d.edge_width;})
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
  function add_node_to_subgraph(chain, num){
    let textBox = document.getElementById("subgraph-textbox");
    if (textBox) {  // Check if the textBox is not null
        textBox.value += `${chain}:${num},`;
    }
  }

    // COLOR ON CLICK
  function color_on_click() {
    // Give the original color back for all nodes!
    if (!d3.event.shiftKey)  reset_node_colors();
    //console.log(d3.select(this).select())

    var name_split = d3.select(this)[0][0]["__data__"]["name"].split(":");
    var chain = name_split[0];
    var residue = name_split[2];
    
    console.log(chain);
    console.log(residue);

    add_node_to_subgraph(chain, residue);

    var nodeIdToFind = d3.select(this)[0][0]["__data__"]["name"]; // replace this with the ID you want to search for
    var escapedId = nodeIdToFind.replace(/:/g, "\\:");
    var foundNode = d3.select("#" + escapedId);

    // console.log(chain);
    // console.log(residue);
    var selectionString = residue+":" + chain;
    // console.log(selectionString);
    if (d3.event.shiftKey){
        if (multiple_select.includes(selectionString) ){
            // console.log("here")
            d3.select(this).select("circle")
                .style("fill", function(d) {return d.node_color;})
                .style("opacity", function(d) {return d.node_opacity;})
                .style("stroke", function(d) {return d.node_color_edge;})
                .style("stroke-width", function(d) {return d.edge_width;})
                .attr("r", function(d) { return d.node_size; })
            ;
            d3.select(this).select("rect")
                .style("fill", function(d) {return d.node_color;})
                .style("opacity", function(d) {return d.node_opacity;})
                .style("stroke", function(d) {return d.node_color_edge;})
                .style("stroke-width", function(d) {return d.edge_width;})
            ;
            index = multiple_select.indexOf(selectionString);
            multiple_select.splice(index, 1);
            parent.zoomOnClick(multiple_select);
            return;
        }
    
        multiple_select.push(selectionString);
        parent.zoomOnClick(multiple_select);
    }
    else{
        multiple_select = [];
        try{ // try catch in the case the graph isn't there!
          parent.zoomOnClick(selectionString);  // zooms in on Residue in NGLViewer! 
        }
        catch(error){
          console.error(error);
        }
    }
    // stage_nm1.getComponentsByName("my_structure").autoView()
  
        
    if (!d3.event.shiftKey) {
        if (prev_single_select == selectionString) {
                reset_node_colors();
                prev_single_select = null;
                parent.resetView();
                return;
        }
        else{
            prev_single_select = selectionString;
        }

    }
    
    // Set the color on click for circles
    d3.select(this).select("circle")
    // .style("fill", {{ CLICK_FILL }})
    .style("fill", "yellow")
    // .style("stroke", "{{ CLICK_STROKE }}")
    // .style("stroke-width", {{ CLICK_STROKEW }})
    .attr("r", function(d) { return d.node_size*1.5; })
    // .attr("r", function(d) { return d.node_size*1});

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
    link.style("stroke-width", function(d) {return d.edge_width;});           // LINK-WIDTH AFTER BREAKING WITH SLIDER
    //link.style('marker-start', function(d){ return 'url(#marker_' + d.marker_start  + ')' })
  link.style("marker-end", function(d) {                                    // Include the markers.
    if (config.directed) {return 'url(#marker_' + d.marker_end + ')' }})
    link.style("stroke", function(d) {return d.color;});                      // EDGE-COLOR AFTER BREAKING WITH SLIDER
  
    node = node.data(graph.nodes);
    node.enter().insert("circle", ".cursor").attr("class", "node").attr("r", 5).call(force.drag);
    force.start();
  }

  var originalLinkColors = {};

function toggleHBondsColor() {
    var newColor = "red"; 
    const isChecked = document.getElementById("toggleHBondsCheckbox").checked;

    graph.links.forEach(function(link, i) {
        if (isChecked) {
            if (link.my_type === "protein_rna_hbond" && link.color !== newColor) {
                originalLinkColors[i] = link.color;
                link.color = newColor;
            }
        } else {
            if (link.my_type === "protein_rna_hbond" && originalLinkColors[i]) {
                link.color = originalLinkColors[i];
            }
        }
    });

    restart();
}
document.getElementById("toggleHBondsCheckbox").addEventListener("change", toggleHBondsColor);
}
