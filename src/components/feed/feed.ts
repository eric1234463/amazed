import { Component, OnInit } from '@angular/core';
import { ModalController, NavController, NavParams } from 'ionic-angular';
import { ImageLoaderConfig } from 'ionic-image-loader';
import moment from 'moment';
import { FeedService } from '../../services/feed';
import { Feed } from '../../services/interface';

/**
 * Generated class for the FeedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-feed',
  templateUrl: 'feed.html'
})
export class FeedPage implements OnInit {
  public feeds: Feed[];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public feedService: FeedService,
    public imageLoaderConfig: ImageLoaderConfig
  ) {}

  async ngOnInit() {
    this.imageLoaderConfig.setBackgroundSize('cover');
    this.imageLoaderConfig.enableSpinner(true);
    this.feeds = await this.feedService.getFeeds();
  }

  goToDetail(feed) {
    // this.feedService.addfeed(feed);
    this.navCtrl.push('feed-detail', {
      id: feed.id
    });
  }
}
