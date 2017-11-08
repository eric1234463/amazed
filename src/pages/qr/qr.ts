import {Component} from '@angular/core';
import {NavController, IonicPage} from 'ionic-angular';
import {UserService} from '../../services/user';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Doctor ,RecordService } from '../../services/record';



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
	constructor(public navCtrl: NavController, public userService: UserService,public barcodeScanner : BarcodeScanner, public afs: AngularFirestore, public recordService :RecordService) {

	}

	qrScan(){
		this.barcodeScanner.scan({
			formats:'QR_CODE'
		}).then((barcodeData) => {
			this.doctorID = barcodeData.text;
			this.doctorDoc = this.afs.doc('doctor/'+this.doctorID);
			this.doctor = this.doctorDoc.valueChanges();
			this.doctor.subscribe(doctor => {
				this.currentDoctor = doctor;
			});
			this.currentDoctor.records = this.recordService.getCurrentRecords();
			this.currentDoctor.visited = true;
			this.doctorDoc.update(this.currentDoctor);
		}, (err) => {
			// An error occurred
		});
	}

	cancel(){
		this.currentDoctor.visited = false;
		this.currentDoctor.records = null;
		this.doctorDoc.set(this.currentDoctor);
	}
}
