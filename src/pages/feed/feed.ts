import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FeedService, Feed } from '../../services/feed';
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
    public content = 'status';
    public lineChartData: Array<any> = [
        { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
    ];
    public lineChartLabels: Array<Date> = [];
    public lineChartOptions: any = {
        responsive: true
    };
    public lineChartColors: Array<any> = [
        { // grey
            backgroundColor: 'rgba(1,87,155,0.2)',
            borderColor: 'rgba(1,87,155,1)',
            pointBackgroundColor: 'rgba(1,87,155,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(1,87,155,0.8)'
        }
    ];
    public lineChartLegend: boolean = true;
    public lineChartType: string = 'line';
    constructor(public navCtrl: NavController, public navParams: NavParams, public feedService: FeedService, public imageLoaderConfig: ImageLoaderConfig) {
        this.imageLoaderConfig.setBackgroundSize('cover');
        this.imageLoaderConfig.enableSpinner(true);
        this.feedService.getFeeds().then(feeds => {
            console.log(feeds);
            this.feeds = feeds;
        });

        let today = new Date();
        let in_a_week = new Date().setDate(today.getDate() + 7);
        for (let date = in_a_week; date < today; date++) { }
    }

    goToDetail(feed) {
        //this.feedService.addfeed(feed);
        this.navCtrl.push('feed-detail', {
            id: feed.id
        });
    }

}
