import {Dispatcher} from './Dispatcher';
import idgen from './idgen';

export class Action {
  private dispatcher: Dispatcher;
  constructor(dispatcher: Dispatcher) {
    this.dispatcher = dispatcher;
  }
  fetch() {
    var id = idgen();
    var callback = 'callback_' + id;
    var url = '//localhost:9000/demo/demo.jsonp?callback=' + callback;
    window[callback] = (payload) => {
      this.dispatcher.dispatch("Fetched", payload);
    };
    var script = document.createElement('script');
    script.async = true;
    script.src = url;
    document.body.appendChild(script);
  }
}
