(function() {
  var script = document.createElement('script');
  script.src = "//localhost:9000/dist/bundle.js"
  script.async = true;
  script.onload = function() {
    var component = Flux.component({
      selector: '#main-content > ul',
      position: [
        0, 2, 4
      ],
      template: "<li>{text}</li>"
    });
    component.attach();
  };
  document.body.appendChild(script);
})();
