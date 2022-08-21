
let http = require(`http`)
let qs = require(`querystring`)

let server = http.createServer(handleServer)

function handleServer(req, res){
    let dataFormat = req.headers[`content-type`]
    console.log(dataFormat)
    let store = ``;
    if(req.method === `POST`){
        req.on(`data`, (chunk) => {
            store += chunk
        })
        req.on(`end`, () => {
            res.statusCode = 201;
            if(dataFormat === `application/json`){
                let parsedData = JSON.parse(store)
                res.end(`<h1>${parsedData.name}</h1><h2>${parsedData.email}</h2>`)
            }
            if(dataFormat === `application/x-www-form-urlencoded`){
                let parsedData = qs.parse(store)
                console.log(parsedData)
                res.end(`<h2>${parsedData.email}</h2>`)
            }
        })
    }

}

server.listen(6000, () => {
    console.log(`server listening on port 6000`)
})


/* DATA
{
  "name": "Joel",
  "email": "hello@joel.com",
}
*/