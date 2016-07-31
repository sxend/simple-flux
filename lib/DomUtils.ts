export module DomUtils {
  export function createElementFromString(html: string) {
    var container = document.createElement('div');
    container.innerHTML = html;
    var element = container.childNodes[0];
    return element;
  }
}
