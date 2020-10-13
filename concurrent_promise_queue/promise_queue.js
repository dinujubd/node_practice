const delay = (seconds) => new Promise((resolve) => {
    setTimeout(resolve, seconds * 1000);
});

//process.stdout.write('\u001B[2J\u001B[0;0f')

const tasks = [
    delay(3),
    delay(9),
    delay(2),
    delay(10),
    delay(1),
    delay(5),
    delay(8),
    delay(6),
    delay(4),
    delay(7),
];

class PromiseQueue {
    constructor(promises = [], concurrntCount = 1) {
        this.concurrent = concurrntCount;
        this.total = promises.length;
        this.todo = promises;
        this.running = [];
        this.completed = [];
    }

    get runAnother() {
        return this.running.length < this.concurrent && this.todo.length;
    }

    graphTasks() {
        const { todo, running, completed } = this;
        process.stdout.write('\u001B[2J\u001B[0;0f')
        console.log(`
        todo:       [${todo.map(_ => 'X')}]
        running:    [${running.map(_ => 'X')}]
        completed:  [${completed.map(_ => 'X')}]
        `);
    }

    run() {
        while (this.runAnother) {
            const promise = this.todo.shift();

            promise.then(() => {
                this.completed.push(this.running.shift())
                this.graphTasks()
                this.run()
            });


            this.running.push(promise)
            this.graphTasks();
        }
    }
}

const delayQueue = new PromiseQueue(tasks, 1)
delayQueue.run();