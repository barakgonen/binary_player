const express = require("express");
const bodyParser = require("body-parser");
const net = require("net");
const fs = require("fs");
const path = require("path");
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const recordsPath = __dirname + '/binary_records/';

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
  });

function getRecordPath(interfaceName) {
    // should be complexer, with more than 1 option
    return pathToRecordFile = path.join(recordsPath + interfaceName + '/1.log');
}

function getPortNumber(interfaceName){
    let port = 3213;
    // should refactor this function to be dynamic
    console.log("port for: ", interfaceName, " is: ", port);

    return port;
}
app.listen(3001, ()=> {   
    console.log("Server is running on port 3001");  
})
app.get("/", (req, res, next) => {
    var playerConfig = {}
    var key = 'interfaces-configuration'
    playerConfig[key] = [];
    fs.readdir(recordsPath, (err, files) => {
        files.forEach(file => {
            let port = getPortNumber(file)
            let data = {
                interfaceName: file,
                targetPort: port
            }
            playerConfig[key].push(data);
            console.log(playerConfig)
        })
        res.send(JSON.stringify(playerConfig));    
    })
});

app.post("/", function(req, res){
    let serverIP = req.body.serverIP;
    let targetPort = req.body.targetPort;
    let interfaceName = req.body.interfaceName;
    console.log(req.body);
    console.log("ServerIP = " + serverIP + ", Target port = " + targetPort + ", interfaceName: " + interfaceName);
    /*
        check things:
        1. Is server reachable, by ping?
    */
    //res.send(req.body);  
    console.log("Opening socket for writing");

    let pathToRecordFile = getRecordPath(interfaceName);
    console.log("Playing record from the following path: " + pathToRecordFile);
    let binaryRecordEncoding = 'utf8';
    fs.readFile(pathToRecordFile, binaryRecordEncoding, async function(err, contents) {
        let client = new net.Socket();
        client.setTimeout(1000);
        client.connect(targetPort, serverIP, async function() {
            await client.write(contents);
            console.log(contents);
            res.send("check");
        })
        client.on('end',function () {
            console.log('Client socket disconnect. ');
            client.destroy();
        });
    
        client.on('timeout', function () {
            console.log('Client connection timeout. ');
            res.send("timeout");
            client.destroy();
        });
        client.on('error', function (err) {
            console.error(JSON.stringify(err));
            client.destroy();
        });
    })

})