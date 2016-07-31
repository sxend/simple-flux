import {Dispatcher} from './Dispatcher';

export class Store extends Dispatcher {
  private dispatcher: Dispatcher;
  private texts: any[] = [];
  constructor(dispatcher: Dispatcher) {
    super();
    this.dispatcher = dispatcher;
    this.dispatcher.register("Fetched", (data) => {
      this.texts = this.texts.concat(data.texts);
      this.dispatch("Update");
    });
    this.dispatcher.register("Clear", () => {
      this.texts = [];
      this.dispatch("Update");
    });
  }
  onUpdate(callback: Function) {
    this.register("Update", callback);
  }
  getTexts() {
    return this.texts;
  }
}
