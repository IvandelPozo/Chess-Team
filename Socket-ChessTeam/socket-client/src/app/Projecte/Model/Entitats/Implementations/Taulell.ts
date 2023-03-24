import { IMG } from "src/app/Projecte/Utils/img";
import { IPeça } from "../Interfaces/IPeça";
import { ITaulell } from "../Interfaces/ITaulell";
import { Casella } from "./Casella";
import { Jugador } from "./Jugador";
import { Peça } from "./Peça";

export class Taulell implements ITaulell {
    caselles!: Array<Array<Casella>>;
    lletres: Array<string> = ["A", "B", "C", "D", "E", "F", "G", "H"];
    numeros: Array<string> = ["8", "7", "6", "5", "4", "3", "2", "1"];
    pecesMortes: Array<Array<Peça>> = [];
    lluitadors: Array<Jugador> = [];
    torn!: number;

    constructor() {
        this.pecesMortes[0] = new Array<Peça>();
        this.pecesMortes[1] = new Array<Peça>();
        this.torn = 0;
        this.emplenarCaselles();
        this.posarPeces();
    }

    emplenarCaselles(): void {
        let caselles: Array<Array<Casella>> = new Array<Array<Casella>>();
        let color: string = "blanc";
        for (let i = 0; i < 8; i++) {
            let fila: Array<Casella> = new Array<Casella>();
            for (let j = 0; j < 8; j++) {
                let casella: Casella = new Casella(i, j, color, null);
                fila.push(casella);
                color = color == "blanc" ? "negre" : "blanc";
            }
            caselles.push(fila);
            color = color == "blanc" ? "negre" : "blanc";
        }
        this.caselles = caselles;
    }
 
    posarPeces(): void {

        // Torre negra
        let peca: Peça = new Peça("Torre", "negre", "./assets/Imatges/" + IMG[6].n_tower);
        this.caselles[0][0].peca = peca;
        this.caselles[0][7].peca = peca;

        // Cavall negre
        peca = new Peça("Cavall", "negre", "./assets/Imatges/" + IMG[7].n_horse);
        this.caselles[0][1].peca = peca;
        this.caselles[0][6].peca = peca;

        // Alfil negre
        peca = new Peça("Alfil", "negre", "./assets/Imatges/" + IMG[8].n_bishop);
        this.caselles[0][2].peca = peca;
        this.caselles[0][5].peca = peca;

        // Reina negra
        peca = new Peça("Reina", "negre", "./assets/Imatges/" + IMG[9].n_queen);
        this.caselles[0][3].peca = peca;

        // Rei negre
        peca = new Peça("Rei", "negre", "./assets/Imatges/" + IMG[10].n_king);
        this.caselles[0][4].peca = peca;

        // Peó negre
        for (let i = 0; i < 8; i++) {
            let peça: IPeça = new Peça("Peó", "negre", "./assets/Imatges/" + IMG[11].n_pawn);
            this.caselles[1][i].peca = peça;
        }

        // Torre blanca
        peca = new Peça("Torre", "blanc", "./assets/Imatges/" + IMG[0].b_tower);
        this.caselles[7][0].peca = peca;
        this.caselles[7][7].peca = peca;

        // Cavall blanc
        peca = new Peça("Cavall", "blanc", "./assets/Imatges/" + IMG[1].b_horse);
        this.caselles[7][1].peca = peca;
        this.caselles[7][6].peca = peca;

        // Alfil blanc
        peca = new Peça("Alfil", "blanc", "./assets/Imatges/" + IMG[2].b_bishop);
        this.caselles[7][2].peca = peca;
        this.caselles[7][5].peca = peca;

        // Reina blanca
        peca = new Peça("Reina", "blanc", "./assets/Imatges/" + IMG[3].b_queen);
        this.caselles[7][3].peca = peca;


        // Rei blanc
        peca = new Peça("Rei", "blanc", "./assets/Imatges/" + IMG[4].b_king);
        this.caselles[7][4].peca = peca;

        // Peó blanc
        for (let i = 0; i < 8; i++) {
            let peça: IPeça = new Peça("Peó", "blanc", "./assets/Imatges/" + IMG[5].b_pawn);
            this.caselles[6][i].peca = peça;
        }
    }

    static rotate(): Taulell {

        let taulellRotate = new Taulell();

        taulellRotate.caselles.reverse();
        for (let i = 0; i < taulellRotate.caselles.length; i++) {
            taulellRotate.caselles[i].reverse();
        }
        taulellRotate.lletres.reverse();
        taulellRotate.numeros.reverse();

        return taulellRotate;
    }
}