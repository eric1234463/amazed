import {Component} from '@angular/core';
import {NavController, IonicPage} from 'ionic-angular';
import {UserService} from '../../services/user';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

interface Doctor {
	name: string;
	location: string;
	visited: boolean;
}

@IonicPage({
	name: 'qr',
	segment: 'qr'
})

@Component({templateUrl: 'qr.html'})
export class GeneratrorPage {
	public doctorID:String;
	public doctorDoc: AngularFirestoreDocument<Doctor>;
	public doctor: Observable<Doctor>;
	public currentDoctor : Doctor;
	constructor(public navCtrl: NavController, public userService: UserService,public barcodeScanner : BarcodeScanner, public afs: AngularFirestore) {

	}

	qrScan(){
		this.barcodeScanner.scan({
			formats:'QR_CODE'
		}).then((barcodeData) => {
			this.doctorID = barcodeData.text;
			this.doctorDoc = this.afs.doc('doctor/'+this.doctorID);
			this.doctor = this.doctorDoc.valueChanges();
			this.doctor.subscribe(doctor => {
				doctor.visited = true;
				this.currentDoctor = doctor;
				this.doctorDoc.update(doctor);
			})
		}, (err) => {
			// An error occurred
		});
	}

	cancel(){
		this.currentDoctor.visited = false
		this.doctorDoc.update(this.currentDoctor);
	}
}
