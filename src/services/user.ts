import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import 'rxjs/add/operator/switchMap'
import { Platform } from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook';

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

@Injectable()
export class UserService {
    public user: Patient;
    public currentUser: Patient;
    constructor(private afAuth: AngularFireAuth,
        public platform: Platform,
        public http: HttpClient,
        public fb: Facebook) {
        //// Get auth data, then get firestore user document || null

    }
    facebookLogin() {
        return new Promise((resolve, reject) => {
            if (!this.platform.is('mobileweb')) {
                this.fb.login(['email', 'public_profile']).then(res => {
                    console.log(res);
                    const facebookCredential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
                    this.afAuth.auth.signInWithCredential(facebookCredential).then((user) => {
                        this.updateUserData(user);
                        resolve(user);
                    }).catch((error) => {
                        console.log(error);
                        reject(error);
                    })
                })
            }
            else {
                this.afAuth.auth
                    .signInWithPopup(new firebase.auth.FacebookAuthProvider())
                    .then(res => {
                        console.log(res);
                        resolve(res);
                    });
            }
        });
    }
    logout() {
        this.afAuth.auth.signOut();
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
            this.afAuth.authState
                .subscribe(user => {
                    const uid = user.uid;
                    this.http.post<Patient>('https://herefyp.herokuapp.com/api/user/patientLogin', {
                        uid: uid
                    }).subscribe(currentUser  => {
                        console.log(currentUser);
                        resolve(currentUser);
                    });
                });
        })
    }
}
