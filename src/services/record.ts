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

@Injectable()
export class RecordService {
    constructor(public userService: UserService, public http: HttpClient) {

    }

    getRecords() {
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
}
