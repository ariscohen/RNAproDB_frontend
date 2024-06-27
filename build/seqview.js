function unhighlight(x) {
          x.style.backgroundColor = "transparent"
}

function highlight(x) {
          x.style.backgroundColor = "#aec7e8"
}

$(document).ready(function(){
        $('.sequence-present').click(function(){
            parent.zoomOnClick('913:C');
        });
});


