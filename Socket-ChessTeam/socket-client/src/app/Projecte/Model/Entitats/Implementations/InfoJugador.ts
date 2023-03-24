import { IInfoJugador } from "../Interfaces/IInfoJugador";
import { Jugador } from "./Jugador";

export class InfoJugador implements IInfoJugador {
    jugadorActual: Jugador;
    indexElMeuTaulell: number;
    indexPecesMatades: number;
    sala: string;

    constructor(jugadorActual: Jugador, indexElMeuTaulell: number, indexPecesMatades: number, sala: string) {
        this.jugadorActual = jugadorActual;
        this.indexElMeuTaulell = indexElMeuTaulell;
        this.indexPecesMatades = indexPecesMatades;
        this.sala = sala;
    }
}