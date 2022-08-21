let http = require(`http`)

let server = http.createServer(handleServer)

function handleServer(req, res){
    if(req.method === `POST` && req.url === `/`) {
    var store =``;
    req.on(`data`, (chunk) => {
        store += chunk;
    })
    req.on(`end`, () => {
        console.log(store)
            res.setHeader("Content-Type", "text/plain")

        res.write(store)
        res.end()
    })
        
}

}

server.listen(3456, () => {
    console.log(`server listneing on port 3456`)
})