/*

Code bootstrap for open the modal 
<!-- Modal  -->

   <div id="Daltonico" class="modal fade" role="dialog">
      <div class="modal-dialog">

         <!-- Modal content-->
         <div class="modal-content">
            <div class="modal-header">
               <h4 class="modal-title">Questionario para Daltonicos</h4>
               <button type="button" class="close" data-dismiss="modal"
                  onclick="TriggerModal('normal')">&times;</button>

            </div>
            <div class="modal-body">
               <h3>O porque desta pergunta como o nosso produto esta adaptado a daltonicos ao escolher vai influenciar
                  as cores para que se adapte melhor</h3>
               <hr>
               <div class="form-group">
                  <div class="col-sm-8 col-sm-offset-4">
                     <label for="myField" class="control-label">Escolha o seu tipo de Daltonismo:</label>
                     <br>
                     <div class="btn-group btn-group-toggle" data-toggle="buttons" id="search-type">
                        <label class="btn btn-secondary active">
                           <input type="radio" name="options" id="option3" autocomplete="off" value="Normal" checked> Sem Efeitos
                         </label>
                      <label class="btn btn-secondary active">
                        <input type="radio" name="options" id="option1" autocomplete="off" value="protanopia"> protanopia
                      </label>
                      <label class="btn btn-secondary">
                        <input type="radio" name="options" id="option2" autocomplete="off" value="deuteranopia"> deuteranopia
                      </label>
                    </div>
                  </div>
               </div>
            </div>
            <div class="modal-footer">
               <button type="button" class="btn btn-default" data-dismiss="modal"
                  onclick="TriggerModal('normal')">Guardar</button>
            </div>
         </div>

      </div>
   </div>

*/



function TriggerModal(arg) {
  console.log(arg);
  if (arg == "normal") {
    var radioValue = $("input[name='options']:checked").val();
    if (radioValue) {
     alert("Tipo de visao - " + radioValue);
      addcolorblind(radioValue);
    }
  } else if ("Mostrar") {
    $("#Daltonico").modal("show");
  }
}

function addcolorblind(arg) {
  console.log(arg)
  if (arg == "Normal") {
    console.log("GETALLCOLORS")
    getAllColors("Normal");
     //dont change any
  } else if (arg == "protanopia") {
    getAllColors("Protanopia");
  } else if (arg == "deuteranopia") {
    //will do on future
  }
}




function colorReplace(findHexColor, replaceWith) {
 
 //This function its not working at the moment :) just here for who ever needs
  function rgb2hex(rgb) {
      if (/^#[0-9A-F]{6}$/i.test(rgb)) return rgb;
      rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);

      function hex(x) {
          return ("0" + parseInt(x).toString(16)).slice(-2);
      }
      return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
  }
  // Select and run a map function on every tag
  $('*').map(function(i, el) {
      // Get the computed styles of each tag
      var styles = window.getComputedStyle(el);

      // Go through each computed style and search for "color"
      Object.keys(styles).reduce(function(acc, k) {
          var name = styles[k];
          var value = styles.getPropertyValue(name);
          if (value !== null && name.indexOf("color") >= 0) {
              // Convert the rgb color to hex and compare with the target color
              if (value.indexOf("rgb(") >= 0 && rgb2hex(value) === findHexColor) {
                  // Replace the color on this found color attribute
                  $(el).css(name, replaceWith);
              }
          }
      });
  });
}




function getAllColors(typecolor) {
  var rgbRegex = /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/;

  var allColors = [];

  var elems = document.getElementsByTagName('*');
  var total = elems.length;

  var x,y,elemStyles,styleName,styleValue,rgbVal;

  for(x = 0; x < total; x++) {
      elemStyles = window.getComputedStyle(elems[x]);

      for(y = 0; y < elemStyles.length; y++) {
          styleName = elemStyles[y];
          styleValue = elemStyles[styleName];

          if(!styleValue) {
              continue;
          }

          // convert to string to avoid match exceptions
          styleValue += "";

          rgbVal = styleValue.match(rgbRegex);
          if(!rgbVal) { // property does not contain a color
              continue;
          }

          if(allColors.indexOf(rgbVal.input) == -1) { // avoid duplicate entries
              allColors.push(rgbVal.input);
          }

      }

  }

  if (typecolor == "Protanopia"){
    console.log(typecolor);
    for(z = 0; z < allColors.length; z++){
      // DEBUG STUFF ---- console.log(allColors[z]);

      //Ira ser introduzido as cores a alterar
      /*
      colorReplace(#COLORTOFIND, #NEWCOLOR)
      */ 
      if(allColors[z] == "rgb(84,91,98)"){
        colorReplace("#545b62", "#5a5a61");
      
      }else if (allColors[z] == "rgb(78, 85, 91)"){
        colorReplace("rgb(78, 85, 91)", "#55545b");
       
      }else if (allColors[z] =="rgb(108, 117, 125)"){
        colorReplace("#6c757d","#73727b");
      
      }else if (allColors[z] =="rgb(239, 239, 239)"){
        colorReplace("#efefef","#f3edee");
     
      }else if (allColors[z] =="rgb(12, 15, 56)"){
        colorReplace("#0c0f38","#001a36");
      
      }else if (allColors[z] =="rgb(253, 212, 48)"){
        colorReplace("#fdd430","#f2d734");
       
      }else if (allColors[z] =="rgb(130, 55, 228)"){
        colorReplace("#8237e4","#0062cb");
      
      }else if (allColors[z] =="rgb(206, 207, 215)"){
        colorReplace("#cecfd7","#d0cdd5");
       
      }else if (allColors[z] =="rgb(9, 8, 8)"){
        colorReplace("#090808","#111111");
       
      }else if (allColors[z] =="rgb(126, 4, 197)"){
        colorReplace("#7e04c5","#0051a7");
      
      } 
    }
   //This is just to change the images 
    document.getElementById("CrystalPrimeira").src = "images/Protanomaly/Crystal.png";
  }
}
