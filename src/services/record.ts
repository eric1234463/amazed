import { Injectable } from '@angular/core';
import { UserService } from './user';
import { HttpClient } from '@angular/common/http';
import { Record, ScanRecord } from './interface';
import 'rxjs/add/operator/map';

@Injectable()
export class RecordService {
  constructor(public userService: UserService, public http: HttpClient) {}

  async getRecords() {
    const user = await this.userService.getUser();
    return await this.http
      .get<Record[]>(`https://herefyp.herokuapp.com/api/record?userId=${user.id}`)
      .toPromise();
  }

  async getRecordByID(id) {
    return await this.http
      .get<Record>(`https://herefyp.herokuapp.com/api/record/${id}`)
      .toPromise();
  }

  async createScanRecord(patientId, doctorId) {
    return await this.http
      .post('https://herefyp.herokuapp.com/api/record/scan', {
        patientId,
        doctorId
      })
      .toPromise();
  }

  async getScanRecord(patientId) {
    return await this.http
      .get<ScanRecord[]>(`https://herefyp.herokuapp.com/api/record/scan?patientId=${patientId}`)
      .toPromise();
  }

  async createBooking(doctorId, time, date) {
    console.log('call booking api');
    const user = await this.userService.getUser();
    return await this.http.post('https://herefyp.herokuapp.com/api/booking', {
      doctorId: doctorId,
      patientId: user.id,
      time: time,
      date: date
    }).toPromise();
  }
}
