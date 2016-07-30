import {Action} from './Action';
import {Store} from './Store';
import {Configuration} from './Configuration';
import nano from './nano';
import {DomUtils} from './DomUtils';

export class Component {
  private config: Configuration;
  private action: Action;
  private store: Store;
  constructor(config: Configuration, action: Action, store: Store) {
    this.config = config;
    this.action = action;
    this.store = store;
  }
  attach() {
    this.store.onFetched((data) => {
      this.render(data);
    });
    this.action.fetch();
  }
  private render(data: any[]) {
    var elements = data.map(value => {
      var html = this.compileTemplate(value);
      return DomUtils.createDomFromString(html);
    });
    var parent = document.querySelector(this.config.selector);
    var markers = this.config.position.map(p => parent['children'][p]);
    elements.forEach((element, index) => {
      if (markers[index]) {
        parent.insertBefore(element, markers[index]);
      } else {
        parent.appendChild(element);
      }
    });
  }
  private compileTemplate(data) {
    return nano(this.config.template, data);
  }
}
