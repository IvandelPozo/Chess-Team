import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { interval } from 'rxjs';
import { ChessService } from '../../Serveis/Chess/chess.service';
import { memberNameValidator } from './Validators/memberDuplicats';

@Component({
  selector: 'app-equips',
  templateUrl: './equips.component.html',
  styleUrls: ['./equips.component.css']
})
export class EquipsComponent implements OnInit {
  equipsForm!: FormGroup;
  msgErrorDuplicated!: string;

  constructor(private fb: FormBuilder, private socket: ChessService) { }

  ngOnInit(): void {
    this.socket.getErrorDuplicated().subscribe((msg: any) => {
      this.msgErrorDuplicated = msg;
    });

    interval(8000).subscribe(() => {
      this.msgErrorDuplicated = '';
    });

    this.equipsForm = this.fb.group({
      nomEquip: ['', Validators.required],
      nomJugador1: ['', Validators.required],
      nomJugador2: ['', Validators.required]
    }, { validators: [memberNameValidator] })
  }

  entrarEquip(formGroup: FormGroup): void {
    this.equipsForm.get('nomEquip')?.setValue(formGroup.value.nomEquip.trim());
    this.equipsForm.get('nomJugador1')?.setValue(formGroup.value.nomJugador1.trim());
    this.equipsForm.get('nomJugador2')?.setValue(formGroup.value.nomJugador2.trim());

    this.socket.addTeam(formGroup.value.nomEquip, formGroup.value.nomJugador1, formGroup.value.nomJugador2);
    formGroup.reset();
  }
}