import {Action} from './Action';
import {Store} from './Store';
import {Configuration} from './Configuration';
import {TemplateUtils} from './TemplateUtils';
import {DomUtils} from './DomUtils';
import {ObjectUtils} from './ObjectUtils';

export class Component {
  private config: Configuration;
  private action: Action;
  private store: Store;
  private root: HTMLElement;
  private markers: { [position: number]: HTMLElement } = {};
  private rendered: { [position: number]: any } = [];
  constructor(config: Configuration, action: Action, store: Store) {
    this.config = config;
    this.action = action;
    this.store = store;
  }
  attach() {
    this.initialize();
    this.store.onUpdate(this.render.bind(this));
    this.action.fetch();
  }
  private initialize() {
    this.root = <HTMLElement>document.querySelector(this.config.selector);
    for (var position of this.config.position) {
      this.markers[position] = <HTMLElement>this.root.children[position];
    }
  }
  private render() {
    var texts = this.store.getTexts();
    for (var index in texts) {
      var text = texts[index];
      var position = this.config.position[index];
      if (!!this.rendered[position]) {
        continue;
      }
      var htmlString = TemplateUtils.compile(this.config.template, text);
      var element = DomUtils.createElementFromString(htmlString);
      this.insertElement(element, this.markers[position]);
      this.rendered[position] = text;
    }
  }
  private insertElement(element: Node, after?: HTMLElement) {
    if (after) {
      this.root.insertBefore(element, after);
    } else {
      this.root.appendChild(element);
    }
  }
}
