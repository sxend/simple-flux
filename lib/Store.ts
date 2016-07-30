import {Dispatcher} from './Dispatcher';

export class Store extends Dispatcher {
  private dispatcher: Dispatcher;
  private data: any[] = [];
  constructor(dispatcher: Dispatcher) {
    super();
    this.dispatcher = dispatcher;
    this.dispatcher.register("Fetched", (payload) => {
      this.data = this.data.concat(payload.data);
      this.dispatch("Update");
    });
  }
  onUpdate(callback: Function) {
    this.register("Update", callback);
  }
  getData() {
    return this.data;
  }
}
