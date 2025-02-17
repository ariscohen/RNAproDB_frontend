export default function Docs() {
    return (
        <div className="content-doc text-left">
            <h1 className="text-[#000000] font-bold mt-5 w-full pl-8 pr-8">Documentation</h1>

            <h2 className="text-[#A2A0D3] font-bold mt-5 w-full pl-8 pr-8">Content</h2>
            <div className="pl-8 pr-8 w-full">
                <ol className="w-full list-decimal text-lg border-2 border-[#B22222] pl-10 pt-4 pb-4" >
                    <li><a href="#introduction">Introduction</a></li>
                    <ol className="w-full pl-4 pb-2" >
                        <li>1.1. <a href="#sequence-viewer">Sequence viewer</a></li>
                        <li>1.2. <a href="#3d-viewer">3D viewer</a></li>
                        <li>1.3. <a href="#interface-explorer">Interface explorer</a></li>
                        <li>1.4. <a href="#secondary-structure-selector">Secondary structure selector</a></li>
                        <li>1.5. <a href="#electrostatics">Electrostatics</a></li>
                        <li>1.6. <a href="#tabular-data">Tabular Data</a></li>
                        <li>1.7. <a href="#search">Search</a></li>
                        <li>1.8. <a href="#download">Download</a></li>
                    </ol>
                    <li><a href="#use-case">Case Study</a></li>
                </ol>
            </div>

            <h2 id="introduction" className="text-[#A2A0D3] font-bold mt-5 w-full pl-8 pr-8">1. Introduction</h2>
            <div className="pl-8 pr-8 w-full">
            <p className="mb-5 mx-auto text-left border-2 border-[#B22222] p-4 text-lg">
                <b className="text-[#A2A0D3]">RNAproDB</b> is a webserver and interactive database designed to assist researchers in the structural analysis of RNA–protein complexes.
                <br />
                <b className="text-[#A2A0D3]">RNAproDB</b> provides an interface explorer on every structure page, displaying the nucleic acid structure in 2D along with interacting protein residues.
                <br />
                Users can select various algorithms to map the structure, and subgraphs can be generated based on secondary structure or selection by the user.
            </p>
            </div>
            <img
                src="/abstract.png"
                alt="RNAproDB abstract"
                className="w-full sm:w-2/3 h-auto rounded-md bg-white/5 shadow-2xl ring-1 ring-gray-200 border-8 border-[#A2A0D3] mb-5 mx-auto block pt-4"
            />

            {/* <h2 className="text-[#A2A0D3] font-bold mt-5 w-full pl-8 pr-8">1. Features</h2> */}

            <div className="pl-8 pr-8 w-full">
            <p className="mb-5 mx-auto text-left border-2 border-[#B22222] p-4 text-lg">
                Users can input a <b className="text-[#A2A0D3]">PDB identifier</b> on the top navigation bar to access structures (biological assembly 1). 
                <br />
                Users can also find structures with search keywords and specific filters from the <a href="/search">search page</a>.
                <br />
                Structures can be uploaded for analysis on the <a href="/upload">upload page</a>. RNAproDB supports CIF biological assembly files up to 10 MB.
                <br />
                Each structure page features analysis tools including <b className="text-[#A2A0D3]">Sequence viewer</b>, <b className="text-[#A2A0D3]">3D viewer</b>, <b className="text-[#A2A0D3]">Interface explorer</b>, <b className="text-[#A2A0D3]">Secondary structure selector</b>, and <b className="text-[#A2A0D3]">Electrostatics</b>. See below on how they work and how to use them.
            </p>
            </div>
            <img
                src="/nav_search_bar.png"
                alt="Search bar"
                className="w-full sm:w-1/2 h-auto rounded-md bg-white/5 shadow-2xl ring-1 ring-gray-200 border-8 border-[#A2A0D3] mb-5 mx-auto block pt-4"
            />
            
            <h4 className="mt-5 text-[#A2A0D3] font-bold w-full pl-8 pr-8" id="sequence-viewer">1.1. Sequence viewer</h4>

            <div className="pl-8 pr-8 w-full">
            <p className="mb-5  mx-auto text-left border-2 border-[#B22222] p-4 text-lg">
                Sequence viewer provides the sequence in the given RNA–protein complex.
                <br />
                Users can view sequences of different chains by selecting their ID from the dropdown button.
                <br />
                Hovering on specific residues to display its residue number. 
                <br />
                Clicking on the residue display its molecule in 3D viewer and highlight its node in Interface explorer. It can also be clicked while generating a subgraph.
            </p>
            </div>
            <img
                src="/sequence_viewer.png"
                alt="Sequence Viewer Screenshot"
                className="w-full sm:w-1/2 h-auto rounded-md bg-white/5 shadow-2xl ring-1 ring-gray-200 border-8 border-[#A2A0D3] mb-5 mx-auto block pt-4"
            />

            <h4 className="mt-5 text-[#A2A0D3] font-bold w-full pl-8 pr-8" id="3d-viewer">1.2. 3D viewer</h4>
            <div className="pl-8 pr-8 w-full">
            <p className="mb-5  mx-auto text-left border-2 border-[#B22222] p-4 text-lg">
                Users can view the 3D structure of the complex using 3D viewer.
                <br />
                Click on <b className="text-[#A2A0D3]">Toggle solvent</b> to hide water molecules and <b className="text-[#A2A0D3]">Toggle cartoon</b> to remove cartoon representations. Hiding non-essential elements improves visual clarity.
                <br />
                Left-click and drag on 3D viewer to rotate the view. Right-click and drag to translate the view. Scroll to zoom in and out.
                <br />
                To annotate in the 3D viewer, right-click on each atom you wish to select, and then right-click again on the last selected atom to complete the drawing. Selecting two atoms displays the distance between them, while selecting three or more atoms shows the angle. You can select up to four atoms at a time.
            </p>
            </div>
             {/* <img
                src="/3d_structure.png"
                alt=" Structure Screenshot"
                className="w-1/3 h-auto rounded-md bg-white/5 shadow-2xl ring-1 ring-grsay-200 border-8 border-[#A2A0D3] mb-5 mx-auto block pt-4"
            /> */}
            <div className="flex flex-wrap justify-center px-1">
                <div className="w-full sm:w-1/4 p-2">
                    <img
                    src="/3d_structure_2.png"
                    alt="Structure screenshot"
                    className="w-full h-auto rounded-md bg-white/5 shadow-2xl ring-1 ring-gray-200 border-8 border-[#A2A0D3] mx-auto block"
                    />
                </div>

                <div className="w-full sm:w-1/4 p-2">
                    <img
                    src="/3d_structure_3.png"
                    alt="Annotated atoms"
                    className="w-full h-auto rounded-md bg-white/5 shadow-2xl ring-1 ring-gray-200 border-8 border-[#A2A0D3] mx-auto block pt-4"
                    />
                </div>
            </div>

            <h4 className="mt-5 text-[#A2A0D3] font-bold w-full pl-8 pr-8" id="interface-explorer">1.3. Interface explorer</h4>
            <div className="pl-8 pr-8 w-full">
            <p className="mb-5  mx-auto text-left border-2 border-[#B22222] p-4 text-lg">
                The interface explorer is a core feature of RNAproDB, allowing users to view estimated 2D mappings of RNA–protein complexes.
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
                src="/interface_explorer.png"
                alt="Interface Explorer Screenshot"
                className="w-full sm:w-1/2 h-auto rounded-md bg-white/5 shadow-2xl ring-1 ring-gray-200 border-8 border-[#A2A0D3] mb-5 mx-auto block pt-4"
            />


            <div className="pl-8 pr-8 w-full">
            <p className="mb-5  mx-auto text-left border-2 border-[#B22222] p-4 text-lg">
                A legend for the graph is available below the graph, other than Leontis-Westhof annotations which are displayed on the right side of the graph.
                <br />
                Hovering over nodes or edges on the graph provides more extensive information on corresponding residues and/or interactions.
            </p>
            </div>
             <img
                src="/hover.png"
                alt="Legend"
                className="w-full sm:w-1/2 h-auto rounded-md bg-white/5 shadow-2xl ring-1 ring-gray-200 border-8 border-[#A2A0D3] mb-5 mx-auto block pt-4"
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
                src="/toggle.png"
                alt="Toggle Screenshot"
                className="w-full sm:w-1/2 h-auto rounded-md bg-white/5 shadow-2xl ring-1 ring-gray-200 border-8 border-[#A2A0D3] mb-5 mx-auto block pt-4"
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
                src="/generate_subgraph.png"
                alt="Generate Subgraph"
                className="w-full sm:w-1/2 h-auto rounded-md bg-white/5 shadow-2xl ring-1 ring-gray-200 border-8 border-[#A2A0D3] mb-5 mx-auto block pt-4"
            />

            <h4 className="mt-5 text-[#A2A0D3] font-bold w-full pl-8 pr-8" id="secondary-structure-selector">1.4. Secondary structure selector</h4>
            <div className="pl-8 pr-8 w-full">
            <p className="mb-5  mx-auto text-left border-2 border-[#B22222] p-4 text-lg">
                The Secondary structure selector is a coarse-grained visualization that shows broad secondary structure elements of the structure. It can be used to quickly find and visualize certain areas of the structure.
                <br />
                Left clicking an element will open the subgraph view in Interface explorer, adding its corresponding nodes. Simply click Generate subgraph to then visualize these nodes and their neighbors.
                <br />
            </p>
            </div>

            <img
                src="/1asz_ss.png"
                alt="1asz secondary structure selector"
                className="w-full sm:w-1/2 h-auto rounded-md bg-white/5 shadow-2xl ring-1 ring-gray-200 border-8 border-[#A2A0D3] mb-5 mx-auto block pt-4"
            />

            <h4 className="mt-5 text-[#A2A0D3] font-bold w-full pl-8 pr-8" id="electrostatics">1.5. Electrostatics</h4>
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
                src="/electrostatics.png"
                alt="electrostatics interactive visualization"
                className="w-full sm:w-1/3 h-auto rounded-md bg-white/5 shadow-2xl ring-1 ring-gray-200 border-8 border-[#A2A0D3] mb-5 mx-auto block pt-4"
            />

            <h4 className="mt-5 text-[#A2A0D3] font-bold w-full pl-8 pr-8" id="tabular-data">1.6. Tabular Data</h4>
            <div className="pl-8 pr-8 w-full">
            <p className="mb-5  mx-auto text-left border-2 border-[#B22222] p-4 text-lg">
                <b className="text-[#A2A0D3]">Tabular data</b> provides a list of interactions (e.g., hydrogen bonds and water-mediated interactions) between elements. Users can download the list by clicking the <b className="text-[#A2A0D3]">Download</b> button.
                <br />
                It also includes a list of potential steric clashes detected in the structure. These clashes are identified based on the overlap of van der Waals radii between two atoms. Overlaps greater than 0.6 Å are flagged as potential steric clashes.
            </p>
            </div>

            <img
                src="/table_1.png"
                alt="tabular data"
                className="w-full sm:w-1/2 h-auto rounded-md bg-white/5 shadow-2xl ring-1 ring-gray-200 border-8 border-[#A2A0D3] mb-5 mx-auto block"
            />

            <h4 className="mt-5 text-[#A2A0D3] font-bold w-full pl-8 pr-8" id="search">1.7. Search</h4>
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
                src="/search_card_view.png"
                alt="Search"
                className="w-full sm:w-1/2 h-auto rounded-md bg-white/5 shadow-2xl ring-1 ring-gray-200 border-8 border-[#A2A0D3] mb-5 mx-auto block pt-4"
            />

            <h4 className="mt-5 text-[#A2A0D3] font-bold w-full pl-8 pr-8" id="download">1.8. Download</h4>
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


            <hr className="my-8 border-t-2 border-[#A2A0D3]" />

            <h2 id="use-case" className="text-[#A2A0D3] font-bold mt-5 w-full pl-8 pr-8">2. Case Study: SARS-CoV-2 nsp10-nsp14 (WT)-RNA24</h2>
            <div className="pl-8 pr-8 w-full">
            <p className="mb-5 mx-auto text-left border-2 border-[#B22222] p-4 text-lg">
            The Cryo-EM structure of SARS-CoV-2 nsp10-nsp14 (WT)-RNA24 (PDB ID 7N0B) is important for understanding mismatch recognition in A-form double-helical RNA structure by a SARS-CoV-2 proofreading enzyme<sup>1</sup>. After searching the ID in RNAproDB, we are presented with the following page, which includes structure info, 3D viewer, interface explorer, etc.

            <br /><br />
            1. Liu, C., Shi, W., Becker, S.T., Schatz, D.G., Liu, B., Yang, Y. (2021) Structural basis of mismatch recognition by a SARS-CoV-2 proofreading enzyme. Science 373, 1142–1146. <a href='https://www.science.org/doi/epdf/10.1126/science.abi9310' target='_blank' rel="noreferrer">https://doi.org/10.1126/science.abi9310</a>
            </p>

            <img
                src="/entering_page.png"
                alt="Entering Page"
                className="w-1/2 sm:w-1/2 h-auto rounded-md bg-white/5 shadow-2xl ring-1 ring-gray-200 border-8 border-[#A2A0D3] mb-5 mx-auto block pt-4"
            />
            </div>

            <h4 className="mt-5 text-[#A2A0D3] font-bold w-full pl-8 pr-8">Sequence Viewer</h4>
            <div className="pl-8 pr-8 w-full">
            <p className="mb-5 mx-auto text-left border-2 border-[#B22222] p-4 text-lg">
                The sequence viewer lists 4 chains, each corresponding to the following complexes:
                <ul className="list-disc">
                    <li>Chain id: A – nonstructural protein 10 (nsp10), the cofactor</li>
                    <li>Chain id: B – nonstructural protein 14 (nsp14), proofreading exoribonuclease</li>
                    <li>Chain id: T – T-strand (template) RNA</li>
                    <li>Chain id: D – P-strand (product) RNA</li>
                </ul>
            </p>
            <img
                src="/example_sequence_viewer.png"
                alt="Sequence Viewer"
                className="w-full sm:w-1/2 h-auto rounded-md bg-white/5 shadow-2xl ring-1 ring-gray-200 border-8 border-[#A2A0D3] mb-5 mx-auto block pt-4"
            />
            </div>

            <h4 className="mt-5 text-[#A2A0D3] font-bold w-full pl-8 pr-8">Interface Explorer</h4>
            <div className="pl-8 pr-8 w-full">
            <p className="mb-5 mx-auto text-left border-2 border-[#B22222] p-4 text-lg">
                The interface explorer shows the C-U mismatch (denoted by the orange dotted pair line) formed by the hairpin RNA at the 3’ end of the strand . By setting the protein-RNA edge threshold to 15 Å, the interface explorer displays interactions between amino acids from the proofreading exonuclease (nsp14) and the RNA. The nsp14 residues connected to the mismatched nucleotides help the protein recognize or stabilize the mismatch in a way that allows nsp14 to excise the wrong nucleotide.
            </p>
            </div>

            <div className="flex flex-wrap px-1">
                <div className="w-full sm:w-1/2 p-2">
                    <p className="text-center text-xl text-[#A2A0D3] font-bold">
                    Partial Projection
                    </p>
                    <img
                    src="/7n0b_pca_graph_edit.png"
                    alt="Partial Projection"
                    className="w-full h-auto rounded-md bg-white/5 shadow-2xl ring-1 ring-gray-200 border-8 border-[#A2A0D3] mx-auto block"
                    />
                </div>

                <div className="w-full sm:w-1/2 p-2">
                    <p className="text-center text-xl text-[#A2A0D3] font-bold">
                    RNAscape
                    </p>
                    <img
                    src="/7n0b_rnascape_graph_edit.png"
                    alt="RNAscape"
                    className="w-full h-auto rounded-md bg-white/5 shadow-2xl ring-1 ring-gray-200 border-8 border-[#A2A0D3] mx-auto block pt-4"
                    />
                </div>
            </div>

            <div className="w-full p-2">
                <p className="text-center text-xl text-[#A2A0D3] font-bold">
                3D Viewer of C-U mismatch
                </p>
                <img
                src="/7n0b_structure_edit.png"
                alt="3Dviewer"
                className="w-full sm:w-1/2 h-auto rounded-md bg-white/5 shadow-2xl ring-1 ring-gray-200 border-8 border-[#A2A0D3] mx-auto block"
                />
            </div>

            {/* <div className="pl-8 pr-8 w-full">
            <p className="text-center text-xl text-[#A2A0D3] font-bold mt-2">Partial Projection</p>
            <img
                src="/7n0b_pca_graph.png"
                alt="Partial Projection"
                className="w-full sm:w-1/2 h-auto rounded-md bg-white/5 shadow-2xl ring-1 ring-gray-200 border-8 border-[#A2A0D3] mb-5 mx-auto block pt-4"
            />
            </div>

            <div className="pl-8 pr-8 w-full">
            <p className="text-center text-xl text-[#A2A0D3] font-bold mt-2">RNAscape</p>
            <img
                src="/7n0b_rnascape_graph.png"
                alt="RNAscape"
                className="w-full sm:w-1/2 h-auto rounded-md bg-white/5 shadow-2xl ring-1 ring-gray-200 border-8 border-[#A2A0D3] mb-5 mx-auto block pt-4"
            />
            </div>

            <div className="pl-8 pr-8 w-full">
            <p className="text-center text-xl text-[#A2A0D3] font-bold mt-2">3D Viewer of C-U mismatch (green line shows hydrogen bonds)</p>
            <img
                src="/7n0b_structure.png"
                alt="3Dviewer"
                className="w-full sm:w-1/2 h-auto rounded-md bg-white/5 shadow-2xl ring-1 ring-gray-200 border-8 border-[#A2A0D3] mb-5 mx-auto block pt-4"
            />
            </div> */}

            <h4 className="mt-5 text-[#A2A0D3] font-bold w-full pl-8 pr-8">Secondary Structure Selector</h4>
            <div className="pl-8 pr-8 w-full">
            <p className="mb-5 mx-auto text-left border-2 border-[#B22222] p-4 text-lg">
                The secondary structure selector categorizes the RNA structure into elements: stems (double-stranded, base-paired regions) and ssSegments (single-stranded segments). By organizing the nucleotides in this way, we gain insights into how different parts of the RNA contribute to its overall function. Stems lend structural stability and properly orient other functional motifs, while single-stranded regions often serve as binding sites for proteins, small molecules, or additional RNA strands.
            </p>
            <img
                src="/secondary_structure.png"
                alt="Secondary Structure"
                className="w-full sm:w-1/2 h-auto rounded-md bg-white/5 shadow-2xl ring-1 ring-gray-200 border-8 border-[#A2A0D3] mb-5 mx-auto block pt-4"
            />
            </div>

            <h4 className="mt-5 text-[#A2A0D3] font-bold w-full pl-8 pr-8">Electrostatics</h4>
            <div className="pl-8 pr-8 w-full">
            <p className="mb-5 mx-auto text-left border-2 border-[#B22222] p-4 text-lg">
                The electrostatic visualization highlights the electrostatic potential across the surface of the protein–RNA complex. The intensely red region corresponds to the negatively charged RNA, due to its phosphate backbone. By examining these color gradients, one can pinpoint protein surfaces (often more positively charged) that stabilize and orient the RNA, thereby guiding it into the catalytic or proofreading site. Moreover, electrostatic potentials around the enzyme’s active site can reveal ‘hot spots’ for mismatch recognition.
            </p>
            </div>
            <img
                src="/example_electrostatics.png"
                alt="Electrostatics Visualization"
                className="w-full sm:w-1/2 h-auto rounded-md bg-white/5 shadow-2xl ring-1 ring-gray-200 border-8 border-[#A2A0D3] mb-5 mx-auto block pt-4"
            />
            </div>

    </div>
    );
}
