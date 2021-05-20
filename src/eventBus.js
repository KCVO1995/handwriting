class EventBus {
  bus = {}

  on(eventName, callback) {
    if (!this.bus[eventName]) this.bus[eventName] = []
    this.bus[eventName].push(callback)
  }

  emit(eventName) {
    if (this.bus[eventName]) this.bus[eventName].forEach(cb => cb())
  }

  off(eventName, cb) {
    const index = (this.bus[eventName] || []).indexOf(cb)
    if (index >= 0) this.bus[eventName].splice(index, 1)
  }
}

export default EventBus