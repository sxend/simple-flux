import {Action} from './Action';
import {Store} from './Store';
import {Configuration} from './Configuration';

export class Component {
  private config: Configuration;
  private action: Action;
  constructor(config: Configuration, action: Action, store: Store) {
    this.action = action;
  }
  attach() {
    this.store.onFetched((data) => {
      this.render(data);
    });
    this.action.fetch();
  }
  private render(data: any[]) {

    console.log(values);
  }
}
