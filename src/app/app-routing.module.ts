import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AutomobiliComponent } from './automobili/automobili.component';
import { MotocikliComponent } from './motocikli/motocikli.component';
import { IzracunComponent } from './izracun/izracun.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'automobili', component: AutomobiliComponent },
  { path: 'motocikli', component: MotocikliComponent },
  { path: 'izracun', component: IzracunComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
