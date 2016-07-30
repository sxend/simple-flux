(function() {
  var script = document.createElement('script');
  script.src = "//localhost:9000/dist/bundle.js"
  script.async = true;
  script.onload = function() {
    var component = Flux.component({
      selector: '#main-content > ul.parent-area',
      position: [
        0, 2, 4
      ],
      interval: 2,
      template: "<li>{value}</li>"
    });
    component.attach();

    var parent = document.querySelector('#main-content > ul.parent-area');
    var addElementBtn = document.querySelector('#btn-add-element');
    addElementBtn.onclick = function() {
      var element = document.createElement('li');
      element.textContent = "added content";
      parent.appendChild(element);
    };
  };
  document.body.appendChild(script);
})();
