export default function Docs() {
    return (
        <div className="content-doc text-left">
            <h1 className="text-[#000000] font-bold mt-5 w-full pl-8 pr-8">Documentation</h1>

            <h2 className="text-[#A2A0D3] font-bold mt-5 w-full pl-8 pr-8">Introduction</h2>
            <div className="pl-8 pr-8 w-full">
            <p className="mb-5 mx-auto text-left border-2 border-[#B22222] p-4 text-lg">
                <b className="text-[#A2A0D3]">RNAproDB</b> is a web server and interactive database designed to assist researchers in the structural analysis of RNA-protein complexes.
                <br />
                <b className="text-[#A2A0D3]">RNAproDB</b> provides an interface explorer on every structure page, displaying the nucleic acid structure in 2D along with interacting protein residues.
                <br />
                Users can select various algorithms to map the structure, and subgraphs can be generated based on secondary structure or selection by the user.
            </p>
            </div>
            <img
                src="/rnaprodb/abstract.png"
                alt="RNAproDB abstract"
                className="w-full sm:w-2/3 h-auto rounded-md bg-white/5 shadow-2xl ring-1 ring-gray-200 border-8 border-[#A2A0D3] mb-5 mx-auto block pt-4"
            />

            <h2 className="text-[#A2A0D3] font-bold mt-5 w-full pl-8 pr-8">1. Features</h2>

            <div className="pl-8 pr-8 w-full">
            <p className="mb-5 mx-auto text-left border-2 border-[#B22222] p-4 text-lg">
                Users can input a <b className="text-[#A2A0D3]">PDB identifier</b> on the top navigation bar to access a specific structure (biological assembly 1). Users can also find structures with search keywords and more specific filters in the dedicated search page.
                <br />
                Structures can be uploaded by clicking <b className="text-[#A2A0D3]">Upload</b> on the homepage or the top navigation bar. RNAproDB supports CIF biological assembly files up to 10 MB.
                <br />
                Each structure page provides a <b className="text-[#A2A0D3]">sequence viewer</b>, a <b className="text-[#A2A0D3]">3D structure viewer</b>, an <b className="text-[#A2A0D3]">electrostatics viewer</b>, a <b className="text-[#A2A0D3]">secondary structure selector</b>, and an <b className="text-[#A2A0D3]">interface explorer</b> with relevant structure information.
            </p>
            </div>
            <img
                src="/rnaprodb/nav_search_bar.png"
                alt="Search bar"
                className="w-full sm:w-2/3 h-auto rounded-md bg-white/5 shadow-2xl ring-1 ring-gray-200 border-8 border-[#A2A0D3] mb-5 mx-auto block pt-4"
            />
            
            <h4 className="mt-5 text-[#A2A0D3] font-bold w-full pl-8 pr-8">1.1. Sequence viewer</h4>

            <div className="pl-8 pr-8 w-full">
            <p className="mb-5  mx-auto text-left border-2 border-[#B22222] p-4 text-lg">
                Users can view the sequence of the given RNA-protein complex.
                <br />
                Within the sequence viewer, users can select a specific chain ID using a dropdown button.
                <br />
                Within the sequence, users can select and choose specific residues to generate a subgraph and/or highlight them. Hovering over a residue displays the residue number.
            </p>
            </div>
            <img
                src="/rnaprodb/sequence_viewer.png"
                alt="Sequence Viewer Screenshot"
                className="w-full sm:w-2/3 h-auto rounded-md bg-white/5 shadow-2xl ring-1 ring-gray-200 border-8 border-[#A2A0D3] mb-5 mx-auto block pt-4"
            />

            <h4 className="mt-5 text-[#A2A0D3] font-bold w-full pl-8 pr-8">1.2. Structure viewer</h4>
            <div className="pl-8 pr-8 w-full">
            <p className="mb-5  mx-auto text-left border-2 border-[#B22222] p-4 text-lg">
                Users can view the 3D structure of the complex using the Structure Viewer.
                <br />
                For visual clarity, options to show <b className="text-[#A2A0D3]">solvent molecules</b> and <b className="text-[#A2A0D3]">display cartoon representations</b> are available.
            </p>
            </div>
             <img
                src="/rnaprodb/3d_structure.png"
                alt=" Structure Screenshot"
                className="w-1/3 h-auto rounded-md bg-white/5 shadow-2xl ring-1 ring-grsay-200 border-8 border-[#A2A0D3] mb-5 mx-auto block pt-4"
            />


                       <h4 className="mt-5 text-[#A2A0D3] font-bold w-full pl-8 pr-8">1.3. Interface explorer</h4>
            <div className="pl-8 pr-8 w-full">
            <p className="mb-5  mx-auto text-left border-2 border-[#B22222] p-4 text-lg">
                The interface explorer is a core feature of RNAproDB, allowing users to view estimated 2D mappings of RNA-protein complexes.
                <br />
                Users can choose among three algorithms: projection-based, tertiary structure-aware 2D mapping, and secondary structure-based mapping.
                <br />
                The projection-based algorithm, <b className="text-[#A2A0D3]">Principal Component Analysis (PCA)</b>, calculates centroids to predict coordinates.
                <br />
                The <b className="text-[#A2A0D3]">RNAscape</b> option provides tertiary structure-aware 2D mapping, considering three-dimensional interactions and spatial constraints of RNA molecules.
                <br />
                The <b className="text-[#A2A0D3]">ViennaRNA</b> option offers secondary structure-based mapping.
            </p>
            </div>
             <img
                src="/rnaprodb/interface_explorer.png"
                alt="Interface Explorer Screenshot"
                className="w-full sm:w-2/3 h-auto rounded-md bg-white/5 shadow-2xl ring-1 ring-gray-200 border-8 border-[#A2A0D3] mb-5 mx-auto block pt-4"
            />


            <div className="pl-8 pr-8 w-full">
            <p className="mb-5  mx-auto text-left border-2 border-[#B22222] p-4 text-lg">
                A legend for the graph is available below the graph, other than Leontis-Westhof annotations which are displayed on the right side of the graph.
                <br />
                Hovering over nodes or edges on the graph provides more extensive information on corresponding residues and/or interactions.
            </p>
            </div>
             <img
                src="/rnaprodb/hover.png"
                alt="Legend"
                className="w-full sm:w-2/3 h-auto rounded-md bg-white/5 shadow-2xl ring-1 ring-gray-200 border-8 border-[#A2A0D3] mb-5 mx-auto block pt-4"
            />


            <div className="pl-8 pr-8 w-full">
            <p className="mb-5  mx-auto text-left border-2 border-[#B22222] p-4 text-lg">
                RNAproDB provides various quick options to customize the graph.
                <br />
                The <b className="text-[#A2A0D3]">Relax graph</b> option loosens the graph for a more disassembled view.
                <br />
                <b className="text-[#A2A0D3]">Indicate H-bonds</b> shows existing direct hydrogen bonds in red.
                <br />
                <b className="text-[#A2A0D3]">Hide protein</b> removes protein residues and corresponding interactions from the visualization.
                <br />
                For the ViennaRNA option, there is also an option called <b className="text-[#A2A0D3]">"Indicate tertiary structure"</b> which can be turned off to declutter the secondary structure visualization.
                <br />
                The <b className="text-[#A2A0D3]">Edge threshold</b> slider only displays interactions within a centroid distance specified by the user.
                <br />
                The <b className="text-[#A2A0D3]">Rotate graph</b> slider rotates the structure clockwise by the degrees specified by the user.
                <br />
                The <b className="text-[#A2A0D3]">Reflect X and Reflect Y</b> buttons flip the signs of nodes' X and Y coordinates respectively.
                <br />               
            </p>
            </div>
             <img
                src="/rnaprodb/toggle.png"
                alt="Toggle Screenshot"
                className="w-full sm:w-2/3 h-auto rounded-md bg-white/5 shadow-2xl ring-1 ring-gray-200 border-8 border-[#A2A0D3] mb-5 mx-auto block pt-4"
            />


            <div className="pl-8 pr-8 w-full">
            <p className="mb-5  mx-auto text-left border-2 border-[#B22222] p-4 text-lg">
                By clicking specific residues in the sequence viewer or interface explorer, or by entering a residue and its position, users can generate subgraphs.
                <br />
                Users can click <b className="text-[#A2A0D3]">"Select subgraph"</b> and then proceed to define the region of interest.
                <br />
                Afterwards, clicking <b className="text-[#A2A0D3]">"Generate subgraph"</b> will produce a subraph using the first-order neighbors of the selected nodes.
                <br />
                Once users create a satisfactory graph, they can download it in <b className="text-[#A2A0D3]">PNG</b> or <b className="text-[#A2A0D3]">SVG</b> format using the download button. The download button also provides the raw analyzed data in <b className="text-[#A2A0D3]">JSON</b> format.
            </p>
            </div>
             <img
                src="/rnaprodb/generate_subgraph.png"
                alt="Generate Subgraph"
                className="w-full sm:w-2/3 h-auto rounded-md bg-white/5 shadow-2xl ring-1 ring-gray-200 border-8 border-[#A2A0D3] mb-5 mx-auto block pt-4"
            />

            <h4 className="mt-5 text-[#A2A0D3] font-bold w-full pl-8 pr-8">1.4. Secondary structure selector</h4>
            <div className="pl-8 pr-8 w-full">
            <p className="mb-5  mx-auto text-left border-2 border-[#B22222] p-4 text-lg">
                The Secondary structure selector is a coarse-grained visualization that shows broad secondary structure elements of the structure.
                <br />
                It can be used to quickly find and visualize certain areas of the structure.
                <br />
                Left clicking an element will open the subgraph view in Interface explorer, adding its corresponding nodes. Simply click Generate subgraph to then visualize these nodes and their neighbors.
                <br />
            </p>
            </div>

            <img
                src="/rnaprodb/1asz_ss.png"
                alt="1asz secondary structure selector"
                className="w-full sm:w-2/3 h-auto rounded-md bg-white/5 shadow-2xl ring-1 ring-gray-200 border-8 border-[#A2A0D3] mb-5 mx-auto block pt-4"
            />

            <h4 className="mt-5 text-[#A2A0D3] font-bold w-full pl-8 pr-8">1.5. Electrostatics</h4>
            <div className="pl-8 pr-8 w-full">
            <p className="mb-5  mx-auto text-left border-2 border-[#B22222] p-4 text-lg">
                RNAproDB offers an <b className="text-[#A2A0D3]">electrostatics</b> panel to view the electrostatic potential on the surface of a nucleic acid, protein, and their full complex in three dimensions. 
                <br />
                The electrostatics panel supports full rotation and zooming of a structure, allowing pockets and less accessible areas to be explored. Differences in electrostatic potential can be intuitively seen in red (more negative) and blue (more positive) color shading.
                <br />
                Electrostatic potential visualizations are pre-computed for structures in the RNAproDB collection. For user uploaded structures, an option to compute the electrostatic potential is provided in the report page after initial processing is complete.
                <br/>
                Depending on the suitability of a structure, visualizations for NA only, protein only, and both NA and protein can be selected.
            </p>
            </div>
            <img
                src="/rnaprodb/electrostatics.png"
                alt="electrostatics interactive visualization"
                className="w-full sm:w-2/3 h-auto rounded-md bg-white/5 shadow-2xl ring-1 ring-gray-200 border-8 border-[#A2A0D3] mb-5 mx-auto block pt-4"
            />

            <h4 className="mt-5 text-[#A2A0D3] font-bold w-full pl-8 pr-8">1.6. Search</h4>
            <div className="pl-8 pr-8 w-full">
            <p className="mb-5  mx-auto text-left border-2 border-[#B22222] p-4 text-lg">
                The search feature allows users to query our database of over <b className="text-[#A2A0D3]">15000 structures</b> using specific conditions.
                <br />
                Users can filter by nucleic acid type, resolution range (Å), publication year, number of nucleic acid polymers, number of protein polymers, molecular weight range (Da), and specific authors or keywords.
                <br />
                The results can be displayed in either card view or table view, containing an <b className="text-[#A2A0D3]">image of the structure, ID, title, and authors</b>.
                <br />
                Users can either copy PDB IDs to the clipboard or download the data based on their needs.
            </p>
            </div>

            <img
                src="/rnaprodb/search_card_view.png"
                alt="Search"
                className="w-full sm:w-2/3 h-auto rounded-md bg-white/5 shadow-2xl ring-1 ring-gray-200 border-8 border-[#A2A0D3] mb-5 mx-auto block pt-4"
            />

            <h4 className="mt-5 text-[#A2A0D3] font-bold w-full pl-8 pr-8">1.7. Download</h4>
            <div className="pl-8 pr-8 w-full">
            <p className="mb-5  mx-auto text-left border-2 border-[#B22222] p-4 text-lg">
                RNAproDB offers users various ways of downloading its data.
                <br />
                The <b className="text-[#A2A0D3]">interface graph</b> data can be downloaded in <b className="text-[#A2A0D3]">JSON</b> format. The image itself can be downloaded as an <b className="text-[#A2A0D3]">SVG or PNG</b> by hovering over the download button.
                <br />
                The <b className="text-[#A2A0D3]">3D structure</b> image can be downloaded as a PNG.
                <br />
                The <b className="text-[#A2A0D3]">secondary structure selector</b> image can be downloaded as a PNG or SVG.
                <br />
                <b className="text-[#A2A0D3]">Tabular data</b> can be downloaded as a CSV for each header by clicking the <b className="text-[#A2A0D3]">Download</b> header.
                <br />
                <b className="text-[#A2A0D3]">Electrostatics</b> visualizations can be downloaded as a Polygon File Format (PLY) for each component type.
            </p>
            </div>

    </div>
    );
}
