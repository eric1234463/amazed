import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage, PopoverController } from 'ionic-angular';
import { Record } from '../../../services/record';
import { RateComponent } from '../../../components/rate/rate'
@IonicPage({
    name: 'record-detail',
    segment: 'record-detail'
})
@Component({ selector: 'page-record-detail', templateUrl: 'record-detail.html' })
export class RecordDetailPage {
    public record: Record;
    constructor(public navCtrl: NavController, public navParams: NavParams, public popoverCtrl: PopoverController) {
        this.record = this.navParams.get('record');
    }
    rate() {
        let popover = this.popoverCtrl.create(RateComponent, {
            record: this.record
        });
        popover.present();
    }
}
