import {Observable} from 'rxjs/Observable';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import {Injectable} from '@angular/core';

export interface Doctor {
	name: string;
	location: string;
	visited: boolean;
	records: Record[];
}

export interface Record {
	id: number;
	doctorID: String;
	doctor: Observable<Doctor>;
	day: string;
	month: string;
	title: string;
}

export interface Patient {
	name: string;
	records: Record[]
}

@Injectable()
export class RecordService {
	public doctorDoc: AngularFirestoreDocument<Doctor>;
	public recordCollection: AngularFirestoreCollection<Record>;
	private doctor: Observable<Doctor>;
	private records: Observable<Record[]>;
	public currentRecords: Record[];

	constructor(public afs: AngularFirestore) {

	}

	public initRecords() {
		return new Promise((resolve, reject) => {
			this.recordCollection = this.afs.collection<Record>('patient/yE5exzj4fGgvFrVCNluomceR96a2/record');
			this.records = this.recordCollection.valueChanges();
			this.records.subscribe(records => {
				records.forEach(record => {
					this.doctorDoc = this.afs.doc<Doctor>('doctor/' + record.doctorID);
					this.doctor = this.doctorDoc.valueChanges();
					record.doctor = this.doctor;
				});
				this.currentRecords = records;
				resolve(records);
			});
		});
	}

	public getCurrentRecords() {
		return this.currentRecords;
	}

	public getRecords(){
		return this.records;
	}

	public addRecords(record){
		this.recordCollection.add(record);
	}

}