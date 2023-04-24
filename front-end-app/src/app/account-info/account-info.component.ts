import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.scss']
})

export class AccountInfoComponent {
  publicKey: String;

  constructor(private _Activatedroute:ActivatedRoute) {
    const publicKey = this._Activatedroute.snapshot.paramMap.get('publicKey');

    this.publicKey = publicKey ? publicKey : '';
  }
}
