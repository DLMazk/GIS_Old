namespace Aufgabe2_5 {

    export interface Eis {

        wahlGröße: EisWahl[];
        wahlSorte: EisWahl[];
        wahlTop: EisWahl[];

    }

    export interface EisWahl {

        option: string;
        imageID: string;
        dateiName: string;

    }

    let previousElement: HTMLElement = document.getElementById("auswahl");

    

    function openNextSite(): void {

        if (window.location.href.includes("index.html")) {

            window.open("Sorten.html", "_self");

        }
        if (window.location.href.includes("Sorten.html")) {

            window.open("Topping.html", "_self");

        }
        if (window.location.href.includes("Topping.html")) {

            window.open("final.html", "_self");

        }

    }

    // function waehlen(): EisWahl[] {
    //     let art: EisWahl[] = myObj.wahlGröße;

    //     if (window.location.href.includes("Sorten.html"))
    //         art = myObj.wahlSorte;

    //     if (window.location.href.includes("Topping.html"))
    //         art = myObj.wahlTop;

    //     return art;
    // }

    // async function einlesen(_url: RequestInfo): Promise<void> {

    //     let ant: Response = await fetch(_url);
    //     let daten: Eis = await ant.json();
    //     console.log("Antwort", daten);

    //     auswaehlen(daten);

    // }
    // einlesen("http://127.0.0.1:5500/2_5/data.json");

     
    function waehlen(_eis: Eis): EisWahl[] {
        let art: EisWahl[] = _eis.wahlGröße;

        if (window.location.href.includes("Sorten.html"))
            art = _eis.wahlSorte;

        if (window.location.href.includes("Topping.html"))
            art = _eis.wahlTop;

        return art;
    }

    async function einlesen(_url: RequestInfo): Promise<void> {

        let ant: Response = await fetch(_url);
        let daten: Eis = await ant.json();
        //console.log("Antwort", daten);
        let wahl: EisWahl[] = waehlen(daten);
        auswaehlen(wahl);
    }
    einlesen("data.json");



    function speichern(_dateiName: string): void {

        if (window.location.href.includes("index.html")) {
            sessionStorage.setItem("0", _dateiName);    // 0 im Prinzip die ID der Auswahl
        }
        if (window.location.href.includes("Sorten.html")) {
            sessionStorage.setItem("1", _dateiName);
        }
        if (window.location.href.includes("Topping.html")) {
            sessionStorage.setItem("2", _dateiName);
        }
    }

    //aktuelle Auswahl
    function aktuell(): void {

        //wenn bei "Sorten"
        if (window.location.href.includes("Sorten.html")) {
            let aktuelldiv: HTMLElement = document.getElementById("aktuell");

            let img: HTMLElement = document.createElement("img");
            img.setAttribute("src", sessionStorage.getItem("0"));
            aktuelldiv.appendChild(img);
        }

        //wenn bei "Topping"
        if (window.location.href.includes("Topping.html")) {
            let aktuelldiv: HTMLElement = document.getElementById("aktuell");

            for (let i: number = 0; i < 2; i++) {

                let img: HTMLElement = document.createElement("img");
                img.setAttribute("src", sessionStorage.getItem(i.toString()));
                aktuelldiv.appendChild(img);
            }
        }
    }
    aktuell();

    //Waffel auswaehlen
    function auswaehlen(_gewaehltes: EisWahl[]): void {
        //const gewaehltes: EisWahl[] = waehlen();
        for (let i: number = 0; i < _gewaehltes.length; i++) {

            let img: HTMLElement = document.createElement("img");
            img.setAttribute("src", _gewaehltes[i].dateiName);
            img.addEventListener("click", function (): void { speichern(_gewaehltes[i].dateiName); });
            img.addEventListener("click", openNextSite);

            img.id = _gewaehltes[i].imageID; //ID des Bildes festlegen
            previousElement.appendChild(img);
        }
    }

}