import { Component } from '@angular/core';
import { Signer } from 'casper-js-sdk';

@Component({
  selector: 'app-connect-signer',
  templateUrl: './connect-signer.component.html',
  styleUrls: ['./connect-signer.component.scss']
})

export class ConnectSignerComponent {
  title = 'connect-signer';;

  connectSigner() {
    Signer
        .isConnected()
        .then(s => {
            if (s === false) {
                Signer.sendConnectionRequest();
            } else {
                Signer
                    .getActivePublicKey()
                    .then(pubKey => {
                        console.log('Public key is' + pubKey);
                    })
                    .catch(({ message }) => console.log(message));
            }
        })
        .catch(({ message }) => console.log(message));
  }
}
