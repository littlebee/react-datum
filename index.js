

var ReactDatum = {
  // contextual components
  ClickToEditForm:   require('./src/clickToEditForm'),
  ContextualData:    require('./src/contextualData'),
  Collection:        require('./src/collection'),
  CollectionStats:   require('./src/collectionStats'),
  Form:              require('./src/form'),
  Model:             require('./src/model'),
  SelectedModel:     require('./src/selectedModel'),
  
  // Datums
  Datum:             require('./src/datums/datum'),
  Email:             require('./src/datums/email'),
  LazyPhoto:         require('./src/datums/lazyPhoto'),
  Link:              require('./src/datums/link'),
  Number:            require('./src/datums/number'),
  Percent:           require('./src/datums/percent'),
  Text:              require('./src/datums/text'),
  Label:             require('./src/datums/label'),
  WholeNumber:       require('./src/datums/wholeNumber'),
  
  // react-select 
  ReactSelect:       require('./node_modules/react-select'),
  SelectOption:      require('./node_modules/react-select/src/Option.js'),
  
  // Global options
  Options:           require('./src/options'),
  
  // TODO : i think this will eventually go to a separate npm package so that the core doesn't
  //    have dependency on react-select
  CollectionPicker: require('./src/datums/collectionPicker/collectionPicker')

}
if(window)
  window.ReactDatum = ReactDatum

if(module)
  module.exports = ReactDatum
  
  
