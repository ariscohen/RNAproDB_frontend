export default function Docs() {
    return (
        <div className="content text-left">
            <h1 className="text-[#000000] font-bold mt-5 w-full pl-8 pr-8">RNAProDB Documentation</h1>

            <h2 className="text-[#A2A0D3] font-bold mt-5 w-full pl-8 pr-8">Introduction</h2>
            <div className="pl-8 pr-8 w-full">
            <p className="mb-5 mx-auto text-left border-2 border-[#B22222] p-4 text-lg">
                <b className="text-[#A2A0D3]">RNAProDB</b> is an advanced web server and database designed to assist researchers in the structural analysis of RNA-protein complexes.
                <br />
                <b className="text-[#A2A0D3]">RNAProDB</b> provides an interactive explorer on every structure page, displaying the nucleic acid structure in 2D along with interacting protein residues.
                <br />
                Users can select from different algorithms for mapping the structure, and subgraphs can be generated based on residue or nucleotide node selection by the user.
            </p>
            </div>

            <h2 className="text-[#A2A0D3] font-bold mt-5 w-full pl-8 pr-8">1. Search</h2>

            <div className="pl-8 pr-8 w-full">
            <p className="mb-5 mx-auto text-left border-2 border-[#B22222] p-4 text-lg">
                Users can search RNA-protein complex structures and sequences using a search box available on the landing page or at the top of any other page on the website.
                <br />
                Users can either input their own <b className="text-[#A2A0D3]">PDB identifier</b> or use pre-existing example identifiers suggested as a button.
                <br />
                This functionality provides a <b className="text-[#A2A0D3]">sequence viewer</b>, a <b className="text-[#A2A0D3]">3D structure viewer</b>, and an <b className="text-[#A2A0D3]">interface explorer</b> with a brief structural overview.
            </p>
            </div>

            
            <h4 className="mt-5 text-[#A2A0D3] font-bold w-full pl-8 pr-8">1.1. Sequence Viewer</h4>

            <div className="pl-8 pr-8 w-full">
            <p className="mb-5  mx-auto text-left border-2 border-[#B22222] p-4 text-lg">
                Users can view the sequence of the given RNA-protein complex.
                <br />
                Within the sequence viewer, users can select a specific chain ID using a dropdown button provided at the top-right.
                <br />
                Within the sequence, users can select and choose specific residues to generate a subgraph.
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
                Users can view the 3D structure of the complex using the NGL Viewer.
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
                The interface explorer is the core feature of RNAProDB, allowing users to view estimated 2D mappings of RNA-protein complexes.
                <br />
                Users can choose among three algorithms: projection-based, tertiary structure-aware 2D mapping, and secondary structure-based mapping.
                <br />
                The projection-based algorithm, <b className="text-[#A2A0D3]">Principal Component Analysis (PCA)</b>, calculates centroids to predict coordinates.
                <br />
                <b className="text-[#A2A0D3]">RNAscape</b> provides tertiary structure-aware 2D mapping, considering three-dimensional interactions and spatial constraints of RNA molecules.
                <br />
                <b className="text-[#A2A0D3]">ViennaRNA</b> offers secondary structure-based mapping, using dynamic programming algorithms to predict RNA secondary structure based on thermodynamic stability.
                <br />
                Users can select the algorithm from a dropdown menu, and the graph will be generated using D3.js accordingly.
            </p>
            </div>
             <img
                src="/rnaprodb/interface_explorer.png"
                alt="Interface Explorer Screenshot"
                className="w-full sm:w-2/3 h-auto rounded-md bg-white/5 shadow-2xl ring-1 ring-gray-200 border-8 border-[#A2A0D3] mb-5 mx-auto block pt-4"
            />


            <div className="pl-8 pr-8 w-full">
            <p className="mb-5  mx-auto text-left border-2 border-[#B22222] p-4 text-lg">
                Each component of the graph is indicated in this legend.
                <br />
                Users can click each component to gather tooltip data for each residue.
            </p>
            </div>
             <img
                src="/rnaprodb/legend.svg"
                alt="Legend"
                className="w-full sm:w-2/3 h-auto rounded-md bg-white/5 shadow-2xl ring-1 ring-gray-200 border-8 border-[#A2A0D3] mb-5 mx-auto block pt-4"
            />


            <div className="pl-8 pr-8 w-full">
            <p className="mb-5  mx-auto text-left border-2 border-[#B22222] p-4 text-lg">
                Users can also utilize toggles for an enhanced experience.
                <br />
                The <b className="text-[#A2A0D3]">"Relax Graph"</b> option loosens the graph for a more disassembled view.
                <br />
                <b className="text-[#A2A0D3]">"Indicate H-bonds"</b> shows existing hydrogen bonds in red, estimated using HBPLUS.
                <br />
                <b className="text-[#A2A0D3]">"Hide Protein"</b> removes protein information from the complex.
                <br />
                For ViennaRNA, there is also an <b className="text-[#A2A0D3]">"Indicate Tertiary Structure"</b> option that highlights regions of the RNA secondary structure involved in tertiary interactions.
            </p>
            </div>
             <img
                src="/rnaprodb/toggle.png"
                alt="Toggle Screenshot"
                className="w-full sm:w-2/3 h-auto rounded-md bg-white/5 shadow-2xl ring-1 ring-gray-200 border-8 border-[#A2A0D3] mb-5 mx-auto block pt-4"
            />


            <div className="pl-8 pr-8 w-full">
            <p className="mb-5  mx-auto text-left border-2 border-[#B22222] p-4 text-lg">
                By clicking specific residues from the sequence viewer or interface explorer, or by entering a residue and its position, users can generate subgraphs.
                <br />
                Users can click <b className="text-[#A2A0D3]">"Select Subgraph"</b> and then proceed to define the region of interest.
                <br />
                After that, clicking <b className="text-[#A2A0D3]">"Generate Subgraph"</b> will produce the desired subgraph.
                <br />
                Once users generate the most satisfactory image, they can download it in <b className="text-[#A2A0D3]">PNG</b> or <b className="text-[#A2A0D3]">SVG</b> format using the download button.
            </p>
            </div>
             <img
                src="/rnaprodb/generate_subgraph.png"
                alt="Generate Subgraph"
                className="w-full sm:w-2/3 h-auto rounded-md bg-white/5 shadow-2xl ring-1 ring-gray-200 border-8 border-[#A2A0D3] mb-5 mx-auto block pt-4"
            />


            <h2 className="text-[#A2A0D3] font-bold mt-5 w-full pl-8 pr-8">2. Advanced Search</h2>
            <div className="pl-8 pr-8 w-full">
            <p className="mb-5  mx-auto text-left border-2 border-[#B22222] p-4 text-lg">
                The advanced search feature allows users to query our database of over <b className="text-[#A2A0D3]">15000 structures</b> using specific conditions.
                <br />
                Users can filter by nucleic acid type, resolution range (Å), publication year, number of nucleic acid polymers, number of protein polymers, molecular weight range (Da), and specific authors or keywords.
                <br />
                The results can be displayed in either card view or table view, containing an <b className="text-[#A2A0D3]">image of the structure, ID, title, and authors</b>.
                <br />
                This advanced search is particularly useful for finding RNA-protein complexes that meet specific criteria.
                <br />
                Users can either copy PDB IDs to the clipboard or download the data based on their needs.
            </p>
            </div>

            <img
                src="/rnaprodb/1asz.svg"
                alt="Advanced Search"
                className="w-full sm:w-2/3 h-auto rounded-md bg-white/5 shadow-2xl ring-1 ring-gray-200 border-8 border-[#A2A0D3] mb-5 mx-auto block pt-4"
            />

    </div>
    );
}