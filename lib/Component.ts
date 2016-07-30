import {Action} from './Action';
import {Store} from './Store';
import {Configuration} from './Configuration';
import nano from './nano';
import {DomUtils} from './DomUtils';

export class Component {
  private config: Configuration;
  private action: Action;
  private store: Store;
  private parent: HTMLElement;
  private markers: { [position: number]: HTMLElement };
  private fetchButton: HTMLElement;
  private rendered: { [position: number]: any } = [];
  constructor(config: Configuration, action: Action, store: Store) {
    this.config = config;
    this.action = action;
    this.store = store;
    this.store.onUpdate(() => this.render());
  }
  attach() {
    this.parent = <HTMLElement>document.querySelector(this.config.selector);
    this.markers = Object['assign'].apply(Object, [{}].concat(this.config.position.map(position => {
      return { [position]: this.parent.children[position] };
    })));
    this.fetchButton = <HTMLElement>this.parent.querySelector(".action-fetch");
    this.fetchButton.onclick = () => this.action.fetch();
    this.action.fetch();
  }
  private render() {
    var data = this.store.getData();
    if (data.length > this.config.position.length) {
      return;
    }
    data.forEach((value, index) => {
      var position = Number(Object.keys(this.markers)[index]);
      if (Object.keys(this.rendered).indexOf(String(position)) >= 0) {
        return;
      }
      var html = this.compileTemplate(value);
      var element = DomUtils.createDomFromString(html);
      this.insertElement(element, this.markers[position]);
      this.rendered[position] = value;
    });
  }
  private insertElement(element: Node, after?: HTMLElement) {
    if (after) {
      this.parent.insertBefore(element, after);
    } else {
      this.parent.appendChild(element);
    }
  }
  private compileTemplate(data) {
    return nano(this.config.template, data);
  }
}
