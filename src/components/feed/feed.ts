import { Component, OnInit } from '@angular/core';
import { ModalController, NavController, NavParams, LoadingController } from 'ionic-angular';
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
    public imageLoaderConfig: ImageLoaderConfig,
    public loadingCtrl: LoadingController
  ) {}

  async ngOnInit() {
    let loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: `
      <img src="assets/spinner.svg"/>`
    });
    loading.present();
    this.imageLoaderConfig.setBackgroundSize('cover');
    this.imageLoaderConfig.enableSpinner(true);
    this.feeds = await this.feedService.getFeeds();
    loading.dismiss();
  }

  goToDetail(feed) {
    // this.feedService.addfeed(feed);
    this.navCtrl.push('feed-detail', {
      id: feed.id
    });
  }
}
