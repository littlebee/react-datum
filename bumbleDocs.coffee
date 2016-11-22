
module.exports = 
  
  logo: "img/docs/react-datum.logo.png",

  # these get added to the css linked to the static examples and docs and copied to 
  # docs/css
  styleSheets: [{
    path: "css/docs/docs.css"
    media: "screen"
  },{
    path: "css/docs/tilegridExample.css"
    media: "screen"
  }]

  scripts: [{
    path: "/test/lib/kittenData.js"
  }]
  
  apiDocs: {
    sections: [{
      label: "Datums" 
      path: "src/datums/*"
    },{
      label: "More Datums" 
      path: "src/datums/collectionPicker/*"
    },{
      label: "Forms, Models and Collections" 
      path: "src/*"
    }]
  }

  examples: 
    root: 'examples'
    demos: [{
      id: "model",
      name: "Model Demo",
      path: "model/model.jsx",
      description: "This demo shows how simple it is to create a display only form.", 
      thumbnailUrl: "http://zulily.github.io/react-datum/img/docs/react-datum_model-example.png",
    },{
      id: "form",
      name: "Form Demo",
      path: "form/form.jsx",
      description: "This demo shows how to create an input form that saves a Backbone model when "+
        "the user presses save.",
      thumbnailUrl: "http://zulily.github.io/react-datum/img/docs/react-datum_form-example.png",
    },{
      id: "bigKittens",
      name: "Big Kittens Demo!",
      path: "tilegrid/tilegrid.jsx",
      description: "This demo shows the pieces all come together to make a functional CRUD app. " +
        "<br>...with Kittens!<br>(data from petfinder.org api)",
    },{
      id: "examplesView",
      name: "Demos Within Demos",
      path: "examplesView.jsx",
      description: "<p>This demo is this demo viewer!</p> " +
        "<p>The demo viewer you are looking at right now, is really just a ReactDatum Tilegrid, a few "+
        "datums and a custom iframe component.</p>"+
        "<p>Be careful you don't fall in the rabbit hole by clicking too deep. :)</p>",
    }]    
