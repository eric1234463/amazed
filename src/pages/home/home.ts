import { Component } from '@angular/core';
import { IonicPage, App } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { Record, RecordService } from '../../services/record';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
@IonicPage({
    name: 'home',
    segment: 'home'
})
@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})

export class HomePage {
    public records: Observable<Record[]>;
    public recordCollection: AngularFirestoreCollection<Record>;
    constructor(public nativeStorage: NativeStorage, public recordService: RecordService, public afs: AngularFirestore, public appCtrl: App) {
        this.recordService.initRecords().then(records => {
            this.records = records;
        })
    }




    goToDetail(record) {
        // delete record.doctor;
        // record.description = "Got cold yesterda";
        // record.title = "Fever";
        // let startDate = new Date();
        // startDate.setDate(startDate.getDate() - 3);
        // let endDate = new Date();
        // endDate.setDate(endDate.getDate() + 3);
        // let bg = [
        //     'mat-blue-500-bg',
        //     'mat-purple-500-bg',
        //     'mat-orange-500-bg',
        //     'mat-green-500-bg',
        //     'mat-cyan-500-bg',
        // ]
        // let i = Math.floor(Math.random() * 4 + 1);
        // let x = Math.floor(Math.random() * 4 + 1);
        // record.factor = [{
        //     fever: true,
        //     class: bg[i],
        //     name: 'fever'
        // }, {
        //     headache: true,
        //     class: bg[x],
        //     name: 'headache'
        // }];
        // record.medicine = [{
        //     name: 'x-011',
        //     class: bg[x],
        // },
        // {
        //     name: 'x-01234',
        //     class: bg[i],
        // }];
        // record.startDate = startDate;
        // record.endDate = endDate;
        // record.rate = i;
        // console.log(record);

        //this.recordCollection = this.afs.collection<Record>('record');
        //this.recordService.add(record);
        this.appCtrl.getRootNav().push('record-detail', {
            record: record
        })
    }
}
