import { Component } from '@angular/core';
import { NavController, IonicPage, LoadingController, AlertController } from 'ionic-angular';
import { UserService } from '../../services/user';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Doctor, RecordService } from '../../services/record';



@IonicPage({
    name: 'qr',
    segment: 'qr'
})

@Component({ templateUrl: 'qr.html' })
export class GeneratrorPage {
    public doctorID: String;
    public doctorDoc: AngularFirestoreDocument<Doctor>;
    public doctor: Observable<Doctor>;
    public currentDoctor: Doctor;
    public connected = false;
    constructor(public navCtrl: NavController, public userService: UserService, public barcodeScanner: BarcodeScanner, public afs: AngularFirestore, public recordService: RecordService, public loadingCtrl: LoadingController, public alertCtrl: AlertController) {

    }

    qrScan() {
        this.barcodeScanner.scan({
            formats: 'QR_CODE'
        }).then((barcodeData) => {
            let loading = this.loadingCtrl.create({
                content: 'Waiting for connection...'
            });
            loading.present();
            this.doctorID = barcodeData.text;
            this.doctorDoc = this.afs.doc('doctor/' + this.doctorID);
            this.doctor = this.doctorDoc.valueChanges();
            new Promise((resolve, reject) => {
                this.doctor.subscribe(doctor => {
                    this.currentDoctor = doctor;
                    this.currentDoctor.records = this.recordService.getCurrentRecords();
                    this.currentDoctor.visited = true;
                    resolve(this.currentDoctor);
                });
            }).then(success => {
                this.connected = true;
                this.doctorDoc.update(this.currentDoctor).then(success => {
                    loading.dismiss();
                }).catch(error => {
                    let alert = this.alertCtrl.create({
                        title: 'Connection Error',
                        subTitle: 'Please try to scan again!',
                        buttons: ['Understand']
                    });
                    alert.present();
                });
            });
        }).catch(() => {
            let alert = this.alertCtrl.create({
                title: 'Scanning Error',
                subTitle: 'Please try to scan again!',
                buttons: ['Understand']
            });
            alert.present();
        });
    }

    cancel() {
        this.connected = false;
        this.currentDoctor.visited = false;
        this.currentDoctor.records = null;
        this.doctorDoc.set(this.currentDoctor);
    }
}
