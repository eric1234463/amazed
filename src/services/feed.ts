import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import moment from 'moment';
import { UserService } from './user';
import { Feed } from './interface';

export interface Clock {
  data: number[];
  label: string;
}
export interface HttpResponse {
  status: boolean;
}
@Injectable()
export class FeedService {
  constructor(public http: HttpClient, public userService: UserService) {}

  public async getFeeds() {
    return this.http.get<Feed[]>(`https://herefyp.herokuapp.com/api/feed`).toPromise();
  }

  async getFeedById(id) {
    return this.http.get<Feed>(`https://herefyp.herokuapp.com/api/feed/${id}`).toPromise();
  }
  public async getClocks() {
    const currentDate = moment().format('YYYY-MM-DD');
    const days7Ago = moment()
      .subtract(7, 'd')
      .format('YYYY-MM-DD');
    const user = await this.userService.getUser();
    return this.http
      .get<Clock[]>(
        `https://herefyp.herokuapp.com/api/patient/biologicalClock?patientId=${
          user.id
        }&from=${days7Ago}&to=${currentDate}`
      )
      .toPromise();
  }

  public async getClock(type, date) {
    const user = await this.userService.getUser();
    const status = await this.http
      .get<HttpResponse>(`https://herefyp.herokuapp.com/api/patient/biologicalClock`, {
        params: {
          type,
          date,
          patientId: user.id
        }
      })
      .toPromise();
    return status;
  }

  public createWalkingStep(step, date) {
    this.userService.getUser().then(user => {
      this.http
        .post<HttpResponse>(`https://herefyp.herokuapp.com/api/patient/walkingStep`, {
          step,
          date,
          patientId: user.id
        })
        .subscribe(res => {
          console.log(res);
        });
    });
  }

  public createClock(type, date) {
    return new Promise((resolve, reject) => {
      this.userService.getUser().then(user => {
        this.http
          .post<HttpResponse>(`https://herefyp.herokuapp.com/api/patient/biologicalClock`, {
            type,
            patientId: user.id,
            date
          })
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
