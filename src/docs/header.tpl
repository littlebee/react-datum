<header>
  <div>
    <img src="<%=relativeRoot%>/docs/img/react-datum.logo.png" href="/docs"><em>A set of React components for interacting with Backbone collections and models</em>
  </div>
  <div class='main-menu'>
    <a class='main-menu-item' href="<%=relativeRoot%>/docs">Introduction and Getting Started </a>
    <a class='main-menu-item' href="<%=relativeRoot%>/docs/examples">Live Demo &amp; Examples</a>
    <a class='main-menu-item' href="<%=relativeRoot%>/docs/api">API Docs</a>
    <a class='main-menu-item' href="https://github.com/zulily/react-datum" target="blank">
      View on Github
    </a>
  </div>
</header>

<script>
  $($($('.main-menu-item')[<%= selectedItem %>]).addClass('selected'))
</script>