const {Worker} = require("worker_threads");


// function fibanacci(n) {
//     return n < 0 ? 0 : n <= 2 ? 1 : fibanacci(n - 1)  + fibanacci(n - 2);
// }

const doFib = (iterations) => new Promise((resolve, reject) => {
    const start = Date.now();

    const worker = new Worker("./worker.js", {
        workerData: {
            iterations,
        }
    })
    // const result = fibanacci(iterations);

    worker.on("message", (data) => {
        console.log(`[${worker.threadId}] worker done in ${Date.now() - start} ms`);
        resolve(data);

    })
    
    // console.log(`do fib done in ${start - Date.now()}ms`);
    worker.on("error", (err) => reject(err));
    // resolve(result);
})


async function main() {
    const start = Date.now();

    const value = await Promise.all([
        doFib(40),
        doFib(40),
        doFib(40),
        doFib(40),
        doFib(40),
        doFib(40),
        doFib(40),
        doFib(40),
    ]);
    console.log(value);
    console.log(`do all fib done in ${start - Date.now()}`);

}

// main().catch(err => console.error(err));

// task two
const sharedBuffer = new SharedArrayBuffer(4);
const buffer = new Uint8Array(sharedBuffer);

buffer.fill(10);
console.log(buffer);

const worker = new Worker("./share.js", {
    workerData: {
        sharedBuffer,
    }
})
worker.once("message", () => {console.log(buffer);})
