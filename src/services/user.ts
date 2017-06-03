import {Injectable} from '@angular/core';

export class User {
    public hkid : string = '12345677(8)';
    public gender : string = 'men';
    public weight : string = '73';
    public height : string = '173';
    public birthday : string = '1994/06/16';
    public username : string = 'Eric Kwong';
    public age : string = '22';
    public company : string = 'AIA';
    public plan : string = 'MEDICAL PLAN 2';
    constructor() {}
};

@Injectable()
export class UserService {
    public currentUser : User;
    constructor() {
        this.currentUser = new User();
    }

}