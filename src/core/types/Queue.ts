class Queue<T> {
  queue: Array<T> = [];
  pop() {
    return this.queue.shift();
  }
  put(value: T) {
    return this.queue.push();
  }
}
export default Queue;
