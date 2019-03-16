const express = require("express");
const bodyParser = require("body-parser");
const net = require("net");
const fs = require("fs");
const path = require("path");
const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

function getRecordPath(interfaceName) {
    // should be complexer, with more than 1 option
    return pathToRecordFile = path.join(__dirname, '/binary_records/' + interfaceName + '/1.log');
}
app.listen(3000, ()=> {
    console.log("Server is running on port 3000");  
})
app.get("/", (req, res, next) => {
    res.send("Hello!");
});

app.post("/", function(req, res){
    let serverIP = req.body.serverIP;
    let targetPort = req.body.targetPort;
    let interfaceName = req.body.interfaceName;

    console.log("ServerIP = " + serverIP + ", Target port = " + targetPort + ", interfaceName: " + interfaceName);
    /*
        check things:
        1. Is server reachable, by ping?
    */


    res.send(req.body);  
    console.log("Opening socket for writing");

    let pathToRecordFile = getRecordPath(interfaceName);
    console.log("Playing record from the following path: " + pathToRecordFile);
    let binaryRecordEncoding = 'utf8';
    fs.readFile(pathToRecordFile, binaryRecordEncoding, function(err, contents) {
        console.log(contents);
    })
    // let client = new net.Socket(targetPort, serverIP, function() {
    //     console.log('Connected');
    //     client.write('Hello, server! Love, Client!');
    // })
})