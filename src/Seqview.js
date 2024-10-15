import React, { useEffect, useRef, useState } from 'react';
import $ from 'jquery';
import './seqview.css';

var seqview
var seqbutton
var seqdiv;
var selected_chain;
var showseq = false;

function SeqViewer({ chainsObject, tooLarge }) {
    const buttonRef = useRef(null);  // Create a ref for the button
    const seqContainerRef = useRef(null);
    const seqDivRef = useRef(null);
    const numberBarRef = useRef(null);
    const [showSeq, setShowSeq] = useState(false); // Manage the show/hide state

    useEffect(() => {
        // Programmatically click the button after the component mounts
        if (buttonRef.current) {
            buttonRef.current.click();
        }
    }, []);

    let d3to1 = {
        'CYS': 'C', 'ASP': 'D', 'SER': 'S', 'GLN': 'Q', 'LYS': 'K',
        'ILE': 'I', 'PRO': 'P', 'THR': 'T', 'PHE': 'F', 'ASN': 'N',
        'GLY': 'G', 'HIS': 'H', 'LEU': 'L', 'ARG': 'R', 'TRP': 'W',
        'ALA': 'A', 'VAL': 'V', 'GLU': 'E', 'TYR': 'Y', 'MET': 'M',
        'A': 'A', 'U': 'U', 'G': 'G', 'C': 'C'
    };

    function selectOption() {
        let dropdown = document.getElementsByClassName('dropdown')[0];
        let selectedIndex = dropdown.selectedIndex;
        let selectedValue = dropdown.options[selectedIndex].text;
        selected_chain = selectedValue.split(" ")[2];
    
        seqdiv.innerHTML = "";
        const numberBar = document.getElementsByClassName("number-bar")[0];
        numberBar.innerHTML = "";
        let indexDict = {}; // To keep track of where to insert numbers
        let spaceArray = []; // Array to store the space characters
        for (var i = 0; i < chainsObject.length; i++) {
            if (chainsObject[i].chainId === selected_chain) {
                const resList = chainsObject[i].residues;
                for (var j = 0; j < resList.length; j++) {
                    var span = document.createElement("span");
                    span.className = "sequence-present";
                    let resname = resList[j].name;
                    let resid = resList[j].pos;
                    let finalResname = "";
    
                    if (resname in d3to1) {
                        span.innerHTML = d3to1[resname];
                        span.setAttribute('data-resname', d3to1[resname]);
                        span.title = resid;
                        finalResname = d3to1[resname];
                    } else {
                        span.innerHTML = resname;
                        span.setAttribute('data-resname', resname);
                        span.title = resid;
                        finalResname = resname;
                    }
                    seqdiv.appendChild(span);
    
                    // Add corresponding entry to spaceArray
                    if (resid % 10 === 0 || spaceArray.length == 0) {
                        indexDict[resid] = spaceArray.length; // Store where the number should go
                    }
    
                    // Add spaces corresponding to the length of the residue name
                    for (var k = 0; k < finalResname.length; k++) {
                        spaceArray.push('&nbsp;'); // Add spaces to the array
                    }
                }
            }
        }
    
        // Now replace spaces in spaceArray with numbers at the correct positions
        for (var resid in indexDict) {
            let spacePos = indexDict[resid];
            let residStr = resid.toString(); // Convert number to string to iterate
            for (var i = 0; i < residStr.length; i++) {
                spaceArray[spacePos + i] = residStr[i]; // Replace space with the number
            }
        }
    
        // Join the array into a single string and insert into number bar
        let numSpan = document.createElement("span");
        numSpan.innerHTML = spaceArray.join(''); // Convert the array back to a string
        numberBar.appendChild(numSpan);


        $('.sequence-present').click(function(){
            let resid = $(this).attr("title");
            let resname = $(this).data("resname");
                        
            //append selected_chain:resid to subgraph textbox
            let textBox = document.getElementById("subgraph-textbox");
            if (textBox) {  // Check if the textBox is not null
                textBox.value += `${selected_chain}:${resid}:,`;
            }
            try{
                window.zoomOnClick(resid+':'+selected_chain);
            }
            catch(error){
                console.error(error);
            }
            //console.log(`${selected_chain}:${resname}:${resid}`);
            try{
                console.log("Before highlighting resname is:", resname)
                window.d3_highlight_node(`${selected_chain}:${resname}:${resid}`);
            }
            catch(error){
                console.error(error);
            }
        });
    }
    

    function makeSelector() {
        var cselector = document.getElementsByClassName("dropdown")[0];
        if (cselector.childElementCount > 0) {
            cselector.hidden = false;
            return;
        }

        var chains = [];
        for (var i = 0; i < chainsObject.length; i++) {
            chains.push(chainsObject[i].chainId);
        }

        for (var i = 0; i < chains.length; i++) {
            var option = document.createElement("option");
            option.innerHTML = "chain id: " + chains[i];
            cselector.appendChild(option);
        }

        cselector.hidden = false;
        let selectedIndex = cselector.selectedIndex;
        let selectedValue = cselector.options[selectedIndex].text;
        selected_chain = selectedValue.split(" ")[2];
    }

    function createSeqview() {
        const div = document.createElement("div");
        makeSelector(div);

        // Number bar
        const numberBar = document.createElement("div");
        numberBar.className = "number-bar";
        numberBarRef.current = numberBar;

        // Sequence div
        seqdiv = document.createElement("div");
        seqdiv.className = "seqdiv";
        seqDivRef.current = seqdiv;

        // Append number bar and sequence div to seq-container
        const seqContainer = document.createElement("div");
        seqContainer.className = "seq-container";
        seqContainer.appendChild(numberBar);
        seqContainer.appendChild(seqdiv);

        seqContainerRef.current.appendChild(seqContainer);

        selectOption();
    }

    function populate() {
        const seqview = seqContainerRef.current;

        if (!showSeq) {
            createSeqview(); // Create the sequence view
            setShowSeq(true); // Set state to show sequence
        } else {
            seqview.innerHTML = ""; // Clear sequence view
            let dropdown = document.getElementsByClassName('dropdown')[0];
            dropdown.hidden = true;
            setShowSeq(false); // Set state to hide sequence
        }
    }

    useEffect(() => {
        if (tooLarge) {
            document.getElementById('seq-button').click();
        }
    }, [tooLarge]);

    return (
        <div>
            <button
                id="seq-button"
                ref={buttonRef}
                className="button4 button4"
                onClick={populate}
            >
                {showSeq ? "Hide sequence viewer" : "Show sequence viewer"} {/* Button text dynamically updates */}
            </button>
            <select onChange={selectOption} className='dropdown' id="horizontal-center" hidden={true}></select>
            <div className="sequence_view" ref={seqContainerRef}></div>
        </div>
    );
}

export default SeqViewer;