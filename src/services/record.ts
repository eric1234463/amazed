import { Observable } from 'rxjs/Observable';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Injectable } from '@angular/core';
import { UserService } from './user'
export interface Doctor {
    name: string;
    location: string;
    visited: boolean;
    records: any[];
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
}

export interface Patient {
    name: string;
    records: Record[]
}

@Injectable()
export class RecordService {
    public doctorDoc: AngularFirestoreDocument<Doctor>;
    public recordCollection: AngularFirestoreCollection<Record>;
    public doctor: Observable<Doctor>;
    public records: Observable<Record[]>;
    public currentRecords: Record[];
    constructor(public afs: AngularFirestore, public userService: UserService) {

    }

    public initRecords() {
        return new Promise<Observable<Record[]>>((resolve, reject) => {
            this.userService.getUserID().then(uid => {
                this.records = this.afs.collection<Record>('record', ref =>
                    ref.where('userID', '==', uid)
                ).valueChanges();


                this.records.subscribe(records => {
                    this.currentRecords = records;
                })
                resolve(this.records);
            })

        });
    }

    public getCurrentRecords() {
        return this.currentRecords;
    }

    public getRecords() {
        return this.records;
    }

    public addRecords(record) {
        this.recordCollection.add(record);
    }

}
