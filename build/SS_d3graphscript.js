function initializeD3Graph() {
    var svgContainer = document.getElementById('ss-svg-container');
    if (!svgContainer) {
      console.warn('SVG container not available');
      return;
    }
    d3.json("./1ivs_SSgraph.json", function(error, ssgraph) {
        if (error) throw error;

        var links = ssgraph.links.map(function(d) { return Object.create(d); });
        var nodes = ssgraph.nodes.map(function(d) {
        return {
            id: d.id,
            type: d.id.split(":")[0].trim(),
            x: +d.x,
            y: +d.y,
            incomingEdges: 0
        };
        });

        links.forEach(function(link) {
        nodes.find(function(node) { return node.id === link.target; }).incomingEdges++;
        });

        var maxIncomingEdges = d3.max(nodes, function(d) { return d.incomingEdges; });

        var nodeSizeProtein = 10;
        var nodeSizeOther = 30;
        var nodeSizeScale = d3.scale.linear()
        .domain([0, maxIncomingEdges])
        .range([5, 20]);

        var colorScale = {
        "stems": "#0f0f0f",
        "hairpins": "#AFE1AF",
        "junctions": "#228B22",
        "bulges": "#ffffff",
        "iloops": "#96DED1",
        "ssSegments": "#dddddd"
        };

        var svg = d3.select("#ss-svg-container");

        var minX = d3.min(nodes, function(d) { return d.x; });
        var minY = d3.min(nodes, function(d) { return d.y; });
        var maxX = d3.max(nodes, function(d) { return d.x; });
        var maxY = d3.max(nodes, function(d) { return d.y; });

        var width = maxX - minX + 100;
        var height = maxY - minY + 100;

        svg.attr("width", width)
        .attr("height", height);

        var container = svg.append("g");

        var zoom = d3.behavior.zoom()
        .scaleExtent([0.1, 10])
        .on("zoom", zoomed);

        svg.call(zoom);

        var nonProteinNodes = nodes.filter(function(node) { return node.type !== "protein"; });

        var sslink = container.append("g")
        .selectAll("line")
        .data(links)
        .enter().append("line")
        .attr("class", function(d) {
            var sourceType = nodes.find(function(node) { return node.id === d.source; }).type;
            var targetType = nodes.find(function(node) { return node.id === d.target; }).type;
            if (sourceType !== "protein" && targetType !== "protein") {
            return "ss-link";
            } else {
            return "ss-protein-link";
            }
        })
        .style("stroke-width", function(d) {
            var sourceType = nodes.find(function(node) { return node.id === d.source; }).type;
            var targetType = nodes.find(function(node) { return node.id === d.target; }).type;
            if (sourceType !== "protein" && targetType !== "protein") {
            return "4px";
            } else {
            return "1px";
            }
        });

        var ssnode = container.append("g")
        .selectAll(".node")
        .data(nonProteinNodes)
        .enter().append("circle")
        .attr("class", "ss-node")
        .attr("r", nodeSizeOther)
        .attr("cx", function(d) { return d.x - minX + 50; })
        .attr("cy", function(d) { return d.y - minY + 50; })
        .style("fill", function(d) { return colorScale[d.type]; })
        .style("stroke-width", "2px")
        .call(d3.behavior.drag()
            .origin(function(d) { return d; })
            .on("dragstart", dragstarted)
            .on("drag", dragged)
            .on("dragend", dragended));

        var proteinNodes = nodes.filter(function(node) { return node.type === "protein"; });

        var proteinNode = container.append("g")
        .selectAll(".protein")
        .data(proteinNodes)
        .enter().append("rect")
        .attr("class", "ss-protein")
        .attr("width", nodeSizeProtein)
        .attr("height", nodeSizeProtein)
        .attr("x", function(d) { return d.x - minX + 50 - nodeSizeProtein / 2; })
        .attr("y", function(d) { return d.y - minY + 50 - nodeSizeProtein / 2; })
        .style("fill", "#ff7f0e")
        .style("stroke", "#000")
        .style("stroke-width", "2px")
        .call(d3.behavior.drag()
            .origin(function(d) { return d; })
            .on("dragstart", dragstarted)
            .on("drag", draggedProtein)
            .on("dragend", dragended))
        .on("mouseover", function() {
            d3.select(this)
            .style("fill", "#ffcc80")
            .style("stroke-width", "4px");
        })
        .on("mouseout", function() {
            d3.select(this)
            .style("fill", "#ff7f0e")
            .style("stroke-width", "2px");
        });

        ssnode.append("title")
        .text(function(d) { return d.id; });

        var nodeLabels = container.append("g")
        .selectAll(".node-label")
        .data(nonProteinNodes)
        .enter().append("text")
        .attr("class", "ss-node-label")
        .attr("x", function(d) { return d.x - minX + 50; })
        .attr("y", function(d) { return d.y - minY + 50; })
        .attr("dy", -40)  // Adjust the position of the labels above the nodes
        .attr("text-anchor", "middle")  // Center the text horizontally
        .attr('dominant-baseline', 'text-after-edge')
        .style("font-size", "20px")
        .text(function(d) { return d.id.split(":")[0].trim() + " " + d.id.split(":")[1].trim(); });

        ssnode.on("mouseover", function() {
            d3.select(this)
            .style("fill", "#ffcc80")
            .style("stroke-width", "4px")
            .attr("r", 40);
        })
        .on("mouseout", function(d) {
            d3.select(this)
            .style("fill", function(d) { return colorScale[d.type]; })
            .style("stroke-width", "2px")
            .attr("r", 30);
        });

        proteinNode.append("title")
        .text(function(d) { return d.id; });

        proteinNode.append("text")
        .attr("class", "ss-node-label")
        .attr("x", function(d) { return d.x - minX + 62; })
        .attr("y", function(d) { return d.y - minY + 50; })
        .text(function(d) { return d.id; });

        sslink
        .attr("x1", function(d) { return getNodeById(d.source).x - minX + 50; })
        .attr("y1", function(d) { return getNodeById(d.source).y - minY + 50; })
        .attr("x2", function(d) { return getNodeById(d.target).x - minX + 50; })
        .attr("y2", function(d) { return getNodeById(d.target).y - minY + 50; });

        function zoomed() {
        container.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
        }

        function getNodeById(id) {
        return nodes.find(function(node) { return node.id === id; });
        }

        function dragstarted(d) {
        d3.event.sourceEvent.stopPropagation();
        d3.select(this).classed("dragging", true);
        }

        function dragged(d) {
        d.x = d3.event.x;
        d.y = d3.event.y;
        d3.select(this)
            .attr("cx", d.x - minX + 50)
            .attr("cy", d.y - minY + 50);

        sslink
            .filter(function(l) { return l.source === d.id || l.target === d.id; })
            .attr("x1", function(l) { return getNodeById(l.source).x - minX + 50; })
            .attr("y1", function(l) { return getNodeById(l.source).y - minY + 50; })
            .attr("x2", function(l) { return getNodeById(l.target).x - minX + 50; })
            .attr("y2", function(l) { return getNodeById(l.target).y - minY + 50; });

        nodeLabels
            .filter(function(l) { return l.id === d.id; })
            .attr("x", d.x - minX + 50)
            .attr("y", d.y - minY + 50 - 10);
        }

        function draggedProtein(d) {
        d.x = d3.event.x;
        d.y = d3.event.y;
        d3.select(this)
            .attr("x", d.x - minX + 50 - nodeSizeProtein / 2)
            .attr("y", d.y - minY + 50 - nodeSizeProtein / 2);

        sslink
            .filter(function(l) { return l.source === d.id || l.target === d.id; })
            .attr("x1", function(l) { return getNodeById(l.source).x - minX + 50; })
            .attr("y1", function(l) { return getNodeById(l.source).y - minY + 50; })
            .attr("x2", function(l) { return getNodeById(l.target).x - minX + 50; })
            .attr("y2", function(l) { return getNodeById(l.target).y - minY + 50; });
        }

        function dragended(d) {
        d3.select(this).classed("dragging", false);
        }
    });
}

// Check if the SVG container is already available in case the script loads after the container is in place
if (document.getElementById('ss-svg-container')) {
    initializeD3Graph();
  } else {
    // Listen for when the window fully loads all scripts and elements
    window.addEventListener('load', initializeD3Graph);
  }