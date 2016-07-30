import idgen from './idgen';

export class Dispatcher {
  private callbacks: { [id: string]: Function } = {};

  register(callback: Function): string {
    var id = idgen();
    this.callbacks[id] = callback;
    return id;
  }
  unregister(id: string): void {
    delete this.callbacks[id];
  }
  dispatch(payload: any): void {
    Object.keys(this.callbacks).forEach(id => {
      this.callbacks[id](payload, id);
    });
  }
}
