export default class DomHelpers {

  /**
   * Check if parent element nests child element.
   *
   * @param parent possible parent
   * @param child possible child
   * @returns {boolean}
   */
  static isChild (parent, child): Boolean {
    let node = child.parentNode;
    while (node) {
      if (node === parent) {
        return true
      }
      node = node.parentNode;
    }
    return false
  }
}