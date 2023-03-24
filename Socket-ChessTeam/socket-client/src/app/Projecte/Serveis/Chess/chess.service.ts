import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { Equip } from '../../Model/Entitats/Implementations/Equip';
import { InfoJugador } from '../../Model/Entitats/Implementations/InfoJugador';
import { Jugador } from '../../Model/Entitats/Implementations/Jugador';
import { Moviment } from '../../Model/Entitats/Implementations/Moviment';

@Injectable({
  providedIn: 'root'
})
export class ChessService {

  // Crear variable socket
  constructor(private socket: Socket) { }

  addTeam(teamName: string, member1: string, member2: string): void {

    let equip = new Equip(teamName, [new Jugador(member1), new Jugador(member2)]);
    this.socket.emit('newTeam', equip);
  }

  assignTeamMember(): void {
    this.socket.emit('assignTeamMember');
  }

  getErrorDuplicated(): Observable<string> {
    return this.socket.fromEvent<string>('equipDuplicated');
  }

  getTeamMember(): Observable<InfoJugador> {
    return this.socket.fromEvent<InfoJugador>('assignedMember');
  }

  startGame(): any {
    return this.socket.fromEvent('startGame');
  }

  rebreMoviment(): Observable<Moviment> {
    return this.socket.fromEvent<Moviment>('movemPeca');
  }

  movimentPeca(moviment: Moviment): void {
    this.socket.emit('mourePeca', moviment);
  }
}