//Aufgabe 1

//a)
function min(): void {
    let min: number = 0;
    let ranArray: number[] = [3, 5, 2, 8, 10, 13, 1];

    for (let i: number = 0; i < ranArray.length; i++) {

        
        if (ranArray[i] < ranArray[i - 1]) {

            min = ranArray[i];

        }
    }
    console.log(min);
}
min();


//b)
/*
function isEven(): void {
    
    let even: boolean = true;

    let _n: number = 75;

    let _y: number = _n % 2;

    if (_y == 1) {

        even = false;

    }
    console.log(even);
}
isEven();
*/



function isEven(n: number): boolean {

    let y: number = n % 2;

    if (y == 1) {
        return false;
    } else {
        return true;
    }
    
}
console.log(isEven(50));


//c)
interface Student {

    name: string;
    matrikel: number;
    studiengang: string;
    fertig?: string;

}
let m1: Student = {name: "Dave", matrikel: 141516, studiengang: "MIB", fertig: "absolviert"};
let m2: Student = {name: "Stuart", matrikel: 171819, studiengang: "OMB"};
let m3: Student = {name: "Kevin", matrikel: 202122, studiengang: "MKB"};

let sArray: string[] = [[m1, m2, m3]]



function showInfo(): void {

    console.log(m1.name + " " + m1.matrikel + " " + m1. studiengang);
    console.log(m2.name + " " + m2.matrikel + " " + m2. studiengang);
    console.log(m3.name + " " + m3.matrikel + " " + m3. studiengang);

}
showInfo();


