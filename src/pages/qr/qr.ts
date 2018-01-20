import { Component } from '@angular/core';
import { NavController, IonicPage, LoadingController, AlertController } from 'ionic-angular';
import { UserService, Patient } from '../../services/user';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Doctor, RecordService } from '../../services/record';
import { Socket } from 'ng-socket-io';
import { Loading } from 'ionic-angular/components/loading/loading';



@IonicPage({
    name: 'qr',
    segment: 'qr'
})

@Component({ templateUrl: 'qr.html' })
export class GeneratrorPage {
    public doctorID: String;
    public connected = false;
    public loading: Loading;
    public patient: Patient;
    constructor(public navCtrl: NavController, public socket: Socket, public userService: UserService, public barcodeScanner: BarcodeScanner, public recordService: RecordService, public loadingCtrl: LoadingController, public alertCtrl: AlertController) {
        this.userService.getUser().then(patient => {
            this.patient = patient
        });
        this.socket.connect();

    }

    qrScan() {
        this.barcodeScanner.scan({
            formats: 'QR_CODE'
        }).then((barcodeData) => {
            this.loading = this.loadingCtrl.create({
                content: 'Waiting for connection...'
            });
            this.doctorID = barcodeData.text;
            this.loading.present();
            this.socket.emit('subscribe', barcodeData.text);
            this.socket.emit('connect doctor', {
                room: barcodeData.text,
                patient: this.patient.id
            });
            this.connected = true;
            this.loading.dismiss();
        }).catch(() => {
            this.loading.dismiss();

            let alert = this.alertCtrl.create({
                title: 'Scanning Error',
                subTitle: 'Please try to scan again!',
                buttons: ['Understand']
            });
            alert.present();
        });
    }

    cancel() {
        this.socket.emit('cancel connection', {
            room: this.doctorID
        });
        this.connected = false;
    }
}
