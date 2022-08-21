let http = require(`http`);
let fs = require(`fs`)
let qs = require(`querystring`)

let server = http.createServer(handleServer)

function handleServer(req, res) {
    let store = ``;
    req.on(`data`, (chunk) => {
        store += chunk;
    })
    
    req.on(`end`, ()=> {
        console.log(req.url, req.method )
        if(req.url === `/` && req.method ===`POST`){
            console.log(store, `store`)
            fs.open(`user1.txt`, `wx`, (err, fd) => {
                if(err) console.log(err)
                console.log(fd)
                console.log(`File opened successfully`)
                fs.writeFile(`./user1`, store, (err) => {
                    if(err) console.log(err)
                    console.log(`File Written Successfully`)
                })
                fs.close(fd, (err) => {
                    if(err) console.log(err)
                    console.log(`File Created Succcessfuly`)
                    res.end(`User Created Succcessfuly`)
                })
            })
        }
    })


}

server.listen(5000, () => {
    console.log(`server listening on port 5000`)
})