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
	public records : Record[];
    constructor(public navCtrl : NavController, public nativeStorage: NativeStorage,public recordService : RecordService) {
	    this.recordService.initRecords().then(success => {
	    	console.log(success);
	    	this.records = this.recordService.currentRecords;
	    })
	}
	goToDetail(record){
    	// delete record.doctor;
    	// record.time = "2";
    	// this.recordService.addRecords(record);
    	// console.log(record);
	}
}
