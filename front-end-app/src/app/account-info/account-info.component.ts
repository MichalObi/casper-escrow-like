import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { AccountInfo } from './account-info.interface';

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.scss']
})

export class AccountInfoComponent {
  publicKey: String;
  balance: number | undefined;
  purse: number | undefined;
  transferAmount: number | undefined = 0;

  constructor(private _Activatedroute: ActivatedRoute, private http: HttpClient) {
    const publicKey = this._Activatedroute.snapshot.paramMap.get('publicKey');

    this.publicKey = publicKey ? publicKey : '';
  }

  ngOnInit() {
    this.getAccountInfo();
  }

  updateTransferAmount(event: any) {
    this.transferAmount = Number(event.target.ariaValueText);
  }

  transferToAccount() {
    const url = 'http://localhost:2761/transfer-to-account', { transferAmount } = this;

    this.http.post(url, { transferAmount })
      .pipe(
        tap(data => console.log(data)), // log response
        catchError(error => {
          console.log('error', error);
          return error;
        })
      )
      .subscribe((data) => console.log('data', data));
  }

  getAccountInfo() {
    const url = `http://localhost:2761/account-info?publicKey=${this.publicKey}`;

    this.http.get<AccountInfo>(url)
      .pipe(
        tap(data => console.log(data)), // log response
        catchError(error => {
          console.log(error);
          return of<AccountInfo>({ balance: 0, purse: 0 }); // provide default value
        })
      )
      .subscribe((data) => {
        this.balance = data ? data.balance : 0;
        this.purse = data ? data.purse : 0;
      });
  }
}
