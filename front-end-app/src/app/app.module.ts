import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConnectSignerComponent } from './connect-signer/connect-signer.component';
import { AccountInfoComponent } from './account-info/account-info.component';
import { NoPublicKeyComponent } from './no-public-key/no-public-key.component';

@NgModule({
  declarations: [
    AppComponent,
    ConnectSignerComponent,
    AccountInfoComponent,
    NoPublicKeyComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
