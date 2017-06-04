import {Injectable} from '@angular/core';
import {NativeStorage} from '@ionic-native/native-storage';

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
    public record : Object = {
        month: 'April',
        day: '11',
        phoneNo: '1234 5678',
        topic: 'Medical Check Up',
        doctor: 'Dr. Tam',
        hospital: 'Queen Elizabeth',
        medicine: 'panadol',
        price: '123',
        symp: 'Dizziness , headache'
    }
    constructor() {}
};

@Injectable()
export class UserService {
    public currentUser : User;
    constructor(public nativeStorage : NativeStorage) {
        this.currentUser = new User;
        this
            .nativeStorage
            .getItem('user')
            .then(data => this.currentUser = data, error => console.error(error));
    }
    public setUser(user) {
        this.currentUser = user;
        this
            .nativeStorage
            .setItem('user', this.currentUser)
            .then(() => console.log('Stored item!'), error => console.error('Error storing item', error));

    }
}