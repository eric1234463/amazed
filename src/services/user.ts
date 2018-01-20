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
                    this.http.post<Patient>('https://herefyp.herokuapp.com/api/user/patientLogin', {
                        uid: res.authResponse.userID
                    }).subscribe(currentUser => {
                        this.storage.set('user', currentUser);
                        resolve(currentUser);
                    });
                })
            }
            else {
                this.auth.login('facebook').subscribe(
                    (user: facebookUser) => {
                        this.http.post<Patient>('https://herefyp.herokuapp.com/api/user/patientLogin', {
                            uid: user.uid
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
    updateUserData(user) {
        // Sets user data to firestore on login
        // const userRef: AngularFirestoreDocument<any> = this.afs.doc(`patient/${user.uid}`);
        // const data: User = {
        //     uid: user.uid,
        //     displayName: user.displayName,
        //     photoURL: user.photoURL,
        //     hkid: 'A1234XX(8)',
        //     gender: 'M',
        //     weight: user.weight || null,
        //     height: user.height || null,
        //     bmi: (user.weight / Math.pow(user.height / 100, 2)) || null
        // }
        // return userRef.set(data)
    }

    getUser() {
        return new Promise<Patient>((resolve, reject) => {
            resolve(this.storage.get('user'));
        });
    }
}
