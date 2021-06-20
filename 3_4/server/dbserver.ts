import * as Http from "http";
import * as Url from "url";
import * as Mongo from "mongodb";

export namespace Aufgabe3_4 {

    interface Daten {
        vorname: string;
        nachname: string;
        mail: string;
    }

    let dbURL: string = "mongodb+srv://gis-sose-2021.veqpi.mongodb.net";
    //let urlDBLokal: string = "mongodb://localhost:27017";

    let port: number = Number(process.env.PORT);

    if (!port) {
        port = 8100;    //Port für lokalen Server erstellen
    }

    serverStarten(port);

    function serverStarten(_port: number | string): void {
        let server: Http.Server = Http.createServer();  //Server erstellen
        server.listen(_port);   // wird auf eine request bzw. antwort "gehört"
        server.addListener("request", handleRequest);
        console.log("Der Server wurde gestartet!");
    }

    async function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): Promise<void> {

        _response.setHeader("content-type", "text/html; charset=utf-8");    //HTML Head festlegen
        _response.setHeader("Access-Control-Allow-Origin", "*");    //Alle dürfen darauf zugreifen

        if (_request.url) {
            let url: Url.UrlWithParsedQuery = Url.parse(_request.url, true);    //Umwandeln in Array
            let path: string = <string>url.pathname;    //Url in String umwandeln
            let daten: Daten = { vorname: url.query.vorname + "", nachname: url.query.nachname + "", mail: url.query.mail + "" };

            if (path == "/empfangen") {
                let datenEmpf: Daten[] = await datenLesen(dbURL);
                _response.write(JSON.stringify(datenEmpf));     //Inhalt der Datenbank auslesen
                console.log(datenEmpf);

            } else if (path == "/senden") {

                let datenSend: string = await speichern(dbURL, daten);
                _response.write(datenSend);
                console.log(datenSend);
            }
        }
        _response.end();    //Daten zurückschicken
    }

    async function datenLesen(_url: string): Promise<Daten[]> {

        let options: Mongo.MongoClientOptions = { useNewUrlParser: true, useUnifiedTopology: true };
        let mongoClient: Mongo.MongoClient = new Mongo.MongoClient(_url, options);
        await mongoClient.connect();

        let data: Mongo.Collection = mongoClient.db("3_4").collection("Daten");     //auf Datenbank bzw. Collection zugreifen
        let cursor: Mongo.Cursor = data.find();
        let inhalt: Daten[] = await cursor.toArray();

        return inhalt;
    }


    async function speichern(_url: string, _daten: Daten): Promise<string> {

        let options: Mongo.MongoClientOptions = { useNewUrlParser: true, useUnifiedTopology: true };
        let mongoClient: Mongo.MongoClient = new Mongo.MongoClient(_url, options);
        await mongoClient.connect();

        let data: Mongo.Collection = mongoClient.db("3_4").collection("Daten");     //auf Datenbank bzw. Collection zugreifen
        data.insertOne(_daten);     //Daten in DAtenbank eintragen
        let antwort: string = "Daten gespeichert";
        return antwort;

    }




}


//server.ts aus 3_2
// console.log("Starting server");
// let port: number = Number(process.env.PORT);
// if (!port)
//     port = 8100;

// let server: Http.Server = Http.createServer();
// server.addListener("request", handleRequest);
// server.addListener("listening", handleListen);
// server.listen(port);

// function handleListen(): void {
//     console.log("Listening");
// }


// function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): void {
//     console.log("I hear voices!");
//     console.log(_request.url);

//     _response.setHeader("content-type", "text/html; charset=utf-8");
//     _response.setHeader("Access-Control-Allow-Origin", "*");

//     if (_request.url) {
//         let url: Url.UrlWithParsedQuery = Url.parse(_request.url, true);
//         let pfad: string = <string>url.pathname;
//         if (pfad == "/html") {
//             for (let key in url.query) {
//                 _response.write(key + ": " + url.query[key] + "<br/>");
//             }
//         }
//         else if (pfad == "/json") {
//             let jsonString: string = JSON.stringify(url.query);
//             console.log(jsonString);
//             _response.write(jsonString);
//         }
//     }
//     _response.end();
// }






// import * as Mongo from "mongodb";


// async function connectToDB(_url: string): Promise<void> {

//     let options: Mongo.MongoClientOptions = { useNewUrlParser: true, useUnifiedTopology: true };

//     let mongoClient: Mongo.MongoClient = new Mongo.MongoClient(_url, options);
//     await mongoClient.connect();

//     let students: Mongo.Collection = mongoClient.db("Test").collection("Students");

//     let s: Student = {name: "Kiefer", firstname: "Corni", registration: 7803309};
//     students.insertOne(s);

//     let cursor: Mongo.Cursor = students.find(); 
//     let result: Student[] = await cursor.toArray();
//     console.log(result);
// }

// connectToDB("mongodb://localhost:27017");

// interface Student {
//     name: string;
//     firstname: string;
//     registration: number;
// } 