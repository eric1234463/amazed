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
export interface HttpResponse {
    status: Boolean;
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
    getClocks() {
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

    getClock(type, date) {
        return new Promise((resolve, reject) => {
            this.userService.getUser().then(user => {
                this.http.get<HttpResponse>(`https://herefyp.herokuapp.com/api/patient/biologicalClock?type=${type}&patientId=${user.id}&date=${date}`).subscribe(res => {
                    if (res.status) {
                        reject(res);
                    } else {
                        resolve(res);
                    }
                })

            })
        });
    }
    createClock(type, date) {
        let momentDate = moment();
        if (type == 'SLEEP') {
            let hour = parseInt(date.split(':')[0]);
            momentDate = moment().subtract(1, 'days');
            momentDate.set('hour', hour);
        }
        return new Promise((resolve, reject) => {
            this.userService.getUser().then(user => {
                this.http.post<HttpResponse>(`https://herefyp.herokuapp.com/api/patient/biologicalClock`, {
                    type: type,
                    patientId: user.id,
                    date: momentDate
                }).subscribe(res => {
                    if (res.status) {
                        resolve(res);
                    } else {
                        reject(res);
                    }
                })

            })
        });
    }
}
