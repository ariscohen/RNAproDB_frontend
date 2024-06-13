import React, { useEffect } from 'react';
import $ from 'jquery';
import './seqview.css';

var seqdiv;
var seqbutton;
var selected_chain;
var seqview;
var showseq = false;


function SeqViewer({chainsObject, tooLarge}){

    let d3to1 = {'CYS': 'C', 'ASP': 'D', 'SER': 'S', 'GLN': 'Q', 'LYS': 'K',
            'ILE': 'I', 'PRO': 'P', 'THR': 'T', 'PHE': 'F', 'ASN': 'N',
            'GLY': 'G', 'HIS': 'H', 'LEU': 'L', 'ARG': 'R', 'TRP': 'W',
            'ALA': 'A', 'VAL':'V', 'GLU': 'E', 'TYR': 'Y', 'MET': 'M',
            'A':'A',
            'U':'U',
            'G':'G',
            'C':'C'}
    
    function unhighlight(x) {
              x.style.backgroundColor = "transparent"
    }
    
    function highlight(x) {
              x.style.backgroundColor = "#aec7e8"
    }
    
    function selectOption(){
        let dropdown = document.getElementsByClassName('dropdown')[0];
        let selectedIndex = dropdown.selectedIndex;
        let selectedValue = dropdown.options[selectedIndex].text;
        selected_chain = selectedValue.split(" ")[2];
        
        //seqdiv = document.getElementsByClassName("seqdiv")[0];
        seqdiv.innerHTML = ""

        // let numberBar = document.getElementsByClassName("number-bar")[0];
        // numberBar.innerHTML = "";

        // for (var i=0; i<reslist.length; i++ ){
        //         let chain = reslist[i].split(":")[1];
        //         let resname = reslist[i].split(":")[0];
        //         let resid = reslist[i].split(":")[2];
    
        //         if (chain == selected_chain){
        //             var span = document.createElement("span");
        //             span.className = "sequence-present";
        //             if (resname in d3to1){
        //                 span.innerHTML = d3to1[resname];
        //                 span.title = resid;
        //             }
        //             else{
        //                 span.innerHTML = resname;
        //                 span.title = resid;
        //             }
        //             span.setAttribute('resname', resname);
        //             seqdiv.appendChild(span);
        //         }
        //     }
        
        for (var i=0; i<chainsObject.length; i++ ){
            if(chainsObject[i].chainId === selected_chain){ // if the residue matches
                const resList = chainsObject[i].residues;
                for(var j = 0; j < resList.length; j++){
                    var span = document.createElement("span");
                    span.className = "sequence-present";
                    let resname = resList[j].name;
                    let resid = resList[j].pos;
                    let chain = chainsObject[i].chainId;

                    if (resname in d3to1){
                        span.innerHTML = d3to1[resname];
                        span.title = resid;
                    }
                    else{
                        span.innerHTML = resname;
                        span.title = resid;
                    }
                    span.setAttribute('resname', resname);
                    seqdiv.appendChild(span);
                    // var numSpan = document.createElement("span");
                    // numSpan.className = "number-bar-item";
                    // numSpan.innerHTML = resid;
                    // numberBar.appendChild(numSpan);
                }
            }
       }

        $('.sequence-present').click(function(){
                let resid = $(this).attr("title");
                let resname = $(this).attr("resname");
                
                //append selected_chain:resid to subgraph textbox
                let textBox = document.getElementById("subgraph-textbox");
                if (textBox) {  // Check if the textBox is not null
                    textBox.value += `${selected_chain}:${resid},`;
                }
                try{
                    window.zoomOnClick(resid+':'+selected_chain);
                }
                catch(error){
                    console.error(error);
                }
                //console.log(`${selected_chain}:${resname}:${resid}`);
                try{
                    window.d3_highlight_node(`${selected_chain}:${resname}:${resid}`);
                }
                catch(error){
                    console.error(error);
                }
            });
    
    
    } 
    function makeSelector(div){
         var cselector = document.getElementsByClassName("dropdown")[0]
         //cselector.setAttribute("onChange", selectOption())
         //cselector.setAttribute("id", "dropdown")
         //cselector.setAttribute("class", "horizontal-center")
         if (cselector.childElementCount > 0) {
                 cselector.hidden=false;
                 return;
         }
        //  var chains = [];
        //  for (var i=0; i<chainsList.length; i++ ){
        //      chains.push(chainsList[i].chainId)
        //      var option = document.createElement("option")
        //      option.innerHTML="chain id: " + chainsList[i].chainId;
        //      cselector.appendChild(option)
        // }

        var chains = []
        // for (var i=0; i<reslist.length; i++ ){
        //     var cname = reslist[i].split(':')[1];
        //     if (!chains.includes(cname)) chains.push(cname);
        // }
        for (var i=0; i<chainsObject.length; i++ ){
            chains.push(chainsObject[i].chainId);
       }

        for (var i=0; i<chains.length; i++ ){
            var option = document.createElement("option")
            option.innerHTML="chain id: " + chains[i];
            cselector.appendChild(option)
       }

        cselector.hidden=false
        let selectedIndex = cselector.selectedIndex;
        // console.log(selectedIndex);
        let selectedValue = cselector.options[selectedIndex].text;
        // console.log(selectedValue);
        selected_chain = selectedValue.split(" ")[2];
    
        //return cselector.outerHTML
    }
    
    function createSeqview(seqview){
            var div = document.createElement("div")
            
            makeSelector(div)

            // var numberBar = document.createElement("div");
            // numberBar.className = "number-bar";
            // div.appendChild(numberBar);
            
            seqdiv = document.createElement("div")
            seqdiv.className = "seqdiv"
            div.appendChild(seqdiv)

            div.appendChild(document.createElement('br'))

            selectOption()
            /*for (var i=0; i<reslist.length; i++ ){
                var span = document.createElement("span")
                let chain = reslist[i].split(":")[1];
                let resname = reslist[i].split(":")[0];
                span.className = "sequence-present"
                span.innerHTML = reslist[i].split(":")[0]
                seqdiv.appendChild(span)
            }*/
         seqview.appendChild(div)  
        //return div.innerHTML.toString()
    }
    


    function populate(){
          seqview = document.getElementsByClassName('sequence_view')[0];
          seqbutton = document.getElementById('seq-button');

          if (!showseq){
           
           createSeqview(seqview)
           showseq=true
           seqbutton.innerHTML = "Hide sequence viewer"  
           //$(document).ready(function(){
            $("#dropdown").on( 'change', 'option', function (e) { alert("dfqsdasffs") });
             $('.sequence-present').click(function(){
                let resid = $(this).attr("title");
                let resname = $(this).attr("resname");
                
                // add selected node to subgraph textbox
                let textBox = document.getElementById("subgraph-textbox");
                if (textBox) {  // Check if the textBox is not null
                    textBox.value += `${selected_chain}:${resid},`;
                }
                
                try{
                    window.zoomOnClick(resid+':'+selected_chain);
                }
                catch(error){
                    console.error(error);
                }
                // console.log(`${selected_chain}:${resname}:${resid}`);
                try{
                    window.d3_highlight_node(`${selected_chain}:${resname}:${resid}`);
                }
                catch(error){
                    console.error(error);
                }
            });
            
    
            //});
    
    
          }
        else {
            seqbutton.innerHTML = "Show sequence viewer"  
            seqview.innerHTML="";
            showseq=false;
            let dropdown = document.getElementsByClassName('dropdown')[0];
            dropdown.hidden=true;
        }
    }

    useEffect(() => {
        if (tooLarge) {
          // Directly trigger the click event using the underlying DOM event
          document.getElementById('seq-button').click();
        }
      }, [tooLarge]); // This will run only when `tooLarge` changes

        const script2 = document.createElement('script');
        script2.src = '/ngl_viewer_functions_nm.js';
        
        

            
       script2.async = true;

    return  <div><button id="seq-button" class="button4 button4" onClick={populate}>Show sequence viewer</button> 
       <select onChange={selectOption} class='dropdown' id="horizontal-center" hidden="true"></select>
       <div class="sequence_view"></div>
               </div>;
}

export default SeqViewer;

