import {EventEmitter} from './EventEmitter';
import {Dispatcher} from './Dispatcher';

export class Store extends EventEmitter {
  private dispatcher: Dispatcher;
  constructor(dispatcher: Dispatcher) {
    super();
    this.dispatcher = dispatcher;
    this.dispatcher.register((payload) => {
      if (payload.actionType === "Fetched") {
        this.emit("Fetched", payload.data);
      }
    });
  }
  onFetched(f) {
    this.on("Fetched", f);
  }
}
