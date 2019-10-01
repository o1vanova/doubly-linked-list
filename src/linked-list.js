const Node = require('./node');

class LinkedList {
    constructor() {
        this._head = null;
        this._tail = null;
        this.length = 0;
    }
    
    append(data) {
        let node = new Node(data, this._tail, null);

        if(this.isEmpty()) {
            this._head = node;
        } else {
            node.prev = this._tail;
            this._tail.next = node;
        }
        this._tail = node;

        this.length++;
        return this;
    }

    head() {
        return !this._head ? null : this._head.data;
    }

    tail() {
        return !this._tail ? null : this._tail.data;
    }

    at(index) {
        let i = 0;
        let current = this._head;
        while(!!current && i < index) {
            current = current.next;
            i++;
        }
        return !current ? null : current.data;
    }

    insertAt(index, data) {
        let i = 0;
        let current = this._head;
        while(!!current) {
            if(i === index) {
                let prev = current.prev;
                let next = current;

                if(!!prev) {
                    prev.next = null;
                }
                this._tail = prev;

                this.append(data);

                let item = this._tail;
                item.next = next;
            }

            if(!current.next) {
                this._tail = current;
                break;
            }

            current = current.next;
            i++;
        }
        return this;
    }

    isEmpty() {
        return this.length === 0;
    }

    clear() {
        this._head = null;
        this._tail = null;
        this.length = 0;

        return this;
    }

    deleteAt(index) {
        let i = 0;

        if(this.length < 2) {
            this.clear();
        } else {
            let current = this._head;
            while(!!current) {
                if(i === index) {
                    let prev = current.prev;
                    let next = current.next;
                
                    prev.next = next;
                    next.prev = prev;
                    this.length--;
                    break;
                }
                current = current.next;
                i++;
            }
        }
        return this;
    }

    reverse() {
        if(!!this._tail.prev) {
            let current = this._tail.prev;

            this._head = this._tail;
            this._head.next = this._tail.prev;
            this._head.prev = null;
            while (!!current) {
                let prev = current.prev;
                current.prev = current.next;
                current.next = prev;            

                if(!prev) {
                    this._tail = current;
                    this._tail.next = null;
                }
                current = prev;
            }
        }
        return this;
    }

    indexOf(data) {        
        let i = 0;
        let current = this._head;
        while(current && current.data !== data) {
            current = current.next;
            i++;
        }
        return !current ? -1 : i;
    }
}

module.exports = LinkedList;
