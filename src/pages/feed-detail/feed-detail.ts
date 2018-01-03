import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FeedService, Feed } from '../../services/feed';
import { Observable } from 'rxjs/Observable';
/**
 * Generated class for the FeedDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
    name: 'feed-detail',
    segment: 'feed/:id'
})
@Component({
    selector: 'page-feed-detail',
    templateUrl: 'feed-detail.html',
})
export class FeedDetailPage {
    public feed : Observable<Feed>;
    public id: string;
    constructor(public navCtrl: NavController, public navParams: NavParams, public feedService : FeedService) {
        this.id = this.navParams.get('id');
        this.feed = this.feedService.getFeedById(this.id);
    }

}
