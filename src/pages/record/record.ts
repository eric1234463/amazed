import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { Record, RecordService } from '../../services/record';

@IonicPage({
    name: 'record',
    segment: 'record'
})
@Component({
    selector: 'page-record',
    templateUrl: 'record.html'
})

export class RecordPage {
    public records: Record[];

    constructor(public nativeStorage: NativeStorage, public recordService: RecordService, public navCtrl: NavController) {
        this.recordService.getRecords().then(records => {
            this.records = records;
            console.log(records);
        })
    }




    goToDetail(record) {
        this.navCtrl.push('record-detail', {
            id: record.id
        })
    }
}
