let http = require(`http`)
let qs = require(`querystring`)

let server = http.createServer(handleServer)


function handleServer(req, res){
    var store = ``;
    req.on(`data`, (chunk) => {
        store += chunk;
    })

    let dataFormat = req.headers[`content-type`]
    req.on(`end`, () => {
        if(dataFormat === `application/json` && req.url === `/json`){
            let parsedData = JSON.parse(store)
            res.end(store)
        }
        if(dataFormat === `application/x-www-form-urlencoded` && req.url === `/form`){
            let parsedData = qs.parse(store)
            res.end(store)
        }

    })
    

}

server.listen(7000, () => {
    console.log(`server listening on port 7000`)
})

