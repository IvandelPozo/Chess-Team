import { IEquip } from "../Interfaces/IEquip";
import { Jugador } from "./Jugador";

export class Equip implements IEquip {
    nom: string;
    jugadors: Jugador[];

    constructor(nom: string, jugadors: Jugador[]) {
        this.nom = nom;
        this.jugadors = jugadors;
    }
}