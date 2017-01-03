const fs = require('fs');
const readline = require('readline');
const path = require('path');

const Util = {
    getFile: (filePath) => {
        return new Promise((resolve, reject) => {
            fs.readFile(filePath, 'utf-8', (err, data) => {
                (!err && data) ? resolve(data) : reject(err);
            });
        });
    },
    writeFile: (filePath, data) => {
        return new Promise((resolve, reject) => {
            fs.writeFile(process.cwd() + filePath, data, (err, data) => {
                !err ? resolve(data) : reject(err);
            });
        });
    },
    questionSync: (query) => {
        return new Promise((resolve, reject) => {
            const rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout
            });
            rl.question(query, (answer) => {
                rl.close();
                resolve(answer);
            });
        });
    }
}

module.exports = Util; 