import { Observable } from 'rxjs/Observable';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
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
    public feedCollection: AngularFirestoreCollection<Feed>;
    public feeds: Observable<Feed[]>;
    constructor(public afs: AngularFirestore, public http: HttpClient) {

    }

    getFeeds() {
        return new Promise<Feed[]>((resolve, reject) => {
            this.http.get<Feed[]>(`https://herefyp.herokuapp.com/api/feed`).subscribe(feeds => {
                resolve(feeds);
            });
        });
    }

    addfeed(feed){
        this.feedCollection.add(feed);
    }
    getFeedById(id){
        return new Promise<Feed>((resolve, reject) => {
            this.http.get<Feed>(`https://herefyp.herokuapp.com/api/feed/${id}`).subscribe(feed => {
                resolve(feed);
            });
        });
    }
}
