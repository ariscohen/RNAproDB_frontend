function static_d3graphscript(config = {
    // Default values
    width: 800,
    height: 600,
    graph: null,
  }) {
    //Constants for the SVG
    var width = config.width;
    var height = config.height;
    
    // Set the graph
    var graph = config.graph;
  
    //Set up the colour scale
    var color = d3.scale.category20();
  
    //Remove existing SVG if it exists
    d3.select("svg").remove();
  
    var isForcefieldActive = true;
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
    d3.select("svg").remove();
    var svg = d3.select("#right_column").append("svg")
        .attr("width", width)
        .attr("height", height)
        .call(d3.behavior.zoom().on("zoom", function () { svg.attr("transform", "translate(" + d3.event.translate + ")" + " scale(" + d3.event.scale + ")") }))
        .on("dblclick.zoom", null)
        .append("g")

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
    graph.nodes.forEach(function(d) {
        d.fixed = true; // Fix the nodes position
        d.x = parseFloat(d.x);
        d.y = parseFloat(d.y);
    });

    force.start(); // Start the simulation with nodes fixed

    
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


    //Create links
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
      .style("stroke", "#999")
      .style("stroke-opacity", 0.6)
      .style("stroke-width", function(d) {return d.edge_width;})          // LINK-WIDTH
      .style("stroke", function(d) {return d.color;})                     // EDGE-COLORS
    //   .attr("x1", function(d) { console.log(d); return graph.nodes[d.source].x; })
    //   .attr("y1", function(d) { return graph.nodes[d.source].y; })
    //   .attr("x2", function(d) { return graph.nodes[d.target].x; })
    //   .attr("y2", function(d) { return graph.nodes[d.target].y; });
      .attr("x1", function(d) {return d.source.x; }) // these are apparently required for the force field to work #TODO
      .attr("y1", function(d) {return d.source.y; })
      .attr("x2", function(d) {return d.target.x; })
      .attr("y2", function(d) {return d.target.y; });
  
    
    // // ADD TEXT ON THE EDGES (PART 1/2)
    //  var linkText = svg.selectAll(".link-text")
    //    .data(graph.links)
    //    .enter().append("text")
    //    .attr("class", "link-text")
    //    .attr("font-size", function(d) {return d.label_fontsize + "px";})
    //    .style("fill", function(d) {return d.label_color;})
    //    .style("font-family", "Arial")
    //    //.attr("transform", "rotate(90)")
    //    .text(function(d) { return d.label; });
    //   //  .attr("x1", function(d) { console.log(d); return d.source.x; }) // HI ARI TRYING THESE
    //   //  .attr("y1", function(d) { console.log(d); return d.source.y; })
    //   //  .attr("x2", function(d) { console.log(d); return d.target.x; })
    //   //  .attr("y2", function(d) { console.log(d); return d.target.y; });
    
    // //Create nodes
    // var node = svg.selectAll(".node")
    //   .data(graph.nodes)
    //   .enter().append("circle")
    //   .attr("class", "node")
    //   .attr("r", 5) // Set the node radius here
    //   .attr("shape_class", function(d) {return d.shape;})
    //   .call(drag)
    //   .style("fill", function(d) { return color(d.group); }); // or use any other property for color

    // //Do the same with the circles for the nodes
    var node = svg.selectAll(".node")
      .data(graph.nodes)
      .enter().append("g")
      .attr("class", "node")
      .attr("id", function(d) {var spl = d.name.split(":"); return `${spl[0]}:${spl[1]}:${spl[2]}`;})
      .attr("shape_class", function(d) {return d.shape;})
      .call(drag)
    //   .on('dblclick', connectedNodes); // HIGHLIGHT ON/OFF
    // console.log(node);
    // node.on('click', color_on_click); // ON CLICK HANDLER
    
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
    
    // Create Circles for nodes with shape_class of "squares"
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







    //   var hasZoomFit = false; // Flag to ensure zoomFit is only called once
    var timetostopautozoom = 0
    var zoomstopthreshold = 100 // parameter, may not be optimal !!
      function tick(e) {
        // Update link positions
        link.attr("x1", function(d) { return d.source.x; })
            .attr("y1", function(d) { return d.source.y; })
            .attr("x2", function(d) { return d.target.x; })
            .attr("y2", function(d) { return d.target.y; });
    
        // Update node positions
        node.attr("cx", function(d) { return d.x; })
            .attr("cy", function(d) { return d.y; });
        d3.selectAll("circle").attr("cx", function(d) { return d.x; }) // change this 
            .attr("cy", function(d) { return d.y; });
        d3.selectAll("text").attr("x", function(d) { return d.x; })
            .attr("y", function(d) { return d.y; })
        // linkText.attr("x", function(d) { return (d.source.x + d.target.x) / 2; })  // ADD TEXT ON THE EDGES (PART 2/2)
        //     .attr("y", function(d) { return (d.source.y + d.target.y) / 2; })
        //     .attr("text-anchor", "middle");
        //     ;
        d3.selectAll("rect").attr("x", function(d) { return d.x; }) // change this 
            .attr("y", function(d) { return d.y; });
        node.each(collide(0.5)); //COLLISION DETECTION. High means a big fight to get untouchable nodes (default=0.5)

        timetostopautozoom += 1
        if (timetostopautozoom < zoomstopthreshold) zoomFit(0);
      }

        // Call zoomFit once when the simulation cools down a bit
        // For example, at the half-way point of the simulation
        // if (e.alpha < 0.05 && !hasZoomFit) {
        //   zoomFit(500); // Call zoomFit with a transition duration
        //   hasZoomFit = true; // Set the flag to true
        // }
    //   }
      let showInHover = ["node_tooltip"]; // Tooltip
      node.append("title")
      .text((d) => Object.keys(d)
          .filter((key) => showInHover.indexOf(key) !== -1)
          .map((key) => `${d[key]}`)
          .join('\n')
      )
      zoomFit(0);
  }