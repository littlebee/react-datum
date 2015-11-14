
module.exports = 
  # contextual components
  ClickToEditForm: require './clickToEditForm'
  Collection: require './collection'
  CollectionStats: require './collectionStats'
  Form: require './form'
  Model: require './model'
  SelectedModel: require './selectedModel'
  Tilegrid: require './tilegrid'

  # datums (in alpha order please)
  Datum: require './datums/datum'
  Email: require './datums/email'
  LazyPhoto: require './datums/lazyPhoto'
  Link: require './datums/link'
  Number: require './datums/number'
  Text: require './datums/text'
  WholeNumber: require './datums/wholeNumber'
  
  # TODO : i think this will eventually go to a separate npm package so that the core doesn't
  #    have dependency on react-select
  CollectionPicker: require './datums/collectionPicker/collectionPicker'


