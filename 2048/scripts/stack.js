import Node from "./node.js";
import LinkedList from "./linkedList.js";
class Stack {

  constructor() {
    this.limit = 5;
    this.stack = new LinkedList();
    this.length = 0;
  }

  push(board) {
    const newNode = new Node(null, null, board);
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
    return topNode.value;
  }
  isEmpty() {
    return this.length === 0;
  }
  
}
export default Stack;