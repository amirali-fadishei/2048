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
      this.head = this.tail = newNode;
    } else {
      this.tail = this.tail.next = newNode;
    }

    this.length++;
  }

  remove(i, j) {
    let nextPointer = this.head;
    let lastPointer = null;

    while (nextPointer) {
      if (nextPointer.row === i && nextPointer.column === j) {
        if (lastPointer) {
          lastPointer.next = nextPointer.next;
        } else {
          this.head = nextPointer.next;
        }
        if (nextPointer === this.tail) {
          this.tail = lastPointer;
        }
        this.length--;
        return true;
      }
      lastPointer = nextPointer;
      nextPointer = nextPointer.next;
    }

    return false;
  }

  find(i, j) {
    let nextPointer = this.head;

    while (nextPointer) {
      if (nextPointer.row === i && nextPointer.column === j) return nextPointer;
      nextPointer = nextPointer.next;
    }

    return null;
  }

  traverse(callback) {
    let nextPointer = this.head;

    while (nextPointer) {
      callback(nextPointer);
      nextPointer = nextPointer.next;
    }
  }
}
export default LinkedList;
