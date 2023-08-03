const { workerData, parentPort } = require("worker_threads");

function fibanacci(n) {
  return n < 0 ? 0 : n <= 2 ? 1 : fibanacci(n - 1) + fibanacci(n - 2);
}

const result = fibanacci(workerData.iterations);

parentPort.postMessage(result);