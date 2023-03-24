import { ICoordenades } from "../Interfaces/ICoordenades";

export class Coordenades implements ICoordenades {
    x: number;
    y: number;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}