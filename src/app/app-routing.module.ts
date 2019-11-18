import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainContaierComponent } from './shop-cart/components/main-contaier/main-contaier.component';


const routes: Routes = [
  { path: '', component: MainContaierComponent },
  { path: '**', redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
