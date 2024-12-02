import Node from "./node.js";
class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }
  add(i, j, value) {
    const newNode = new Node(i, j, value);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.length++;
  }
  remove(i, j) {
    let current = this.head;
    let previous = null;
    while (current) {
      if (current.i === i && current.j === j) {
        if (previous) {
          previous.next = current.next;
        } else {
          this.head = current.next;
        }
        if (current === this.tail) {
          this.tail = previous;
        }
        this.length--;
        return true;
      }
      previous = current;
      current = current.next;
    }
    return false;
  }
  find(i, j) {
    let current = this.head;
    while (current) {
      if (current.row === i && current.column === j) {
        return current;
      }
      current = current.next;
    }
    return null;
  }
  traverse(callback) {
    let current = this.head;
    while (current) {
      callback(current);
      current = current.next;
    }
  }
}
export default LinkedList;
