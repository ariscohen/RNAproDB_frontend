import React, { useEffect } from 'react';
import $ from 'jquery';
import './seqview.css';

var pro_list; 
var rna_list;
var seqview;
var showseq = false;
var seqbutton;

function unhighlight(x) {
          x.style.backgroundColor = "transparent"
}

function highlight(x) {
          x.style.backgroundColor = "#aec7e8"
}
function populate(){
      seqview = document.getElementsByClassName('sequence_view')[0];
      seqbutton = document.getElementsByClassName('seq-button')[0];

      if (!showseq){
        var reslist = getResList()

        for (var i=0; i<reslist.length; i++ ){
            var span = document.createElement("span")
            span.className = "sequence-present"
            span.innerHTML = reslist[i].split(":")[0]
            seqview.appendChild(span)
      
       showseq=true
       seqbutton.innerHTML = "Hide sequence viewer"  
       //$(document).ready(function(){
                $('.sequence-present').click(function(){
                zoomOnClick('913:C');
            });
        //});


      }
    }
    else {
        seqbutton.innerHTML = "Show sequence viewer"  
        seqview.innerHTML="";
        showseq=false;
    }
}
function SeqViewer(){
        const script2 = document.createElement('script');
        script2.src = '/ngl_viewer_functions_nm.js';
        
        

            
       script2.async = true;

return  <div><button class="seq-button" onClick={populate}>Show sequence viewer</button> 
        <div class="sequence_view"></div></div>;
}

export default SeqViewer;

