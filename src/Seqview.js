import React, { useEffect } from 'react';
import $ from 'jquery';
import './seqview.css';

var pro_list; 
var rna_list;

function unhighlight(x) {
          x.style.backgroundColor = "transparent"
}

function highlight(x) {
          x.style.backgroundColor = "#aec7e8"
}

function SeqViewer(){
        const script2 = document.createElement('script');
        script2.src = '/ngl_viewer_functions_nm.js';
        
        console.log(getResList())
       alert("NOAWWW")       

        $(document).ready(function(){
            $('.sequence-present').click(function(){
                zoomOnClick('913:C');
                console.log(getResList());
            });
        });

    
       script2.async = true;


return <div class="sequence_view">
        <span data-seqid="0" class="sequence-present" styles={{}}>G</span
        ><span data-seqid="1" class="sequence-present" styles={{}}>A</span
        ><span data-seqid="2" class="sequence-present" styles={{}}>G</span
        ><span data-seqid="3" class="sequence-present" styles={{}}>U</span
        ><span data-seqid="4" class="sequence-present" styles={{}}>C</span>
    </div>;
}

export default SeqViewer;

