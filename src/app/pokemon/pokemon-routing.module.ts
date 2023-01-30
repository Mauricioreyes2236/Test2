import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListadoComponent } from './pages/listado/listado.component';
import { MainComponent } from './pages/main/main.component';

const routes: Routes = [
  {
   path: '',
   component:MainComponent,
   children:[
      {path:'listado', component: ListadoComponent},
      {path:'**', redirectTo:'listado'}
   ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PokemonRoutingModule { }
