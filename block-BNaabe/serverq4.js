let http = require(`http`)
const qs = require("querystring")

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
            if(dataFormat === `application/x-www-form-urlencoded`){
                let parsedData = qs.parse(store)
                res.end(`${parsedData.team}, ${store}`)
            }
            res.statusCode = 201;
            if(dataFormat === `application/json`){
                let parsedData = JSON.parse(store)
                res.end(store)
            }
           
        })
    }

}

server.listen(9000, () => {
    console.log(`server listening on port 9000`)
})


/* DATA
{
  "team": "kxip",
  "state": "MH",
  "country": "IND",
  "pin": "12344"
}
*/