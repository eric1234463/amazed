import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Feed {
    doctorID: string;
    content: string;
    title: string;
    photoURL: string;
    createDt: Date;
    updateDt: Date;
}
@Injectable()
export class FeedService {
    constructor(public http: HttpClient) {

    }

    getFeeds() {
        return new Promise<Feed[]>((resolve, reject) => {
            this.http.get<Feed[]>(`https://herefyp.herokuapp.com/api/feed`).subscribe(feeds => {
                resolve(feeds);
            });
        });
    }

    getFeedById(id){
        return new Promise<Feed>((resolve, reject) => {
            this.http.get<Feed>(`https://herefyp.herokuapp.com/api/feed/${id}`).subscribe(feed => {
                resolve(feed);
            });
        });
    }
}
