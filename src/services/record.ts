import { Observable } from 'rxjs/Observable';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Injectable } from '@angular/core';
import { UserService } from './user';
import 'rxjs/add/operator/map';


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

    initRecords() {
        return new Promise<Observable<Record[]>>((resolve, reject) => {
            this.userService.getUserID().then(uid => {
                this.recordCollection = this.afs.collection<Record>('record');
                this.records = this.afs.collection<Record>('record', ref =>
                    ref.where('userID', '==', uid)
                ).snapshotChanges().map(actions => {
                    return actions.map(a => {
                        const data = a.payload.doc.data() as Record;
                        const id = a.payload.doc.id;
                        return { id, ...data };
                    });
                })


                this.records.subscribe(records => {
                    this.currentRecords = records;
                })
                resolve(this.records);
            })

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
