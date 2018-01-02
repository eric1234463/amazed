import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FeedService, Feed } from '../../services/feed';
import { Observable } from 'rxjs/Observable';

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
    public feeds: Observable<Feed[]>;;

    constructor(public navCtrl: NavController, public navParams: NavParams, public feedService: FeedService) {
        this.feedService.init().then(feeds=>{
            this.feeds = feeds;
            console.log(feeds);
        });

    }

    goToDetail(feed){
        this.feedService.addfeed(feed);
    }

}
