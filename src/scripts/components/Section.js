export default class Section {
  constructor(renderer, selector) {
    this._renderer = renderer;
    this._container = document.querySelector(selector);
  }
  renderItems(items) {
    items.forEach((item) => this._renderer(item));
  }

  setItem(element) {
    this._container.append(element);
  }

  prependItem(item) {
    this._container.prepend(item)
  }
}
