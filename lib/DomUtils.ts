export module DomUtils {
  export function createElementFromString(html: string) {
    var container = document.createElement('div');
    container.innerHTML = html;
    return container.childNodes[0];
  }
}
