import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user';
import { Doctor, District, SearchDoctor } from './interface';

@Injectable()
export class DoctorService {
  constructor(public http: HttpClient, public userService: UserService) {}

  async getDoctorLocation(lat, lng) {
    return await this.http
      .get<Doctor[]>(`https://herefyp.herokuapp.com/api/doctor/location?lat=${lat}&lng=${lng}`)
      .toPromise();
  }
  async getDoctor(id: string) {
    return await this.http
      .get<Doctor>(`https://herefyp.herokuapp.com/api/doctor/${id}`)
      .toPromise();
  }

  async getDoctors() {
    return await this.http.get<Doctor[]>(`https://herefyp.herokuapp.com/api/doctor`).toPromise();
  }

  async getDistricts() {
    return await this.http
      .get<District[]>(`https://herefyp.herokuapp.com/api/district`)
      .toPromise();
  }

  async searchDoctors(search: SearchDoctor, sort) {
    return await this.http
      .post<Doctor[]>(`https://herefyp.herokuapp.com/api/doctor/search`, {
        search: {
          ...search
        },
        sort
      })
      .toPromise();
  }
}
