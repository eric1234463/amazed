import {Component} from '@angular/core';
import {NavController , IonicPage } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import {NativeStorage} from '@ionic-native/native-storage';
import { Observable } from 'rxjs/Observable';

export interface Records {
	id:number;
	doctor:object;
	doctor_1:object;
	hospitalID:number
	day:string;
	month:string;
	title:string;
};
export interface Doctor {
	id:number;
	name:string;
	location:string;
};

@IonicPage({
	name: 'home',
	segment: 'home'
})
@Component({selector: 'page-home', templateUrl: 'home.html'})

export class HomePage {
    public recordsCollection : AngularFirestoreCollection<Records>;
	public records : Observable<Records[]>;
    constructor(public navCtrl : NavController, public afs: AngularFirestore, public nativeStorage: NativeStorage) {
	    this.recordsCollection = afs.collection<Records>('records');
	    this.records = this.recordsCollection.valueChanges();

	}
	goToDetail(record){
    	console.log(record);
	}
}
