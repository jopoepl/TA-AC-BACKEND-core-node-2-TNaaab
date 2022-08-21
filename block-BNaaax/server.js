/* 
1. console.log(\_\_dirname);
2. console.log(\_\_filename);
3. use path module to join `__dirname` and `server.js` */


let http = require(`http`);
let path = require(`path`)


let server = http.createServer((req, res) => {
    console.log(__dirname);
console.log(__filename);

var formPath = path.join(__dirname, `server.js`)

console.log(formPath)

})

server.listen(5000, () => {
    console.log(`server listening on port 5000`)
})

// function handleServer(req, res){


// }

console.log(__dirname);
console.log(__filename);

var formPath = path.join(__dirname, `server.js`)

console.log(formPath)