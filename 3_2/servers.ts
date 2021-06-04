import * as Http from "http";
import * as url from "url";

export namespace Aufgabe3_1 {
    console.log("Starting server"); //Konsolenausgabe
    let port: number = Number(process.env.PORT); //Port ist "Hafen" 
    if (!port)
        port = 8100; //Prot wird auf 8100 gesetzt (localhost:8100)

    let server: Http.Server = Http.createServer(); //erstellen eines einfachen Servers
    server.addListener("request", handleRequest);
    server.addListener("listening", handleListen);
    server.listen(port);

    function handleListen(): void {
        console.log("Listening"); //Konsolenausgabe
    }


    function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): void {
        console.log("I hear voices!"); //Konsolenausgabe 
        console.log(_request.url); //Konsolenausgabe 

        _response.setHeader("content-type", "text/html; charset=utf-8"); //Eigenschaften; Typ:Html
        _response.setHeader("Access-Control-Allow-Origin", "*"); //Zugriffserlaubnis --> * alle dürfen zugreifen 
        _response.write(_request.url); //was wird zurückgegeben: Als Antwort auf die Anfrage 
        _response.end(); //Antwort fertig und zurückschicken 
    }


    //Diesen Code innerhalb von einem aktiven Server testen:

    let adresse: string = 'http://localhost:8100/default.htm?jahr=2017&monat=february';
    //Adresse parsen (umwandeln):
    let q = url.parse(adresse, true);

    /*Die parse Methode gibt ein Objekt zurück, dass die URL Eigenschaften enthält. So können die fest definierten Eigenschaften einer URL ausgelesen werden:*/
    console.log(q.host);
    console.log(q.pathname);
    console.log(q.search);

    /*Die query Eigenschaft gibt ein Ojekt zurück, dass alle query-string Parameter als Eigenschaften besitzt. So können beliebig gesendete Attribute ausgelesen werden:*/
    var qdata = q.query;
    console.log(qdata.monat);
}