import { Component, Output, EventEmitter } from '@angular/core';
import { Signer } from 'casper-js-sdk';

@Component({
  selector: 'app-connect-signer',
  templateUrl: './connect-signer.component.html',
  styleUrls: ['./connect-signer.component.scss']
})

export class ConnectSignerComponent {
  title = 'connect-signer';

  @Output() newPublicKeyEvent = new EventEmitter<string>();
  @Output() newSignerErrorEvent = new EventEmitter<string>();

  addPublicKey(publicKey: string) {
    this.newPublicKeyEvent.emit(publicKey);
  }

  addSignerError(error: string) {
    this.newSignerErrorEvent.emit(error);
  }

  connectSigner() {
    Signer
      .isConnected()
      .then(s => {
        if (s === false) {
          Signer.sendConnectionRequest();
        } else {
          Signer
            .getActivePublicKey()
            .then(pubKey => this.addPublicKey(pubKey))
            .catch(({ message }) => this.addSignerError(message));
        }
      })
      .catch(({ message }) => this.addSignerError(message));
  }
}
