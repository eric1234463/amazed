import { Observable } from 'rxjs/Observable';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Injectable } from '@angular/core';

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
    constructor(public afs: AngularFirestore) {

    }

    init() {
        return new Promise<Observable<Feed[]>>((resolve, reject) => {
            this.feedCollection = this.afs.collection<Feed>('feed');
            this.feeds = this.afs.collection<Feed>('feed').snapshotChanges().map(actions => {
                return actions.map(a => {
                    const data = a.payload.doc.data() as Feed;
                    const id = a.payload.doc.id;
                    return { id, ...data };
                });
            })
            resolve(this.feeds);
        });
    }

    addfeed(feed){
        this.feedCollection.add(feed);
    }
    getFeedById(id){
        return this.afs.doc<Feed>(`feed/${id}`).valueChanges()
    }
}
