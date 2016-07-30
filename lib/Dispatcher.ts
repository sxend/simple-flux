import idgen from './idgen';

export class Dispatcher {
  private callbacks: {[name: string]: Function[]} = {};

  register(name: string, callback: Function) {
    if(!this.callbacks[name]) this.callbacks[name] = [];
    this.callbacks[name].push(callback);
  }
  dispatch(name: string, payload?: any) {
    if(this.callbacks[name]) this.callbacks[name].forEach(callback => callback(payload));
  }
}
