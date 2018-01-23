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

    async getRecords() {
        const user = await this.userService.getUser();
        return await this.http.get<Record[]>(`https://herefyp.herokuapp.com/api/record?userId=${user.id}`).toPromise();
    }
    async getRecordByID(id) {
        return await this.http.get<Record>(`https://herefyp.herokuapp.com/api/record/${id}`).toPromise();
    }
}
