import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { CoingeckoInfo } from './coingecko.interface';
import { of } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title: string = 'casper-network escrow test';
  publicKey: string = '';
  signerError: string = '';
  casperExchangeRate: number = 0;

  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit() {
    this.http.get<CoingeckoInfo>('https://api.coingecko.com/api/v3/simple/price?ids=casper-network&vs_currencies=usd')
      .pipe(
        tap(data => console.log(data)), // log response
        catchError(error => {
          console.log(error);
          return of<CoingeckoInfo>({ 'casper-network': { usd: 0 } }); // provide default value
        })
      )
      .subscribe((data) => {
        this.casperExchangeRate = data ? data['casper-network'].usd : 0;
      });
  }

  addSignerError(signerError: string) {
    this.signerError = signerError;
    this.router.navigate(['/no-public-key']);
  }

  addPublicKey(publicKey: string) {
    const { casperExchangeRate } = this;
    
    this.publicKey = publicKey;
    this.router.navigate(['/account-info', { publicKey, casperExchangeRate }]);
  }
}