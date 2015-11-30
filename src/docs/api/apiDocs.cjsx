    
React = require('react')

marked = require('marked')
nsh = require('node-syntaxhighlighter')
language =  require('jsx-syntaxhighlighter')

# marked is a markdown to html converter
marked.setOptions(
  highlight: (code) ->
    nsh.highlight(code, language) 
)


Markdown = React.createClass
  render: ->
    content = @props.content
    content = @props.content.join("\n") if _.isArray(@props.content)
    markdown = marked(content)
    <div className="markdown">
      {markdown}
    </div>

    
TocListItems = React.createClass
  render: ->
    lis = []
    for klass in @props.listComponents
      lis.push <li key={klass.id}>
        <a href={'#' + klass.id}>{klass.name}</a>
      </li>
    
    return (
      <ul>
        {lis}
      </ul>
    )
    
TocSection = React.createClass
  render: ->
    <section>
      <h4>{@props.label}</h4>
      <TocListItems {...@props}/>
    </section>
    
    
Toc = React.createClass 
  render: ->
    <div className="toc">
      <TocSection label="Datum Components" listComponents={@props.datumClasses}/>
      <TocSection label="Contextual Components" listComponents={@props.otherClasses}/>
    </div>


DocSection = React.createClass
  render: ->
    <section>
      <h2>{@props.label}</h2>
      {@renderComponentDocs()}
    </section>
    
  renderComponentDocs: ->
    contents = []
    for klass in @props.listComponents
      contents.push <div className="component-doc" id={klass.id} key={klass.id}>
        <h3>{klass.name}</h3>
        <div>{klass.signature}</div>
        <Markdown content={klass.comment}/>
        <h4>propTypes:</h4>
        <Markdown content={klass.propTypes}/>
        <h4>defaultProps:</h4>
        <Markdown content={klass.defaultProps}/>
        <h4>defaultProps:</h4>
        <Markdown content={klass.defaultProps}/>
      </div>      
      

DocContent = React.createClass 
  render: ->
    <div className='doc-content'>
      <DocSection label="Datum Components" listComponents={@props.datumClasses}/> 
      <DocSection label="Contextual Components" listComponents={@props.otherClasses}/>
    </div>

    
module.exports = ApiDocs = React.createClass 
  render: ->
    <div className='sidebar'>
      <Toc {...@props}/>
      <DocContent {...@props}/>
    </div>
