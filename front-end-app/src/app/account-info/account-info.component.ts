import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { AccountInfo } from './account-info.interface';
import {CLPublicKey} from 'casper-js-sdk';

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.scss']
})

export class AccountInfoComponent {
  publicKey: String;
  balance: number | undefined;

  constructor(private _Activatedroute: ActivatedRoute, private http: HttpClient) {
    const publicKey = this._Activatedroute.snapshot.paramMap.get('publicKey');

    this.publicKey = publicKey ? publicKey : '';
  }

  ngOnInit() {
    this.getAccountInfo();
  }

  getAccountInfo() {
    const url = `http://localhost:2761/account-info?publicKey=${this.publicKey}`;

    this.http.get<AccountInfo>(url)
      .pipe(
        tap(data => console.log(data)), // log response
        catchError(error => {
          console.log(error);
          return of<AccountInfo>({ balance: 0 }); // provide default value
        })
      )
      .subscribe((data) => this.balance = data ? data.balance : 0)
  }
}
