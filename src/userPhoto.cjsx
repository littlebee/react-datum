App.namespace 'App.views.widgets.react', require: [
  'react'
  'react-dom'

  'views/widgets/react/lazyPhoto'

], (x, [React, ReactDom, loadedLibs...]) ->

  ###
    A lightweight extension of LazyPhoto for loading user photos
  ###
  class x.UserPhoto extends x.LazyPhoto
    @displayName: "widgets.react.UserPhoto"

    notFoundUrl: "/img/sp3.jpg"
    subClassName: x.LazyPhoto.prototype.subClassName + " user-photo"

    @defaultProps = _.extend {}, x.LazyPhoto.defaultProps,
      attr: "imageUrl"

      
