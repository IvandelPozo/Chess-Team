import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EquipsComponent } from './Projecte/Components/equips/equips.component';
import { JugarComponent } from './Projecte/Components/jugar/jugar.component';

const routes: Routes = [
  { path: '', component: EquipsComponent },
  { path: 'jugar', component: JugarComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
