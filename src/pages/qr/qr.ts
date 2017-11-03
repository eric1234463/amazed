import {Component} from '@angular/core';
import {NavController, IonicPage} from 'ionic-angular';
import {UserService} from '../../services/user';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

@IonicPage({
	name: 'qr',
	segment: 'qr'
})
@Component({templateUrl: 'qr.html'})
export class GeneratrorPage {
	public result:String;

	constructor(public navCtrl: NavController, public userService: UserService,public barcodeScanner : BarcodeScanner) {
		this.barcodeScanner.scan({
			formats:'QR_CODE'
		}).then((barcodeData) => {
			this.result = barcodeData.text;
			// Success! Barcode data is here
		}, (err) => {
			// An error occurred
		});
	}
}
