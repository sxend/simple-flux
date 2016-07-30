import {Component} from './Component';
import {Action} from './Action';
import {Dispatcher} from './Dispatcher';
import {Store} from './Store';
import {Configuration} from './Configuration';

export module App {
  export function component(config: Configuration) {
    var dispatcher = new Dispatcher();
    var store = new Store();
    var action = new Action();
    return new Component();
  }
};
