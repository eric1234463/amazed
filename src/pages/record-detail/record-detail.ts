import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage, PopoverController } from 'ionic-angular';
import { Record, RecordService } from '../../services/record';
import { RateComponent } from '../../components/rate/rate'
@IonicPage({
    name: 'record-detail',
    segment: 'record-detail/:id'
})
@Component({ selector: 'page-record-detail', templateUrl: 'record-detail.html' })
export class RecordDetailPage {
    public record: Record;
    public id: String;
    constructor(public navCtrl: NavController, public navParams: NavParams, public popoverCtrl: PopoverController, public recordService: RecordService) {
        this.id = this.navParams.get('id');
        this.recordService.getRecordByID(this.id).then(record => {
            this.record = record;
        })
    }
    rate() {
        let popover = this.popoverCtrl.create(RateComponent, {
            record: this.record
        });
        popover.present();
    }
}
