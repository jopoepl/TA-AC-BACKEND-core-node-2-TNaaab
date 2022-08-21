let http = require(`http`)
let qs = require(`querystring`)

let server = http.createServer(handleServer)

function handleServer(req, res){
    let store = ``;
    if(req.method === `POST`){
        req.on(`data`, (chunk) => {
            store += chunk
        })
        req.on(`end`, () => {
            res.statusCode = 201;
            let parsedData = qs.parse(store)
            res.end(parsedData.captain)
        })
    }

}

server.listen(3000, () => {
    console.log(`server listening on port 3000`)
})