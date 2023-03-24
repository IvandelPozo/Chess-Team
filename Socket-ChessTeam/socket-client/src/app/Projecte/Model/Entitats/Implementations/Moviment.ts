import { IMoviment } from "../Interfaces/IMoviment";
import { Coordenades } from "./Coordenades";

export class Moviment implements IMoviment {
    posicioInicial: Coordenades;
    posicioFinal: Coordenades;
    indexTauell: number;
    indexPecesMatades: number;
    sala: string;

    constructor(posicioInicial: Coordenades, posicioFinal: Coordenades, indexTauell: number, indexPecesMatades: number, sala: string) {
        this.posicioInicial = posicioInicial;
        this.posicioFinal = posicioFinal;
        this.indexTauell = indexTauell;
        this.indexPecesMatades = indexPecesMatades;
        this.sala = sala;
    }
}