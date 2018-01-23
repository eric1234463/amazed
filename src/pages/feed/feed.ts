import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { FeedService, Feed, Clock } from '../../services/feed';
import { ImageLoaderConfig } from 'ionic-image-loader';
import moment from 'moment';
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
export class FeedPage implements OnInit {
    public feeds: Feed[];
    public content = 'status';
    public lineChartData: Clock[];
    public lineChartLabels: Array<String> = [];
    public lineChartOptions: any = {
        responsive: true,
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
    public showModal = false;
    constructor(public navCtrl: NavController, public navParams: NavParams, public feedService: FeedService, public imageLoaderConfig: ImageLoaderConfig, public modalCtrl: ModalController) {

    }
    async ngOnInit() {
        const status = await this.feedService.getClock('WAKE', new Date());
        if (status.status === false) {
            this.showModal = true;
        } else {
            console.log(status);
        }
        console.log(this.showModal);
        if (this.showModal) {
            this.modalCtrl.create('clock').present();
        }
        this.imageLoaderConfig.setBackgroundSize('cover');
        this.imageLoaderConfig.enableSpinner(true);
        this.feeds = await this.feedService.getFeeds();

        for (let i = 7; i > 0; i--) {
            let date = moment().subtract(i, 'd').format('DD');
            this.lineChartLabels.push(date);
        }
        this.lineChartData = await this.feedService.getClocks();
    }

    goToDetail(feed) {
        //this.feedService.addfeed(feed);
        this.navCtrl.push('feed-detail', {
            id: feed.id
        });
    }

}
