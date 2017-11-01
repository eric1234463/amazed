import {Component} from '@angular/core';
import {NavController , IonicPage} from 'ionic-angular';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

export interface Records {
	id:number;
	doctorID:number;
	hospitalID:number
	day:string;
	month:string;
	title:string;
}
@IonicPage({
	name: 'home',
	segment: 'home'
})
@Component({selector: 'page-home', templateUrl: 'home.html'})

export class HomePage {
    public recordsCollection : AngularFirestoreCollection<Records>;
	public records : Observable<Records[]>;
    constructor(public navCtrl : NavController, public afs: AngularFirestore) {
	    this.recordsCollection = afs.collection<Records>('records');
	    this.records = this.recordsCollection.valueChanges();
    }
}
