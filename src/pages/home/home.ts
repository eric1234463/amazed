import {Component} from '@angular/core';
import {NavController , IonicPage } from 'ionic-angular';
import {NativeStorage} from '@ionic-native/native-storage';
import { Patient, RecordService } from '../../services/record';
import { Observable } from 'rxjs/Observable';

@IonicPage({
	name: 'home',
	segment: 'home'
})
@Component({selector: 'page-home', templateUrl: 'home.html'})

export class HomePage {
	public patient : Observable<Patient>;
    constructor(public navCtrl : NavController, public nativeStorage: NativeStorage,public recordService : RecordService) {
	    this.patient = this.recordService.initRecords();
	}
	goToDetail(record){
    	console.log(record);
	}
}
