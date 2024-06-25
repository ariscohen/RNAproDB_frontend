var stage;
var init_component;

function loadStructure(structure_url) {
        stage = new NGL.Stage("viewport", {backgroundColor: "white", opacity: 0});
        return stage.loadFile(structure_url,{name: "my_structure"}).then(function( o ){
                    o.addRepresentation( "cartoon" );
                    o.addRepresentation( "base" );
                    o.autoView();        
                } );
}

function zoomOnResidue(selectionString){
        console.log("In simp zoom pls work");
        stage.getComponentsByName("my_structure").autoView("913:C");
}