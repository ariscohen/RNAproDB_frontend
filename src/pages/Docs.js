export default function Docs() {
    return (
        <div className="content-doc text-left">
            <h1 className="text-[#000000] font-bold mt-5 w-full pl-8 pr-8">Documentation</h1>

            <h2 className="text-[#A2A0D3] font-bold mt-5 w-full pl-8 pr-8">Introduction</h2>
            <div className="pl-8 pr-8 w-full">
            <p className="mb-5 mx-auto text-left border-2 border-[#B22222] p-4 text-lg">
                <b className="text-[#A2A0D3]">RNAproDB</b> is an interactive database designed to assist researchers in the structural analysis of RNA-protein complexes.
                <br />
                <b className="text-[#A2A0D3]">RNAproDB</b> provides an interface explorer on every structure page, displaying the nucleic acid structure in 2D along with interacting protein residues.
                <br />
                Users can select from different algorithms for mapping the structure, and subgraphs can be generated based on residue or nucleotide selection by the user.
            </p>
            </div>

            <h2 className="text-[#A2A0D3] font-bold mt-5 w-full pl-8 pr-8">1. Search</h2>

            <div className="pl-8 pr-8 w-full">
            <p className="mb-5 mx-auto text-left border-2 border-[#B22222] p-4 text-lg">
                Users can search structures and sequences via a search box available on the landing page or at the top navigation bar.
                <br />
                Users can also input a <b className="text-[#A2A0D3]">PDB identifier</b> to access a structure (biological assembly 1 as available on the PDB).
                <br />
                Each structure page provides a <b className="text-[#A2A0D3]">sequence viewer</b>, a <b className="text-[#A2A0D3]">3D structure viewer</b>, and an <b className="text-[#A2A0D3]">interface explorer</b> with relevant structure information.
            </p>
            </div>

            
            <h4 className="mt-5 text-[#A2A0D3] font-bold w-full pl-8 pr-8">1.1. Sequence Viewer</h4>

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

            <h4 className="mt-5 text-[#A2A0D3] font-bold w-full pl-8 pr-8">1.2.  Structure Viewer</h4>
            <div className="pl-8 pr-8 w-full">
            <p className="mb-5  mx-auto text-left border-2 border-[#B22222] p-4 text-lg">
                Users can view the 3D structure of the complex using the Structure Viewer.
                <br />
                For visual clarity, options to show <b className="text-[#A2A0D3]">solvent molecules</b> and <b className="text-[#A2A0D3]">display cartoon representations</b> are available.
            </p>
            </div>
             <img
                src="/rnaprodb/1asz.png"
                alt=" Structure Screenshot"
                className="w-1/3 h-auto rounded-md bg-white/5 shadow-2xl ring-1 ring-gray-200 border-8 border-[#A2A0D3] mb-5 mx-auto block pt-4"
            />


                       <h4 className="mt-5 text-[#A2A0D3] font-bold w-full pl-8 pr-8">1.3. Interface Explorer</h4>
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
                The components of the graph are indicated in the below legend, other than Leontis-Westhof annotations which are displayed on the right side of the graph.
                <br />
                Hovering over nodes or edges on the graph provides more extensive information on corresponding residues and/or interactions.
            </p>
            </div>
             <img
                src="/rnaprodb/legend.svg"
                alt="Legend"
                className="w-full sm:w-2/3 h-auto rounded-md bg-white/5 shadow-2xl ring-1 ring-gray-200 border-8 border-[#A2A0D3] mb-5 mx-auto block pt-4"
            />


            <div className="pl-8 pr-8 w-full">
            <p className="mb-5  mx-auto text-left border-2 border-[#B22222] p-4 text-lg">
                RNAproDB provides various quick options to customize the graph.
                <br />
                The <b className="text-[#A2A0D3]">"Relax graph"</b> option loosens the graph for a more disassembled view.
                <br />
                <b className="text-[#A2A0D3]">"Indicate H-bonds"</b> shows existing direct hydrogen bonds in red.
                <br />
                <b className="text-[#A2A0D3]">"Hide protein"</b> removes protein residues and corresponding interactions from the visualization.
                <br />
                For the ViennaRNA option, there is also an option called <b className="text-[#A2A0D3]">"Indicate tertiary structure"</b> which can be turned off to declutter the secondary structure visualization.
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
            </p>
            </div>

            <img
                src="/rnaprodb/1asz_ss.png"
                alt="Search"
                className="w-full sm:w-2/3 h-auto rounded-md bg-white/5 shadow-2xl ring-1 ring-gray-200 border-8 border-[#A2A0D3] mb-5 mx-auto block pt-4"
            />

            <h4 className="mt-5 text-[#A2A0D3] font-bold w-full pl-8 pr-8">1.5. Search</h4>
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
                src="/rnaprodb/1asz.svg"
                alt="Search"
                className="w-full sm:w-2/3 h-auto rounded-md bg-white/5 shadow-2xl ring-1 ring-gray-200 border-8 border-[#A2A0D3] mb-5 mx-auto block pt-4"
            />

    </div>
    );
}
