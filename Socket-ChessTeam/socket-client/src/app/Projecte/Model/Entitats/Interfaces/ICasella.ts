import { IPeça } from "./IPeça";

export interface ICasella {
    fila: number;
    columna: number;
    color: string;
    peca: IPeça | null;
}