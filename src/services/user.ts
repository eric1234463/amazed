import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Platform } from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook';
import { Storage } from '@ionic/storage';
import { AuthService } from "angular2-social-login";

export interface Patient {
    id: number;
    hkid: String;
    gender: String;
    uid: String;
    photoURL?: String;
    displayName?: String;
    weight: number;
    height: number;
    bmi: number;
};
export interface facebookUser {
    email: String;
    uid: String;
    token: String;
    image: String;
    displayName: String
}
@Injectable()
export class UserService {
    public user: Patient;
    constructor(public platform: Platform, public http: HttpClient, public fb: Facebook, public storage: Storage, public auth: AuthService) {

    }
    facebookLogin() {
        return new Promise((resolve, reject) => {
            if (this.platform.is('ios') || this.platform.is('android')) {
                this.fb.login(['email', 'public_profile']).then(res => {
                    this.fb.api('me?fields=id,name,email,first_name,picture.width(720).height(720).as(picture_large)', []).then(profile => {
                        this.http.post<Patient>('https://herefyp.herokuapp.com/api/patient/login', {
                            uid: res.authResponse.userID,
                            email: profile['email'],
                            displayName: profile['name'],
                            photoURL: profile['picture_large']['data']['url']
                        }).subscribe(currentUser => {
                            this.storage.set('user', currentUser);
                            resolve(currentUser);
                        });
                    });

                })
            }
            else {
                this.auth.login('facebook').subscribe(
                    (user: facebookUser) => {
                        console.log(user);
                        this.http.post<Patient>('https://herefyp.herokuapp.com/api/patient/login', {
                            uid: user.uid,
                            email: user.email,
                            displayName: user.displayName,
                            photoURL: user.image
                        }).subscribe(currentUser => {
                            this.storage.set('user', currentUser);
                            resolve(currentUser);
                        });
                    }
                )
            }
        });
    }
    logout() {
        this.storage.remove('user');
    }
    updateUserData(user: Patient) {
        this.http.put('https://herefyp.herokuapp.com/api/patient', {
            hkid: user.hkid,
            gender: user.gender,
            height: user.height,
            weight: user.weight,
            patientId: user.id
        }).subscribe(currentUser => {
            this.storage.set('user', user);
        })
    }

    async getUser() {
        return await this.storage.get('user');
    }
}
