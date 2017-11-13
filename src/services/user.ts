import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap'
import { Platform } from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook';

export interface User {
    hkid: String;
    gender: String;
    uid: String;
    email: String;
    photoURL?: String;
    displayName?: String;
};

@Injectable()
export class UserService {
    public user: Observable<User>;
    public currentUser: User;
    constructor(private afAuth: AngularFireAuth,
        private afs: AngularFirestore,
        public platform: Platform,
        public fb: Facebook) {
        //// Get auth data, then get firestore user document || null
        this.user = this.afAuth.authState
            .switchMap(user => {
                if (user) {
                    this.user = this.afs.doc<User>(`patient/${user.uid}`).valueChanges();
                    return this.user;
                } else {
                    return Observable.of(null)
                }
            })
    }
    googleLogin() {
        return new Promise((resolve, reject) => {
            if (this.platform.is('cordova')) {
                return this.fb.login(['email', 'public_profile']).then(res => {
                    const facebookCredential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
                    resolve(firebase.auth().signInWithCredential(facebookCredential));
                })
            }
            else {
                return this.afAuth.auth
                    .signInWithPopup(new firebase.auth.FacebookAuthProvider())
                    .then(res => {
                        console.log(res);
                        resolve(res);
                    });
            }
        });
    }

    private updateUserData(user) {
        // Sets user data to firestore on login
        const userRef: AngularFirestoreDocument<any> = this.afs.doc(`patient/${user.uid}`);
        const data: User = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            hkid: 'A1234XX(8)',
            gender: 'M',
        }
        return userRef.set(data)
    }
    public getUserID() {
        return new Promise<String>((resolve, reject) => {
            this.user.subscribe(user => {
                resolve(user.uid);
            })
        })
    }
}
