import {Dispatcher} from './Dispatcher';
import idgen from './idgen';

export class Action {
  private dispatcher: Dispatcher;
  constructor(dispatcher: Dispatcher) {
    this.dispatcher = dispatcher;
  }
  fetch() {
    var id = idgen();
    var cb = 'callback_' + id;
    var url = '//localhost:9000/demo/demo.jsonp?callback=' + cb;
    window[cb] = (data) => {
      this.dispatcher.dispatch({
        actionType: "Fetched",
        data: data.data
      });
    };
    var script = document.createElement('script');
    script.async = true;
    script.src = url;
    document.body.appendChild(script);
  }
}
