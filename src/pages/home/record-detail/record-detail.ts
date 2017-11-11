import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { Record } from '../../../services/record';
@IonicPage({
	name: 'record-detail',
	segment: 'record-detail'
})
@Component({ selector: 'page-record-detail', templateUrl: 'record-detail.html' })
export class RecordDetailPage {
	public record: Record;
	constructor(public navCtrl: NavController, public navParams: NavParams) {
		this.record = this.navParams.get('record');
	}
}
