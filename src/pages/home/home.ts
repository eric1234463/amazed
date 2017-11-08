import {Component} from '@angular/core';
import {NavController , IonicPage } from 'ionic-angular';
import {NativeStorage} from '@ionic-native/native-storage';
import { Record, RecordService } from '../../services/record';
import { Observable } from 'rxjs/Observable';

@IonicPage({
	name: 'home',
	segment: 'home'
})
@Component({selector: 'page-home', templateUrl: 'home.html'})

export class HomePage {
	public records : Observable<Record[]>;
    constructor(public navCtrl : NavController, public nativeStorage: NativeStorage,public recordService : RecordService) {
	    this.recordService.initRecords().then(records => {
			console.log(this.records);
	    	this.records = records;
		})
		// let startDate = new Date();
		// startDate.setDate(startDate.getDate() - 3);
		// let endDate = new Date();
		// endDate.setDate(endDate.getDate() + 3);
		// const record = {
		// 	visitDate: new Date(),
		// 	title: 'Fever',
		// 	description: 'Got cold yesterday',
		// 	factor:[{
		// 		fever:true
		// 	},{
		// 		headache:true
		// 	}],
		// 	doctor:{
		// 		name:'Eric Kwong',
		// 		location:'Wan Chai'
		// 	},
		// 	startDate: startDate,
		// 	endDate : endDate,
		// 	medicine:['a','b','c'],
		// 	rate:3.5
		// }
		// this.recordService.addRecords(record);
	}
	goToDetail(record){
    	// delete record.doctor;
    	// record.time = "2";
    	// this.recordService.addRecords(record);
    	// console.log(record);
	}
}
