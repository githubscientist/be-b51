const fs = require('fs');

const content = `Session 1: ${new Date().toISOString()}`;

try {
    fs.writeFileSync('./test.txt', content);
    console.log('content written successfully!');
} catch (err) {
    console.log(err);
}