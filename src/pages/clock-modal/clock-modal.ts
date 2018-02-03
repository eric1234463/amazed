import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import moment from 'moment-timezone';
import { FeedService } from '../../services/feed';
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
        this.date = moment(new Date()).subtract(1, 'days').subtract(10, 'hours').tz("Asia/Hong_Kong").format();
        console.log(this.date);
    }

    submit() {
        const currentTime = moment(new Date()).tz("Asia/Hong_Kong").format();
        this.feedService.createClock('SLEEP', this.date).then(res => {
            this.feedService.createClock('WAKE', currentTime).then(res => {
            });
        });
        this.viewCtrl.dismiss();
    }

}
