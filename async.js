const fs = require('fs');

fs.readFile('./test.txt', 'utf-8', (err, data) => {
    if (err) throw err;
    console.log(data);
});

sayHello = () => {
    console.log('hello');
}

sayHello(); // runs before the console.log(data)