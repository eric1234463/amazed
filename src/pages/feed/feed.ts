import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FeedService, Feed } from '../../services/feed';
import { Observable } from 'rxjs/Observable';
import { ImageLoaderConfig } from 'ionic-image-loader';

/**
 * Generated class for the FeedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
    name: 'feed',
    segment: 'feed'
}) @Component({
    selector: 'page-feed',
    templateUrl: 'feed.html',
})
export class FeedPage {
    public feeds: Feed[];

    constructor(public navCtrl: NavController, public navParams: NavParams, public feedService: FeedService, public imageLoaderConfig: ImageLoaderConfig) {
        this.imageLoaderConfig.setBackgroundSize('cover');
        this.imageLoaderConfig.enableSpinner(true);
        this.feedService.getFeeds().then(feeds => {
            console.log(feeds);
            this.feeds = feeds;
        });

    }

    goToDetail(feed) {
        //this.feedService.addfeed(feed);
        this.navCtrl.push('feed-detail', {
            id: feed.id
        });
    }

}
