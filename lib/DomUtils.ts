export module DomUtils {
  export function createDomFromString(html: string) {
    var container = document.createElement('div');
    container.innerHTML = html;
    return container.childNodes[0];
  }
}
