import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountInfoComponent } from './account-info/account-info.component';
import { NoPublicKeyComponent } from './no-public-key/no-public-key.component';

const routes: Routes = [
  { path: 'account-info', component: AccountInfoComponent },
  { path: 'no-public-key', component: NoPublicKeyComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
