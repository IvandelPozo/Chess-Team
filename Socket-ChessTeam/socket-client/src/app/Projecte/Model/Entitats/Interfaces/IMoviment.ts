import { ICoordenades } from "./ICoordenades";

export interface IMoviment {
    posicioInicial: ICoordenades;
    posicioFinal: ICoordenades;
    indexTauell: number;
    indexPecesMatades: number;
    sala: string;
  }