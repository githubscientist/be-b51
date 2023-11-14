const fs = require('fs/promises');

async function readTestFile() {
    try {
        const data = await fs.readFile('./test.txt', 'utf-8');
        console.log(data);
    } catch (err) {
        console.log(err);
    }
}

readTestFile();