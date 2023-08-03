const { workerData , parentPort} = require('worker_threads');

const arr = new Uint8Array(workerData.sharedBuffer);
arr[1] = 3;
arr.fill(2)
parentPort.postMessage(arr);