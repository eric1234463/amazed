import { Observable } from 'rxjs/Observable';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Injectable } from '@angular/core';
import { UserService, Patient } from './user';
import { HttpClient } from '@angular/common/http';

import 'rxjs/add/operator/map';


export interface Doctor {
    displayName: string;
    photoURL: string;
    location: string;
    records: Record[];
    visited: Boolean;
}

export interface Record {
    id: String;
    visitDate: Date;
    startDate: Date;
    endDate: Date;
    factor: any[];
    medicine: any[];
    rate: number;
    title: string;
    description: string;
    Doctor: Doctor;
    Patient: Patient;
}

export interface Patient {

}

@Injectable()
export class RecordService {
    public doctorDoc: AngularFirestoreDocument<Doctor>;
    public recordCollection: AngularFirestoreCollection<Record>;
    public doctor: Observable<Doctor>;
    public records: Observable<Record[]>;
    public currentRecords: Record[];
    public recordSync = false;
    constructor(public afs: AngularFirestore, public userService: UserService, public http: HttpClient) {

    }

    initRecords() {
        return new Promise<Record[]>((resolve, reject) => {
            this.userService.getUser().then(user => {
                this.http.get<Record[]>(`https://herefyp.herokuapp.com/api/record?userId=${user.id}`).subscribe(records => {
                    resolve(records);
                });
            })
        });
    }
    getRecordByID(id) {
        return new Promise<Record>((resolve, reject) => {
            this.http.get<Record>(`https://herefyp.herokuapp.com/api/record/${id}`).subscribe(records => {
                resolve(records);
            });
        });
    }
    getCurrentRecords() {
        return this.currentRecords;
    }

    getRecords() {
        return this.records;
    }

    add(record) {
        this.recordCollection.add(record);
    }

    update(record: Record) {
        this.afs.doc<Record>(`record/${record.id}`).update(record);
    }
}
