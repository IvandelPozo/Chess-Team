import { ICasella } from "./ICasella";
import { IJugador } from "./IJugador";

export interface ITaulell {
    caselles: Array<Array<ICasella>>;
    lletres: Array<string>;
    numeros: Array<string>;
    lluitadors: Array<IJugador>;
    emplenarCaselles(): void;
    posarPeces(): void;
}