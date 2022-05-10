looker.plugins.visualizations.add({
  // Id and Label are legacy properties that no longer have any function besides documenting
  // what the visualization used to have. The properties are now set via the manifest
  // form within the admin/visualizations page of Looker
  id: "chetanyavis",
  label: "chetanyavis",
  options: {
    font_size: {
      type: "string",
      label: "Font Size",
      values: [
        {"Large": "large"},
        {"Small": "small"}
      ],
      display: "radio",
      default: "large"
    },
    CSSStyleRule:{
      type:"string",
      label:"Color",
      values:[
        {"Blue":"blue"},
        {"Green":"green"},
        {"Red":"red"}
      ],
      display:"radio",
      default:"red"
    }
  },
  // Set up the initial state of the visualization
  create: function(element, config) {

    // Insert a <style> tag with some styles we'll use later.
    element.innerHTML = `
      <style>
        .hello-world-vis {
          /* Vertical centering */
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          text-align: center;
          color:red;
        }
        .hello-world-text-large {
          font-size: 72px;
        }
        .hello-world-text-small {
          font-size: 18px;
        }
        .hello-world-text-blue{
          color:blue;
        }
        .hello-world-text-green{
          color:green;
        }
        .hello-world-text-red{
          color:red;
        }
        table, td {
          border: 2px solid black;
        }
      </style>
    `;

    // Create a container element to let us center the text.
    var container = element.appendChild(document.createElement("div"));
    container.className = "hello-world-vis";

    // Create an element to contain the text.
    //this._textElement = container.appendChild(document.createElement("table"));
    this._textElement = container.appendChild(document.createElement("table"));  
  },
  // Render in response to the data or settings changing
  updateAsync: function(data, element, config, queryResponse, details, done) {

    // Clear any errors from previous updates
    this.clearErrors();

    // Throw some errors and exit if the shape of the data isn't what this chart needs
    if (queryResponse.fields.dimensions.length == 0) {
      this.addError({title: "No Dimensions", message: "This chart requires dimensions."});
      return;
    }
    //For getting name of dimensions.
    /*for(var i=0;i<queryResponse.fields.dimensions.length;i++){
      var head=document.createElement("th");
      var headname=queryResponse.fields.dimensions[i].name;
      head.innerHTML+=LookerCharts.Utils.htmlForCell(headname);
      this._textElement.appendChild(head);
    }*/

    for(var i=0;i<data.length;i++){
      // Grab the data from cell
      var rowdata = data[i];
      //this._textElement.appendChild(document.createElement("tr"));
      var row=document.createElement('tr');
      //this._textElement
      //var row=document.createElement("p");
      for(var j=0;j<queryResponse.fields.dimensions.length;j++){
          var dataforrow=document.createElement("td");
          //this._textElement.appendChild(document.createElement("td"));
          //this._textElement.innerHTML+="<td>";
          var cell_data = rowdata[queryResponse.fields.dimensions[j].name];
          // Insert the data into the page          
          dataforrow.innerHTML+=LookerCharts.Utils.htmlForCell(cell_data);
          
          //row.innerHTML+=LookerCharts.Utils.htmlForCell(cell_data)+"&nbsp;";
          row.appendChild(dataforrow);
          //row.innerHTML+=LookerCharts.Utils.htmlForCell(cell_data)+"&nbsp;";
          //this._textElement.innerHTML+=LookerCharts.Utils.htmlForCell(cell_data)+"&nbsp;";
      //var cell_second=firstRow[queryResponse.fields.dimensions[1].name];
      }
      //data.innerHTML+="<br>"
      //row.innerHTML+="<br>"
      //row.appendChild(data);
      this._textElement.appendChild(row);
    }
  
    

    // Set the size to the user-selected size
    if (config.font_size == "small") {
      this._textElement.className = "hello-world-text-small";
    } else {
      this._textElement.className = "hello-world-text-large";
    }
    if(config.CSSStyleRule=="blue"){
      this._textElement.className="hello-world-text-blue";
    }
    else if(config.CSSStyleRule=="green"){
      this._textElement.className="hello-world-text-green";
    }
    else{
      this._textElement.className="hello-world-text-red";
    }

    // We are done rendering! Let Looker know.
    done()
  }
});