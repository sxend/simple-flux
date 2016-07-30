export class EventEmitter {
  private callbacks: {[name: string]: Function[]} = {};

  on(name: string, callback: Function) {
    if(!this.callbacks[name]) this.callbacks[name] = [];
    this.callbacks[name].push(callback);
  }
  emit(name: string, payload: any) {
    if(this.callbacks[name]) this.callbacks[name].forEach(callback => callback(payload));
  }
}
