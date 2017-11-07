import {Injectable} from '@angular/core';
import {NativeStorage} from '@ionic-native/native-storage';
import { AngularFireDatabase } from 'angularfire2/database';

export class User {
    public hkid : string;
    public gender : string;
    public weight : string;
    public height : string;
    public birthday : string;
    public username : string;
    public age : string;
    public company : string;
    public plan : string;
    public records : Object[];
    constructor() {}
};

@Injectable()
export class UserService {
    public currentUser : User;
    constructor(public nativeStorage : NativeStorage,public db: AngularFireDatabase) {
        this.currentUser = new User;
        this
            .nativeStorage
            .getItem('user')
            .then(data => this.currentUser = data, error => console.error(error));
    }

    public getRecords(){
        return this.currentUser.records;
    }
    public setUser(user) {
        this.currentUser = user;
        this
            .nativeStorage
            .setItem('user', this.currentUser)
            .then(() => console.log('Stored item!'), error => console.error('Error storing item', error));
    }
}