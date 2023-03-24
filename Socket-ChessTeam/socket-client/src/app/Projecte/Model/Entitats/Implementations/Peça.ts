import { IPeça } from "../Interfaces/IPeça";

export class Peça implements IPeça {
    nom: string;
    color: string;
    imatge: string;

    constructor(nom: string, color: string, imatge: string) {
        this.nom = nom;
        this.color = color;
        this.imatge = imatge;
    }
}