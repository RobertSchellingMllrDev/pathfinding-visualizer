class Queue<T> {
  queue: T[] = []
  pop() {
    return this.queue.shift()
  }
  put(value: T): void {
    this.queue.push(value)
  }
}
export default Queue
