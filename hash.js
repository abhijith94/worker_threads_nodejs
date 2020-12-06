const crypto = require("crypto");
const {
  isMainThread,
  Worker,
  parentPort,
  workerData,
} = require("worker_threads");

async function generateHashes(count = 1) {
  return new Promise((resolve, reject) => {
    let hashes = [];

    for (let i = 0; i < count; i++) {
      let worker = new Worker(__filename);
      worker.on("message", (data) => {
        hashes.push(data);
        if (hashes.length == count) {
          resolve(hashes);
        }
      });
    }
  });
}

if (!isMainThread) {
  generateHash().then((hash) => {
    parentPort.postMessage(hash);
  });
}

function generateHash() {
  return new Promise((resolve, reject) => {
    crypto.pbkdf2("a", "b", 1000000, 10, "sha512", (err, data) => {
      resolve(data.toString("hex"));
    });
  });
}

module.exports = { generateHashes, generateHash };
