import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import moment from "moment";
import { UserService } from "./user";
import { Feed } from "./interface";
import { RequestOptions, Request, RequestMethod } from "@angular/http";

export interface Clock {
    data: number[];
    label: string;
}
export interface HttpResponse {
    status: Boolean;
}
@Injectable()
export class FeedService {
    constructor(public http: HttpClient, public userService: UserService) {}

    async getFeeds() {
        return await this.http
            .get<Feed[]>(`https://herefyp.herokuapp.com/api/feed`)
            .toPromise();
    }

    async getFeedById(id) {
        return await this.http
            .get<Feed>(`https://herefyp.herokuapp.com/api/feed/${id}`)
            .toPromise();
    }
    async getClocks() {
        const currentDate = moment().format("YYYY-MM-DD");
        const days7Ago = moment()
            .subtract(7, "d")
            .format("YYYY-MM-DD");
        const user = await this.userService.getUser();
        return await this.http
            .get<Clock[]>(
                `https://herefyp.herokuapp.com/api/patient/biologicalClock?patientId=${
                    user.id
                }&from=${days7Ago}&to=${currentDate}`
            )
            .toPromise();
    }

    async getClock(type, date) {
        const user = await this.userService.getUser();
        const status = await this.http
            .get<HttpResponse>(
                `http://herefyp.herokuapp.com/api/patient/biologicalClock`,
                {
                    params: {
                        type: type,
                        date: date,
                        patientId: user.id
                    }
                }
            )
            .toPromise();
        return status;
    }
    createClock(type, date) {
        return new Promise((resolve, reject) => {
            this.userService.getUser().then(user => {
                this.http
                    .post<HttpResponse>(
                        `https://herefyp.herokuapp.com/api/patient/biologicalClock`,
                        {
                            type: type,
                            patientId: user.id,
                            date: date
                        }
                    )
                    .subscribe(res => {
                        if (res.status) {
                            resolve(res);
                        } else {
                            reject(res);
                        }
                    });
            });
        });
    }
}
