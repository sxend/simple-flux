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

    var parent = document.querySelector('#main-content > ul.parent-area');
    var attachBtn = document.querySelector('#btn-attach');
    attachBtn.onclick = function() {
      component.attach();
    };
    var detachBtn = document.querySelector('#btn-detach');
    detachBtn.onclick = function() {
      component.detach();
    };
    var addElementBtn = document.querySelector('#btn-add-element');
    addElementBtn.onclick = function() {
      var element = document.createElement('li');
      element.textContent = "added content";
      parent.appendChild(element);
    };
  };
  document.body.appendChild(script);
})();
