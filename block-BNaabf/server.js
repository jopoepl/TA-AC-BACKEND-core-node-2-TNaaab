let fs = require(`fs`)
let http = require(`http`)
let qs = require(`querystring`)

let server = http.createServer(handleServer)


function handleServer(req, res) {
    if(req.url === `/form` && req.method === `GET`){
        fs.createReadStream(`./form.html`).pipe(res)
    }
    if(req.url === `/form` && req.method === `POST`){
        let store = ``;
       req.on(`data`, (chunk) => {
        store += chunk;
       })
       req.on(`end`, () => {
        console.log(store)
        let parsedData = qs.parse(store)
        res.end(`<h1>${parsedData.name}</h1><h2>${parsedData.email}</h2><h3>${parsedData.age}</h3>`)

        if(req.url === `/result` && req.method === `POST`){
        res.end(`<h1>${parsedData.name}</h1><h2>${parsedData.email}</h2><h3>${parsedData.age}</h3>`)
        }
        
       })
    }
}


server.listen(5678, () => {
    console.log(`server listening on port 5678`)
})