let fs = require(`fs`)
let http = require(`http`)
let qs = require(`querystring`)

let server = http.createServer(handleServer)
var store = ``;


function handleServer(req, res) {       
       req.on("data", (chunk) => {
        store += chunk;
       })

    req.on(`end`, () => {
        if(req.url === `/form` && req.method === `GET`){
            res.setHeader("Content-Type", "text/html")
            fs.createReadStream(`./form.html`).pipe(res)
        }

        if(req.url === "/form" && req.method === "POST"){
            let parsedURL = qs.parse(store)
            res.end(`<h1>${parsedURL.name}</h1>, <h2>${parsedURL.email}</h2>, <h1>${parsedURL.age}</h1>`)
        }
        
       })
    }




server.listen(5678, () => {
    console.log(`server listening on port 5678`)
})