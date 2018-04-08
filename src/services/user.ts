import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Platform } from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook';
import { Storage } from '@ionic/storage';
import { AuthService } from 'angular2-social-login';
import { Patient, facebookUser, GoogleUser, PatientMedicine } from './interface';
@Injectable()
export class UserService {
  public user: Patient;
  constructor(
    public platform: Platform,
    public http: HttpClient,
    public fb: Facebook,
    public storage: Storage,
    public auth: AuthService
  ) {}

  facebookLogin() {
    return new Promise((resolve, reject) => {
      if (this.platform.is('ios') || this.platform.is('android')) {
        this.fb.login(['email', 'public_profile']).then(res => {
          this.fb
            .api(
              'me?fields=id,name,email,age_range,gender,first_name,picture.width(720).height(720).as(picture_large)',
              []
            )
            .then(profile => {
              console.log(profile);
              let gender = '';
              if (profile['gender'] === 'male') {
                gender = 'M';
              } else {
                gender = 'F';
              }
              this.http
                .post<Patient>('https://herefyp.herokuapp.com/api/patient/login', {
                  uid: res.authResponse.userID,
                  email: profile['email'],
                  age: profile['age_range']['min'],
                  gender: gender,
                  displayName: profile['name'],
                  photoURL: profile['picture_large']['data']['url']
                })
                .subscribe(currentUser => {
                  this.storage.set('user', currentUser);
                  resolve(currentUser);
                });
            });
        });
      } else {
        this.auth.login('facebook').subscribe((user: facebookUser) => {
          console.log(user);
          this.http
            .post<Patient>('https://herefyp.herokuapp.com/api/patient/login', {
              uid: user.uid,
              email: user.email,
              displayName: user.displayName,
              photoURL: user.image
            })
            .subscribe(currentUser => {
              this.storage.set('user', currentUser);
              resolve(currentUser);
            });
        });
      }
    });
  }

  async logout() {
    return await this.storage.remove('user');
  }

  async updateUserData(user: Patient) {
    const currentUser = await this.http
      .put('https://herefyp.herokuapp.com/api/patient', {
        hkid: user.hkid,
        height: user.height,
        weight: user.weight,
        patientId: user.id
      })
      .toPromise();
    return this.storage.set('user', currentUser);
  }

  async getUser() {
    const user: Patient = await this.storage.get('user');
    return this.http.get<Patient>(`https://herefyp.herokuapp.com/api/patient/${user.id}`).toPromise();
  }

  async getPatientMedicine(id) {
    const user: Patient = await this.storage.get('user');
    return this.http.get<PatientMedicine>(`https://herefyp.herokuapp.com/api/medicine/${id}?patientId=${user.id}`).toPromise();
  }

  async getPatientMedicines() {
    const user: Patient = await this.storage.get('user');
    return this.http.get<PatientMedicine[]>(`https://herefyp.herokuapp.com/api/patient/${user.id}/medicine`).toPromise();
  }

  async removePatientMedicine(id) {
    return this.http.delete<PatientMedicine>(`https://herefyp.herokuapp.com/api/patient/${id}/medicine`).toPromise();
  }

  async createPatientMedicine(id) {
    const user: Patient = await this.storage.get('user');
    return this.http.post<PatientMedicine>('https://herefyp.herokuapp.com/api/patient/medicine', {
      patientId: user.id,
      medicineId: id
    }).toPromise();

  }
}
