// - capture absolute path of `server.js`(itself)
// - get absolute path of `app.js`
// - get realtive path of `index.html`
// - get absolute path of `index.html` using `path module` 


let path = require(`path`);

let absolutePathServer = path.join(__dirname, `./server.js`)
let absolutePathApp = path.join(__dirname, `./app.js`)
let relativePathIndex = `./index.html`
let absolutePathIndex = absolutePathServer = path.join(__dirname, `./index.js`)


console.log(absolutePathServer, absolutePathApp, absolutePathIndex, relativePathIndex)