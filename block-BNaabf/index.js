let path = require(`path`)

let relativeIndex = `./index.js`
let absoluteIndex = path.join(__dirname, relativeIndex)

console.log(absoluteIndex)