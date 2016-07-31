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
  private isAttached: boolean = false;
  private root: HTMLElement;
  private observer: MutationObserver;
  private markers: { [position: number]: HTMLElement } = {};
  private rendered: { [position: number]: any } = {};
  constructor(config: Configuration, action: Action, store: Store) {
    this.config = config;
    this.action = action;
    this.store = store;
  }
  attach() {
    if(this.isAttached) {
      return;
    }
    this.root = <HTMLElement>document.querySelector(this.config.selector);
    for (var position of this.config.position) {
      this.markers[position] = <HTMLElement>this.root.children[position];
    }
    this.observer = new MutationObserver(this.onRootChange);
    this.observer.observe(this.root, {
      childList: true
    });
    this.store.onUpdate(this.render.bind(this));
    this.action.fetch();
    this.isAttached = true;
  }
  detach() {
    if(!this.isAttached) {
      return;
    }
    this.root = null;
    if (this.observer) {
      this.observer.disconnect();
    }
    this.observer = null;
    this.markers = {};
    Object.keys(this.rendered).forEach(position => this.rendered[position].element.remove());
    this.rendered = {};
    this.action.clear();
    this.isAttached = false;
  }
  private onRootChange(mutations: MutationRecord[], observer: MutationObserver): void {
    console.log("onRootChange is not implemented");
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
      element['__isInserted'] = true;
      this.insertElement(element, this.markers[position]);
      this.rendered[position] = {
        element: element,
        text: text
      };
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
