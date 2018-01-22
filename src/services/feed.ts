import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import moment from 'moment';
import { UserService, Patient } from './user';

export interface Feed {
    doctorID: string;
    content: string;
    title: string;
    photoURL: string;
    createDt: Date;
    updateDt: Date;
}
export interface Clock {
    data: Date[];
    label: String;
}
@Injectable()
export class FeedService {
    constructor(public http: HttpClient, public userService: UserService) {

    }

    getFeeds() {
        return new Promise<Feed[]>((resolve, reject) => {
            this.http.get<Feed[]>(`https://herefyp.herokuapp.com/api/feed`).subscribe(feeds => {
                resolve(feeds);
            });
        });
    }

    getFeedById(id) {
        return new Promise<Feed>((resolve, reject) => {
            this.http.get<Feed>(`https://herefyp.herokuapp.com/api/feed/${id}`).subscribe(feed => {
                resolve(feed);
            });
        });
    }
    getClock() {
        return new Promise<Clock[]>((resolve, reject) => {
            const currentDate = moment().format('YYYY-MM-DD');
            const days7Ago = moment().subtract(7, 'd').format('YYYY-MM-DD');
            this.userService.getUser().then(user => {
                this.http.get<Clock[]>(`https://herefyp.herokuapp.com/api/patient/biologicalClock?patientId=${user.id}&from=${days7Ago}&to=${currentDate}`)
                    .subscribe(clocks => {
                        resolve(clocks);
                    });
            })
        });
    }
}
