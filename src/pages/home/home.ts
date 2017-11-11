import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { Record, RecordService } from '../../services/record';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore } from 'angularfire2/firestore';

@IonicPage({
	name: 'home',
	segment: 'home'
})
@Component({ selector: 'page-home', templateUrl: 'home.html' })

export class HomePage {
	public records: Observable<Record[]>;
	constructor(public navCtrl: NavController, public nativeStorage: NativeStorage, public recordService: RecordService, public afs: AngularFirestore) {
		this.recordService.initRecords().then(records => {
			this.records = records;
		})


	}




	goToDetail(record) {
		// record.doctor.icon = "https://firebasestorage.googleapis.com/v0/b/bufyp-8ae9f.appspot.com/o/doctor.png?alt=media&token=61978507-06ee-4944-9f23-bb0166d91fbd";
		// record.description = "Got cold yesterda";
		// record.title = "Fever";
		// let startDate = new Date();
		// startDate.setDate(startDate.getDate() - 3);
		// let endDate = new Date();
		// endDate.setDate(endDate.getDate() + 3);
		// let bg = [
		// 	'mat-blue-500-bg',
		// 	'mat-purple-500-bg',
		// 	'mat-orange-500-bg',
		// 	'mat-green-500-bg',
		// 	'mat-cyan-500-bg',
		// ]
		// let i = Math.floor(Math.random() * 4 + 1);
		// let x = Math.floor(Math.random() * 4 + 1);
		// record.factor = [{
		// 	fever: true,
		// 	class: bg[i],
		// 	name: 'fever'
		// }, {
		// 	headache: true,
		// 	class: bg[x],
		// 	name: 'headache'
		// }];
		// record.medicine = [{
		// 	name: 'x-011',
		// 	class: bg[x],
		// },
		// {
		// 	name: 'x-01234',
		// 	class: bg[i],
		// }];
		// record.startDate = startDate;
		// record.endDate = endDate;
		// record.rate = i;
		// console.log(record);
		// this.recordService.addRecords(record);
		this.navCtrl.push('record-detail', {
			record: record
		})
	}
}
