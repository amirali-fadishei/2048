import Node from "./node.js";
import LinkedList from "./linkedList.js";
class Stack {
  constructor() {
    this.limit = 5;
    this.stack = new LinkedList();
    this.length = 0;
  }

  push(board, score) {
    const newNode = new Node(null, null, {
      board: board,
      score: score,
    });
    if (!this.stack.head) {
      this.stack.head = this.stack.tail = newNode;
    } else {
      newNode.next = this.stack.head;
      this.stack.head = newNode;
    }
    this.length++;
  }
  pop() {
    if (this.length === 0) {
      return null;
    }
    const topNode = this.stack.head;
    this.stack.head = this.stack.head.next;
    this.length--;
    return topNode;
  }
  isEmpty() {
    return this.length === 0;
  }
}
export default Stack;
