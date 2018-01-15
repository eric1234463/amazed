import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FeedService, Feed } from '../../services/feed';
import { ImageLoaderConfig } from 'ionic-image-loader';
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
    public feed: Feed;
    public id: string;
    constructor(public navCtrl: NavController, public navParams: NavParams, public feedService: FeedService, public imageLoaderConfig: ImageLoaderConfig) {
        this.imageLoaderConfig.setBackgroundSize('cover');
        this.imageLoaderConfig.enableSpinner(true);
        this.imageLoaderConfig.setHeight('40vh');
        this.id = this.navParams.get('id');
        this.feedService.getFeedById(this.id).then(feed => {
            this.feed = feed;
        });
    }

}
