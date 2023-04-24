import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'front-end-app';
  publicKey = '';
  signerError = '';

  constructor(private router: Router) { }

  addSignerError(signerError: string) {
    this.signerError = signerError;
    this.router.navigate(['/no-public-key']);
  }

  addPublicKey(publicKey: string) {
    this.publicKey = publicKey;
    this.router.navigate(['/account-info', {publicKey}]);
  }
}