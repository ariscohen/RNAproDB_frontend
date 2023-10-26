import React, { useEffect } from 'react';
import $ from 'jquery';
import './seqview.css';

var pro_list; 
var rna_list;
var seqview;
var showseq = false;
var seqbutton;
var reslist;
var selected_chain;
var seqdiv;


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
    for (var i=0; i<reslist.length; i++ ){
            let chain = reslist[i].split(":")[1];
            let resname = reslist[i].split(":")[0];
            let resid = reslist[i].split(":")[2];

            if (chain == selected_chain){
                var span = document.createElement("span");
                span.className = "sequence-present";
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
            }
        }
    $('.sequence-present').click(function(){
            let resid = $(this).attr("title");
            let resname = $(this).attr("resname");

            window.zoomOnClick(resid+':'+selected_chain);
            //console.log(`${selected_chain}:${resname}:${resid}`);
            window.d3_highlight_node(`${selected_chain}:${resname}:${resid}`);
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
     var chains = []
     for (var i=0; i<reslist.length; i++ ){
         var cname = reslist[i].split(':')[1];
         if (!chains.includes(cname)) chains.push(cname);
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
       reslist = window.getResList()
       
       createSeqview(seqview)
       showseq=true
       seqbutton.innerHTML = "Hide sequence viewer"  
       //$(document).ready(function(){
        $("#dropdown").on( 'change', 'option', function (e) { alert("dfqsdasffs") });
         $('.sequence-present').click(function(){
            let resid = $(this).attr("title");
            let resname = $(this).attr("resname");

            window.zoomOnClick(resid+':'+selected_chain);
            // console.log(`${selected_chain}:${resname}:${resid}`);
            window.d3_highlight_node(`${selected_chain}:${resname}:${resid}`);
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
function SeqViewer(){
        const script2 = document.createElement('script');
        script2.src = '/ngl_viewer_functions_nm.js';
        
        

            
       script2.async = true;

return  <div><button id="seq-button" class="button4 button4" onClick={populate}>Show sequence viewer</button> 
        <select onChange={selectOption} class='dropdown' id="horizontal-center" hidden="true"></select>
        <div class="sequence_view"></div>
                </div>;
}

export default SeqViewer;

