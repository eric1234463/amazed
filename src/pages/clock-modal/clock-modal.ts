import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { FeedService } from '../../services/feed';
import moment from 'moment';
/**
 * Generated class for the ClockModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
    name: 'clock',
    segment: 'clock'
})
@Component({
    selector: 'page-clock-modal',
    templateUrl: 'clock-modal.html',
})
export class ClockModalPage {
    public date: String;
    constructor(public navCtrl: NavController, public navParams: NavParams, public feedService: FeedService, public viewCtrl: ViewController) {

        this.date = moment().subtract(1, 'days').local().toISOString();
    }

    submit() {
        this.feedService.createClock('SLEEP', this.date).then(res => {
            this.feedService.createClock('WAKE', this.date).then(res => {
            });
        });
        this.viewCtrl.dismiss();
    }

}
