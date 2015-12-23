
module.exports = {
  // contextual components
  ClickToEditForm:   require('./src/clickToEditForm'),
  Collection:        require('./src/collection'),
  CollectionStats:   require('./src/collectionStats'),
  Form:              require('./src/form'),
  Model:             require('./src/model'),
  SelectedModel:     require('./src/selectedModel'),
  Datum:             require('./src/datums/datum'),
  Email:             require('./src/datums/email'),
  LazyPhoto:         require('./src/datums/lazyPhoto'),
  Link:              require('./src/datums/link'),
  Number:            require('./src/datums/number'),
  Text:              require('./src/datums/text'),
  WholeNumber:       require('./src/datums/wholeNumber'),

  // TODO : i think this will eventually go to a separate npm package so that the core doesn't
  //    have dependency on react-select
  CollectionPicker: require('./src/datums/collectionPicker/collectionPicker')

}
