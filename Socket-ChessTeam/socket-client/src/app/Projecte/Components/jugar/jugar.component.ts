import { Component, OnInit } from '@angular/core';
import { Coordenades } from '../../Model/Entitats/Implementations/Coordenades';
import { InfoJugador } from '../../Model/Entitats/Implementations/InfoJugador';
import { Jugador } from '../../Model/Entitats/Implementations/Jugador';
import { Moviment } from '../../Model/Entitats/Implementations/Moviment';
import { Taulell } from '../../Model/Entitats/Implementations/Taulell';
import { ChessService } from '../../Serveis/Chess/chess.service';

@Component({
  selector: 'app-jugar',
  templateUrl: './jugar.component.html',
  styleUrls: ['./jugar.component.css']
})

export class JugarComponent implements OnInit {

  // Variables per a la gestió dels jugadors
  teamMember!: Jugador;
  lluitadorsTaulell1!: string;
  lluitadorsTaulell2!: string;

  // Taulell 1 Jugador Blanc
  T1JB!: string;
  // Taulell 1 Jugador Negre
  T1JN!: string;
  // Taulell 2 Jugador Blanc
  T2JB!: string;
  // Taulell 2 Jugador Negre
  T2JN!: string;

  // Taulells
  taulell1: Taulell = new Taulell();
  taulell2: Taulell = Taulell.rotate();
  taulells: Array<Taulell> = Array<Taulell>();

  // Variables per a la gestió dels moviments
  indexElMeuTaulell!: number;
  indexPecesMatades!: number;

  // Sales del taulell sense duplicació per el control d'usuaris entrats
  laMevaSala!: string;

  constructor(private socket: ChessService) {
    this.taulells.push(this.taulell1);
    this.taulells.push(this.taulell2);
  }

  // Funció per a assignar un jugador a un taulell
  assignMember(): void {
    this.socket.assignTeamMember();
  }

  ngOnInit(): void {
    this.socket.getTeamMember().subscribe((data: InfoJugador) => {
      this.teamMember = data.jugadorActual;
      this.indexElMeuTaulell = data.indexElMeuTaulell;
      this.indexPecesMatades = data.indexPecesMatades;
      this.laMevaSala = data.sala;
    });

    let start = this.socket.startGame().subscribe((lluitadors: any) => {

      if (lluitadors.sala == this.laMevaSala) {

        this.lluitadorsTaulell1 = lluitadors.lluitadors1.equip;
        this.lluitadorsTaulell2 = lluitadors.lluitadors2.equip;

        this.T1JB = lluitadors.lluitadors1.jugadors[0];
        this.T1JN = lluitadors.lluitadors1.jugadors[1];
        this.T2JB = lluitadors.lluitadors2.jugadors[0];
        this.T2JN = lluitadors.lluitadors2.jugadors[1];

        // Deixar d'escoltar startGame
        start.unsubscribe();
      }
    });

    this.socket.rebreMoviment().subscribe((moviment: Moviment) => {
      this.arribaMoviment(moviment);
    });
  }

  arribaMoviment(moviment: Moviment): void {

    if (moviment.sala == this.laMevaSala) {

      let indexTaulell = moviment.indexTauell;
      let indexPecesMatades = moviment.indexPecesMatades;

      let posicioInicial = moviment.posicioInicial;
      let posicioFinal = moviment.posicioFinal;

      let casellaInicial = this.taulells[indexTaulell].caselles[posicioInicial.x][posicioInicial.y];
      let casellaFinal = this.taulells[indexTaulell].caselles[posicioFinal.x][posicioFinal.y];

      if (casellaFinal.peca != null) {
        this.taulells[indexTaulell].pecesMortes[indexPecesMatades].push(casellaFinal.peca);
      }
      this.taulells[indexTaulell].caselles[posicioFinal.x][posicioFinal.y].peca = casellaInicial.peca;
      this.taulells[indexTaulell].caselles[posicioInicial.x][posicioInicial.y].peca = null;

      this.taulells[indexTaulell].torn = (this.taulells[indexTaulell].torn + 1) % 2;
    }
  }

  draggable(x: number, y: number, indexTaulell: number): boolean {
    if (indexTaulell == this.indexElMeuTaulell) {
      let elMeuTorn = this.teamMember.colorPeces == "blanc" ? 0 : 1;
      if (this.taulells[indexTaulell].torn == elMeuTorn) {
        if (this.taulells[indexTaulell].caselles[x][y].peca != null) {
          if (this.taulells[indexTaulell].caselles[x][y].peca?.color == this.teamMember.colorPeces) {
            return true;
          }
        }
      }
    }
    return false;
  }

  onDragStart(event: DragEvent, x: number, y: number): void {
    //enviar casella al event dataTransfer
    event.dataTransfer?.setData('casellaInicial', JSON.stringify({ x: x, y: y }));
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  onDrop(event: DragEvent, x: number, y: number): void {
    event.preventDefault();
    const coordsInicials: Coordenades = JSON.parse(event.dataTransfer!.getData('casellaInicial'));
    const coordsFinals: Coordenades = { x: x, y: y };

    let moviment: Moviment;
    moviment = {
      indexTauell: this.indexElMeuTaulell,
      indexPecesMatades: this.indexPecesMatades,
      posicioInicial: coordsInicials,
      posicioFinal: coordsFinals,
      sala: this.laMevaSala
    }

    let peca = this.taulells[this.indexElMeuTaulell].caselles[coordsFinals.x][coordsFinals.y].peca;

    if (peca != null && peca.color != this.teamMember.colorPeces || peca == null) {
      this.socket.movimentPeca(moviment);
    }
  }
}