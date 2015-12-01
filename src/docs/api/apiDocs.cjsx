    
React = require('react')
_ = require('underscore')

marked = require('marked')
nsh = require('node-syntaxhighlighter')
language =  require('jsx-syntaxhighlighter')

# marked is a markdown to html converter
marked.setOptions(
  highlight: (code) ->
    nsh.highlight(code, language) 
)


    
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
    <div className="toc no-print">
      <TocSection label="Datum Components" listComponents={@props.datumClasses}/>
      <TocSection label="Contextual Components" listComponents={@props.otherClasses}/>
    </div>


Markdown = React.createClass
  render: ->
    content = @props.content
    return null unless content?
    content = @props.content.join("\n") if _.isArray(@props.content)
    label = if @props.label then <h4>{@props.label}</h4> else null
    markdown = <span dangerouslySetInnerHTML={{__html: marked(content)}}/>
    
    return (
      className = "markdown " + @props.className
      <div className={className}>
        {label}
        {markdown}
      </div>
    )
    
    
DocSection = React.createClass
  render: ->
    <section>
      <h2>{@props.label}</h2>
      {@renderComponentDocs()}
    </section>
    
  renderComponentDocs: ->
    contents = []
    for klass in @props.listComponents
      contents.push( 
        <div className="component-doc" id={klass.id} key={klass.id}>
          <div className="signature">{klass.signature}</div>
          <h3 className="followMeBar">{klass.name}</h3>
          <div className="content">
            <Markdown content={klass.comment}/>
            <Markdown className="no-gutter" label="#{klass.name} propTypes: " content={klass.propTypes}/>
            <Markdown className="no-gutter" label="#{klass.name} defaultProps: " content={klass.defaultProps}/>
            <Markdown className="no-gutter" label="#{klass.name} contextTypes: " content={klass.contextTypes}/>
          </div>
        </div>      
      )
    return contents
      

DocContent = React.createClass 
  render: ->
    <div className='doc-content'>
      <DocSection label="Datum Components" listComponents={@props.datumClasses}/> 
      <DocSection label="Contextual Components" listComponents={@props.otherClasses}/>
    </div>

    
module.exports = ApiDocs = React.createClass 
  render: ->
    <div className='api-docs'>
      <Toc {...@props}/>
      <DocContent {...@props}/>
    </div>