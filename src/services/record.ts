import { Observable } from 'rxjs/Observable';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import {Injectable} from '@angular/core';

export interface Record {
	id:number;
	doctor:object;
	day:string;
	month:string;
	title:string;
}
export interface Patient {
	name: string;
	records: Record[]
}
@Injectable()
export class RecordService {
	public patientDoc : AngularFirestoreDocument<Patient>;
	private patient : Observable<Patient>;
	public currentRecords : Record[];
	constructor(public afs: AngularFirestore) {

	}

	public initRecords(){
		this.patientDoc = this.afs.doc<Patient>('patient/yE5exzj4fGgvFrVCNluomceR96a2');
		this.patient = this.patientDoc.valueChanges();
		this.patient.subscribe(records=>{
			this.currentRecords = records.records;
		});
		return this.patient;
	}

	public getCurrentRecords(){
		return this.currentRecords;
	}

}