import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EncriptacionUIComponent } from './pages/encriptacion-ui/encriptacion-ui.component';

const routes: Routes = [
  {path:'', component: EncriptacionUIComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
