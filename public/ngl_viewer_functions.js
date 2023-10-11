var stage_nm1;
var ballStick_list_nm1 = [] //list of index values for ballStick representations... used to dispose of them after use
var chain_set_nm1 = new Set();
var model_list_nm1 = []
var visible_residue_list_nm1 = [];
var visibility_list_nm1 = [];
var model_number_nm1 = 0;
var number_of_models_nm1 = 0;
var multi_nm1 = new Map();
var index_nm1 = 0;
var hydrogen_setting_nm1 = "and not hydrogen";
var nuc_repr_type_nm1 = "tube";

function cleanupDeleteLater(deleteLater)
{
  deleteLater.forEach( function(item)
  {
    //console.log(item)
    var end_1 = item.indexOf("-",2); //making sure negative index values don't mess it up
    if (end_1 == -1)
    {
      end_1 = item.length;
      //console.log("length = "+end_1)
    }
    var base_position = item.indexOf("_base");
    if (base_position != -1)
    {
      end_1 = item.length - base_position -1;
      //console.log("adjusted to "+end_1)
    }
    var model_number = Number(item.substring(item.indexOf("/")+1,end_1));
    
    //console.log(model_number)
    model_list_nm1[model_number].delete(item);
  });
}


function loadStructure(structure_url) {
  stage_nm1 = new NGL.Stage("viewport", {backgroundColor: "white", opacity: 0});

  
  return stage_nm1.loadFile(structure_url, {name: "my_structure"}).then(function (init_component) 
  { 
    console.log("A");
    var mySstrucColors = NGL.ColormakerRegistry.addScheme(function (params) 
    {
      this.atomColor = function (atom) {
        if (atom.isDna()) {
          return 0xFFA500;  // orange
        }
        else if (atom.isRna()){
          return 0xF45C42; //orange-red
        }
        else if (atom.isHelix()){
          return 0xFF0000;  // red
        }
        else if (atom.isTurn()){
          return 0x437FF9;  // blue
        }
        else if (atom.isSheet()){
          return 0x43F970;  // green
        }
        else{
          return 0xFFFFFF; //white
        }
      };
    });
    
    //dispose of rocking and turning with keyboard controls
    stage_nm1.animationControls.dispose();
    
    var deleteLater = new Set();
    console.log("B");
    init_component.structure.eachModel( function (modelProxy)
    {
      number_of_models_nm1++;
      model_list_nm1.push(new Map())
      var model_name = modelProxy.qualifiedName();
      //console.log("nucleic and " +model_name)
      var model_number = model_name.substring(1, model_name.length)
      //nucleic acids and proteins are represented separately so DNA can be represented as a tube if desired
      var cart_nuc = init_component.addRepresentation(nuc_repr_type_nm1, {name: "_layer_0_cartoon_nuc"+ model_name, sele: "nucleic and " +model_name, color: "lightgray", opacity: 0.2}) //layer 0: transparent baselayer
      var repr_info_nuc = {index: index_nm1, nucleic: 0, DNA: 0xd3d3d3, RNA: 0xd3d3d3, helix: 0xd3d3d3, turn: 0xd3d3d3, sheet: 0xd3d3d3}
      model_list_nm1[model_number].set(cart_nuc.name, repr_info_nuc);
      index_nm1++;
      var cart_prot = init_component.addRepresentation("cartoon", {name: "_layer_0_cartoon_prot"+ model_name, sele: "(not nucleic) and " +model_name, color: "lightgray", opacity: 0.2}) //layer 0: transparent baselayer
      var repr_info_prot = {index: index_nm1, nucleic: 0, DNA: 0xd3d3d3, RNA: 0xd3d3d3, helix: 0xd3d3d3, turn: 0xd3d3d3, sheet: 0xd3d3d3}
      model_list_nm1[model_number].set(cart_prot.name, repr_info_prot);
      index_nm1++;
      cart_nuc.setVisibility(false);
      cart_prot.setVisibility(false);
      if (model_number == "0") //model 0 visible by default
      {
        cart_nuc.setVisibility(true);
        cart_prot.setVisibility(true);
      }
      console.log("C");

      var base = init_component.addRepresentation("base", {name: "_layer_0_base" + model_name , color: "lightgray", sele: model_name+"/", opacity: 0.2, cylinderOnly: 1}) //adds nucleotides as sticks
      var repr_info = {index: index_nm1, nucleic: 0, DNA: 0xd3d3d3, RNA: 0xd3d3d3, helix: 0xd3d3d3, turn: 0xd3d3d3, sheet: 0xd3d3d3}
      model_list_nm1[model_number].set(base.name, repr_info);
      base.setVisibility(false);
      if (model_number == "0") //model 0 visible by default
      {
        base.setVisibility(true);
      }
      index_nm1++;
      modelProxy.eachChain(function(chain) //layer 1, each chain is a different representation that can be turned on/off with setVisibility()
      {
        console.log("D");
        //console.log("chain:  "+chain.qualifiedName())
        var nucleic_ = 0;
        var hasPolymer = false;
        chain.eachPolymer( function(polymer)
        {
          hasPolymer = true;
          //console.log("polymer:  "+ polymer.qualifiedName())
          if (polymer.isNucleic())
          {
            nucleic_ = 1;
          }
          var polymerName = polymer.qualifiedName();
          var begin_starting_res_num = polymerName.indexOf("]");
          var end_starting_res_num = polymerName.indexOf(":");
          
          var begin_ending_res_num = polymerName.lastIndexOf("]");
          var end_ending_res_num = polymerName.lastIndexOf(":");
          var range_ = "("+polymerName.substring(begin_starting_res_num+1,end_starting_res_num)+"-"+polymerName.substring(begin_ending_res_num+1,end_ending_res_num)+")";
          
          
          var chainName = polymerName.substring(polymerName.indexOf(":"),polymerName.indexOf(" "));
          var chainName_noRange = polymerName.substring(polymerName.indexOf(":"),polymerName.indexOf(" "));
          //console.log(chainName)
          if (model_list_nm1[model_number].has(chainName))
          {
            var temp = model_list_nm1[model_number].get(chainName);
            var temp_name = chainName;
            deleteLater.add(temp_name);

            model_list_nm1[model_number].set(temp_name+temp.range, temp);
            if (multi_nm1.has(chainName))
            {
              //{start,end} pair to indicate range
              multi_nm1.get(chainName).push({start: Number(polymerName.substring(begin_starting_res_num+1,end_starting_res_num)), end: Number(polymerName.substring(begin_ending_res_num+1,end_ending_res_num))})
            }
            else
            {
              //insert array with {start, end} pair
              multi_nm1.set(chainName, [{start: Number(polymerName.substring(begin_starting_res_num+1,end_starting_res_num)), end: Number(polymerName.substring(begin_ending_res_num+1,end_ending_res_num))}]);
              //add old one
              var prev_dash = temp.range.indexOf("-",2); //making sure negative index values don't match the dash
              var prev_start = Number(temp.range.substring(1,prev_dash));
              var prev_end = Number(temp.range.substring(prev_dash+1, temp.range.length -1))
              multi_nm1.get(chainName).push({start: prev_start, end: prev_end})
            }
            
            chainName = chainName+range_;

            if (temp.nucleic)
            {
              var temp_base_name = temp_name+"_base";
              temp = model_list_nm1[model_number].get(temp_base_name);
              model_list_nm1[model_number].set(temp_name+temp.range+"_base", temp);
              deleteLater.add(temp_base_name);
            }
          }
          //console.log(chainName_noRange + " and " + range_)
          var new_rep;
          if (nucleic_)
          {
            new_rep = init_component.addRepresentation(nuc_repr_type_nm1, {name: chainName, sele: chainName_noRange + " and " + range_, color: mySstrucColors});
          }
          else
          {
            new_rep = init_component.addRepresentation("cartoon", {name: chainName, sele: chainName_noRange + " and " + range_, color: mySstrucColors});

          }
          new_rep.setVisibility(false); //sets the colored chains as invisible
          
          var repr_info = {index: index_nm1, name: chainName, range: range_, nucleic: nucleic_, visibility: 0, DNA: 0xFFA500, RNA: 0xF45C42, helix: 0xFF0000, turn: 0x437FF9, sheet: 0x43F970}
          
          model_list_nm1[model_number].set(chainName, repr_info);
          index_nm1++;

          if (polymer.isNucleic())
          {
              //console.log(chainName)
              var base = init_component.addRepresentation("base", {name: chainName+"_base", sele: chainName_noRange + " and " + range_, color: "resname", cylinderOnly: 1});
             // console.log(chainName + " and " + range_)
              base.setVisibility(false);
              var base_info = {index: index_nm1, name:chainName+"_base", range: range_, cartoon_index: index_nm1-1, cartoon_name: chainName, visibility: 0}// modified_colors: 0, DNA: 0xFFA500, RNA: 0xFFA500, helix: 0xFF0000, turn: 0x437FF9, sheet: 0x43F970}
              var base_name = chainName + "_base"
              model_list_nm1[model_number].set(base_name, base_info);
              model_list_nm1[model_number].get(chainName).nucleic = 1;
              index_nm1++;
          }
        });
        if (!hasPolymer)
        {
          var resProxy;
          var first = true;
          var start_ = -1;
          var end_ = -1;
          chain.eachResidue(function (residue)
          {
            if (first)
            {
              resProxy = residue;
              start_ = residue.resno;
            }
            first = false;
            end_ = residue.resno;
          })
          var range_ =  "" 
          //console.log(resProxy)
          var chainName = chain.qualifiedName();
          //console.log(resProxy.qualifiedName())
          //console.log(chainName+ "   " + range_)
         // ========================================//
         if(!resProxy.hetero)
         {
          if (model_list_nm1[model_number].has(chainName))
          {
            range_ = "("+start_+"-"+end_+")";
            
            var temp = model_list_nm1[model_number].get(chainName);
            var temp_name = chainName;
            model_list_nm1[model_number].set(temp_name+temp.range, temp);
            if (multi_nm1.has(chainName))
            {
              
              //{start,end} pair to indicate range
              multi_nm1.get(chainName).push({start: start_, end: end_})
            }
            else
            {
              
              //insert array with {start, end} pair
              multi_nm1.set(chainName, [{start: start_, end: end_}]);
              //add old one
              var prev_dash = temp.range.indexOf("-",2); //making sure negative index values don't mess it up
              var prev_start = Number(temp.range.substring(1,prev_dash));
              var prev_end = Number(temp.range.substring(prev_dash+1, temp.range.length -1))
              multi_nm1.get(chainName).push({start: prev_start, end: prev_end})
            }
            
            deleteLater.add(temp_name);
            

            if (temp.nucleic)
            {
              var temp_base_name = temp_name+"_base";
              temp = model_list_nm1[model_number].get(temp_base_name);
              model_list_nm1[model_number].set(temp_name+temp.range+"_base", temp);
              deleteLater.add(temp_base_name);
            }
          }
          var new_rep;
          if (nucleic_)
          {
            new_rep = init_component.addRepresentation(nuc_repr_type_nm1, {name: chainName+range_, sele: chainName+ " and "+ range_, color: mySstrucColors});
          }
          else
          {
            new_rep = init_component.addRepresentation("cartoon", {name: chainName+range_, sele: chainName+ " and "+ range_, color: mySstrucColors});
          }
          new_rep.setVisibility(false); //sets the colored chains as invisible
          
          var repr_info = {index: index_nm1, name: chainName+range_, range: range_, nucleic: nucleic_, visibility: 0, DNA: 0xFFA500, RNA: 0xF45C42, helix: 0xFF0000, turn: 0x437FF9, sheet: 0x43F970}
          
          model_list_nm1[model_number].set(chainName+range_, repr_info); //this causes the map entries to get overwritten
          index_nm1++; //increments anyways, since the heteroatoms get put into the real structure
          if (resProxy.isNucleic())
          {
              //console.log(chainName)
              var base = init_component.addRepresentation("base", {name: chainName+range_+"_base", sele: chainName+ " and "+ range_, color: "resname", cylinderOnly: 1});
             // console.log(chainName + " and " + range_)
              base.setVisibility(false);
              var base_info = {index: index_nm1, name:chainName+range_+"_base", range: range_, cartoon_index: index_nm1-1, cartoon_name: chainName, visibility: 0}// modified_colors: 0, DNA: 0xFFA500, RNA: 0xFFA500, helix: 0xFF0000, turn: 0x437FF9, sheet: 0x43F970}
              var base_name = chainName +range_+ "_base"
              model_list_nm1[model_number].set(base_name, base_info);
              model_list_nm1[model_number].get(chainName +range_).nucleic = 1;
              index_nm1++;
          }
         }
        }
      });

      var hetero = init_component.addRepresentation("ball+stick", {name: model_name + "_hetero", sele: "(hetero or ion or ligand) and (not nucleic) and "+model_name});
      hetero.setVisibility(false);
      if (model_number == "0")
      {
        hetero.setVisibility(true);
      }
      var repr_info = {index: index_nm1, nucleic: 0, visibility: 0, DNA: 0xFFA500, RNA: 0xF45C42, helix: 0xFF0000, turn: 0x437FF9, sheet: 0x43F970}; 
      model_list_nm1[model_number].set(model_name + "_hetero", repr_info);
      index_nm1++;
    })
  
  
    //console.log(deleteLater)
    cleanupDeleteLater(deleteLater);
    stage_nm1.mouseControls.remove("hoverPick"); //copied code from NGL gallery

    //tooltip
    var tooltip = document.createElement("div");
    Object.assign(tooltip.style, {
      display: "none",
      position: "fixed",
      zIndex: 10,
      pointerEvents: "none",
      backgroundColor: "rgba(0, 0, 0, 0.6)",
      color: "lightgrey",
      padding: "0.5em",
      fontFamily: "sans-serif"
    });
    stage_nm1.viewer.container.appendChild(tooltip);

    // listen to `hovered` signal to move tooltip around and change its text
    stage_nm1.signals.hovered.add(function (pickingProxy) {
      if (pickingProxy && (pickingProxy.atom || pickingProxy.bond)){
        var atom = pickingProxy.atom || pickingProxy.closestBondAtom
            var mp = pickingProxy.mouse.position
            var full_atom_name = atom.qualifiedName()
            var end_res_name = full_atom_name.indexOf(":")
            tooltip.innerText = full_atom_name.substring(0, end_res_name) //displays just residue name and number
            tooltip.style.bottom = window.innerHeight - mp.y + 3 + "px"
            tooltip.style.left = mp.x + 3 + "px"
            tooltip.style.display = "block"
      }
      else{
        tooltip.style.display = "none";
      }
    });
    document.getElementById('viewport').onmouseleave = function(){tooltip.style.display = "none";};
    stage_nm1.handleResize()
    init_component.autoView()
    var principleAxes = stage_nm1.getComponentsByName("my_structure").list[0].structure.getPrincipalAxes();
    stage_nm1.animationControls.rotate(principleAxes.getRotationQuaternion(), 0);
    
  }); 
  
};