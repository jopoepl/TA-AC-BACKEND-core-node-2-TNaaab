let http = require(`http`);
let fs = require(`fs`)
let qs = require(`querystring`)
let url = require(`url`)

let server = http.createServer(handleServer)

function handleServer(req, res) {
    let store = ``;
    req.on(`data`, (chunk) => {
        store += chunk;
    })
    
    req.on(`end`, ()=> {
        let parsedURL = url.parse(req.url, true)
        console.log(req.url, req.method )
        if(req.url === `/users` && req.method ===`POST`){
            handlePost(res, store)
        } else if(parsedURL.pathname === `/users` && req.method === `GET`){
            handleGet(res, parsedURL)
        } else if(parsedURL.pathname === `/users` && req.method === `DELETE`){
            handleDel(res, parsedURL)
        } else if(parsedURL.pathname === `/users` && req.method === `PUT`){
            handleUpdate(res, store, parsedURL)
        } else {
            res.statusCode = 404;
            res.end(`404 - PAGE NOT FOUND`)
        }


        
    })


}

function handleGet(res, parsedURL){

    fs.readFile( `${__dirname}/users/${parsedURL.query.username}.json`, (err, user) => {
        if(err) console.log(err);
        res.end(user)
    })

}



function handleDel(res, parsedURL){
    fs.unlink( `${__dirname}/users/${parsedURL.query.username}.json`, (err, user) => {
        if(err) console.log(err);
        res.end(`user deleted`)
    })

}

function handleUpdate(res, store, parsedURL){
    console.log(store , `--- STORE UPDATE`)
    fs.open( `${__dirname}/users/${parsedURL.query.username}.json` + `.json`, `r+`, (err) => {
        if(err) console.log(err)
        console.log(`File opened successfully`)
        var fd = fs.openSync(`${__dirname}/users/${parsedURL.query.username}.json`, `r+`)
        console.log(fd ,`FD`)
        fs.ftruncate(fd , (err) => console.log(err))
        fs.writeFile(fd, store, (err) => {
            if(err) console.log(err)
            console.log(`File Written Successfully`)
        })
        fs.close(fd, (err) => {
            if(err) console.log(err)
            console.log(`File Created Succcessfuly`)
            res.end(`User Updated Succcessfuly`)
        })
    })

}


function handlePost (res, store) {
    
        let userName = JSON.parse(store).name
        let userPath = __dirname
        console.log(userPath, `path`)
        fs.open(userPath + `/users/${userName}` + `.json`, `wx`, (err, fd) => {
            if(err) console.log(err)
            console.log(fd)
            console.log(`File opened successfully`)
            fs.writeFile(fd, store, (err) => {
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
server.listen(5000, () => {
    console.log(`server listening on port 5000`)
})