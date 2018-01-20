import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { Record, RecordService } from '../../services/record';

/**
 * Generated class for the RateComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
    selector: 'rate',
    templateUrl: 'rate.html'
})
export class RateComponent {

    public record: Record;


    constructor(public viewCtrl: ViewController, public navParams: NavParams, public recordService: RecordService) {

    }
    ngOnInit() {
        this.record = this.navParams.get('record');
        console.log(this.record);
    }
    cancel() {
        this.viewCtrl.dismiss();
    }
    update() {
        //this.recordService.update(this.record);
        this.viewCtrl.dismiss()
    }

}
