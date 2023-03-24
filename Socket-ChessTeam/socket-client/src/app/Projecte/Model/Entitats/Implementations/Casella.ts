import { ICasella } from "../Interfaces/ICasella";
import { IPeça } from "../Interfaces/IPeça";

export class Casella implements ICasella {
    fila: number;
    columna: number;
    color: string;
    peca: IPeça | null;

    constructor(fila: number, columna: number, color: string, peca: IPeça | null) {
        this.fila = fila;
        this.columna = columna;
        this.color = color;
        this.peca = peca;
    }
}
