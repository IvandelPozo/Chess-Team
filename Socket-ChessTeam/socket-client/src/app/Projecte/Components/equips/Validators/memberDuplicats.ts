import { AbstractControl } from '@angular/forms';

export function memberNameValidator(control: AbstractControl): { [key: string]: boolean } | null {
  const member1 = control.get('nomJugador1')?.value?.trim();
  const member2 = control.get('nomJugador2')?.value?.trim();

  if (member1 !== '' && member2 !== '' && member1 === member2) {
    return { 'duplicateMemberName': true };
  }

  return null;
}
