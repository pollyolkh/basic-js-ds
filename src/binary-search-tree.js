const { NotImplementedError } = require('../extensions/index.js');

// const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/

class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.rootNode = null;
  }

  root() {
    return this.rootNode;
  }

  add(data) {
    this.rootNode = this._insert(this.rootNode, data);
  }

  _insert(node, data) {
    if (node === null) {
      return new Node(data);
    }

    if (data < node.data) {
      node.left = this._insert(node.left, data);
    } else if (data > node.data) {
      node.right = this._insert(node.right, data);
    }

    return node;
  }

  has(data) {
    return this._search(this.rootNode, data) !== null;
  }

  _search(node, data) {
    if (node === null || node.data === data) {
      return node;
    }

    if (data < node.data) {
      return this._search(node.left, data);
    } else {
      return this._search(node.right, data);
    }
  }

  find(data) {
    return this._search(this.rootNode, data);
  }

  remove(data) {
    this.rootNode = this._remove(this.rootNode, data);
  }

  _remove(node, data) {
    if (node === null) {
      return null;
    }

    if (data < node.data) {
      node.left = this._remove(node.left, data);
    } else if (data > node.data) {
      node.right = this._remove(node.right, data);
    } else {
      if (node.left === null && node.right === null) {
        return null;
      } else if (node.left === null) {
        return node.right;
      } else if (node.right === null) {
        return node.left;
      }

      const minRight = this._findMin(node.right);
      node.data = minRight.data;
      node.right = this._remove(node.right, minRight.data);
    }

    return node;
  }

  _findMin(node) {
    while (node.left !== null) {
      node = node.left;
    }
    return node;
  }

  min() {
    const minNode = this._findMin(this.rootNode);
    return minNode ? minNode.data : null;
  }

  max() {
    const maxNode = this._findMax(this.rootNode);
    return maxNode ? maxNode.data : null;
  }

  _findMax(node) {
    while (node.right !== null) {
      node = node.right;
    }
    return node;
  }
}

module.exports = {
  BinarySearchTree
};